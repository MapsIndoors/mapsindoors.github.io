---
layout: tutorial
title: Booking Tutorial
guide_title: booking-tutorial
nav_weight: 340
published: true
date: 2020-11-25
permalink: /ios/v3/booking-tutorial/
---

In this tutorial we will create a Booking experience using the Booking Service in MapsIndoors. You will learn how to list bookable Locations, list Bookings for a Location and perform new Bookings using the Booking Service, `MPBookingService`.

Please note that a MapsIndoors dataset can only have bookable resources if an integration with a booking provider exists. Current examples of booking providers are _Google Calendar_ and _Microsoft Office 365_. These providers and more can be added and integrated to your MapsIndoors project by request. It is a prerequisite for this tutorial that the API key used refers to a dataset containing bookable Locations.

## Listing Bookable Locations

We will start by listing bookable Locations. Create a class `BookableLocationsController` inheriting from `UITableViewController`.

```swift
class BookableLocationsController: UITableViewController {
```

Create a private property that should hold our bookable Locations.

```swift
private var bookableLocations = [MPLocation]()
```

In your `viewDidAppear()` method,

1. Initialise a `MPBookableQuery` object with a timespan for your potential Booking.
1. Call `getBookableLocations()` on the `MPBookingService` instance.
1. Assign the returned locations to your `bookableLocations` property.

```swift
override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    let bookableQuery = MPBookableQuery.init()
    bookableQuery.startTime = Date.init()
    bookableQuery.endTime = bookableQuery.startTime.advanced(by: 60*60)
    weak var wself = self
    MPBookingService.sharedInstance().getBookableLocations(using: bookableQuery, completion: { (locations, error) in
        if let _locations = locations {
            wself?.bookableLocations = _locations
            wself?.tableView.reloadData()
        }
    })
}
```

In `numberOfSections(in tableView:)`, return 1 since we only need one section.

```swift
override func numberOfSections(in tableView: UITableView) -> Int {
    return 1
}
```

In `tableView(:numberOfRowsInSection section:)`, return the size of `bookableLocations`.

```swift
override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return bookableLocations.count
}
```

In `tableView(:cellForRowAt indexPath:)`, create a `UITableViewCell` with the current Locations name as the text for the label.

```swift
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = UITableViewCell.init()
    let location = bookableLocations[indexPath.row]
    cell.textLabel?.text = location.name
    return cell
}
```

In `tableView(:didSelectRowAt indexPath:)`, get the relevant `MPLocation` for the `indexPath`. Initialise a `BookingsController` which we will implement next. Assign the selected location to a `bookableLocation` property on `BookingsController` and push the controller to the navigation stack.

```swift
override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let location = bookableLocations[indexPath.row]
    let bookingsVC = BookingsController.init()
    bookingsVC.bookableLocation = location
    navigationController?.pushViewController(bookingsVC, animated: true)
}
```

## Listing Bookings for a Location

Create a new controller, `BookingsController` inheriting again from `UITableViewController`. This controller will list the Bookings for a locations within a timespan, as well as give access to creating new and editing bookings.

```swift
class BookingsController: UITableViewController {
```

Create a public property `bookableLocation` that will hold the Location we want to book.

```swift
var bookableLocation : MPLocation?
```

Create a private property `bookings` that can hold the Location's bookings.

```swift
private var bookings = [MPBooking]()
```

In your `viewDidLoad()` method, initialise a `UIBarButtonItem` with the title `Book`targeting `newBooking` which we will create later. Add the button to the `navigationItem`.

```swift
let button = UIBarButtonItem.init(title: "Book", style: .plain, target: self, action: #selector(newBooking))
self.navigationItem.rightBarButtonItem = button
```

Also in your `viewDidLoad()` method, initialise a `MPBookingsQuery`with the `MPLocation` stored in `bookableLocation` and a timespan, in this example 24 hours starting one hour ago.

```swift
let bookingsQuery = MPBookingsQuery.init()
bookingsQuery.location = bookableLocation
bookingsQuery.startTime = Date.init().advanced(by: -60*60)
bookingsQuery.endTime = bookingsQuery.startTime?.advanced(by: 24*60*60)
```

Lastly in your `viewDidLoad()` method, call `getBookingsUsing(bookingsQuery)`with the `MPBookingsQuery` we just created. Store the returned Bookings in our `bookings` property.

```swift
weak var wself = self
MPBookingService.sharedInstance().getBookingsUsing(bookingsQuery) { (bookings, error) in
    if let _bookings = bookings {
        wself?.bookings = _bookings
        wself?.tableView.reloadData()
    }
}
```

In `numberOfSections(in tableView:)`, return 1 since we only need one section.

```swift
override func numberOfSections(in tableView: UITableView) -> Int {
    return 1
}
```

In `tableView(:numberOfRowsInSection section:)`, return the size of `bookings`.

```swift
override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return bookings.count
}
```

In `tableView(:cellForRowAt indexPath:)`, create a `UITableViewCell` with the current Booking title as the text for the label.

```swift
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = UITableViewCell.init()
    let booking = bookings[indexPath.row]
    cell.textLabel?.text = booking.title
    return cell
}
```

In `tableView(:didSelectRowAt indexPath:)`, get the relevant `MPBooking` for the `indexPath` and call `editBooking()` with that Booking.

```swift
override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let booking = bookings[indexPath.row]
    editBooking(booking: booking)
}
```

Create a method `editBooking(booking:)`. In this mehod, initialise a `BookingController` which we will implement next. Assign the selected booking to the `BookingController` and push the controller to the navigation stack.

```swift
func editBooking(booking:MPBooking) {
    let bookingVC = BookingController.init()
    bookingVC.booking = booking
    navigationController?.pushViewController(bookingVC, animated: true)
}
```

Create an Objective-C exposed method `newBooking()` which will be use by our `UIBarButtonItem` created in `viewDidLoad()`. In the `newBooking()` mehod, initialise a new `MPBooking` instance and provide some default values for the Booking. Call the newly created `editBooking(booking:)` with the Booking instance.

```swift
@objc func newBooking() {
    let booking = MPBooking.init()
    booking.location = bookableLocation
    booking.title = "Meeting"
    booking.startTime = Date.init()
    booking.participantIds = ["myemail@email.com"]
    booking.endTime = booking.startTime!.addingTimeInterval(60*60)
    editBooking(booking: booking)
}
```

## Editing, Performing and Cancelling Bookings

We need a third controller to display, edit and perform an actual Booking.

We will create an enum model to keep track on the different parts of the `MPBooking` model displayed through the view controller.

```swift
enum BookingRow : Int {
    case title = 0
    case description = 1
    case start = 2
    case end = 3
    case id = 4
    case count = 5
}
```

Create `BookingController` inheriting once again from `UITableViewController`.

```swift
class BookingController: UITableViewController {
```

Create a public property `booking` that will hold our Booking.

```swift
var booking = MPBooking.init()
```

Create some private properties `bookBtn` and `cancelBtn` that is to be placed dynamically in the `navigationItem`.

```swift
private let bookBtn = UIBarButtonItem.init(title: "Create Booking", style: .plain, target: self, action: #selector(book))
private let cancelBtn = UIBarButtonItem.init(title: "Cancel Booking", style: .plain, target: self, action: #selector(cancel))
```

Create a method `updateButtons()` that will either place a `bookBtn` if there is no `bookingId` on the Booking, which means it was created locally, or place a `cancelBtn` if a `bookingId` exist for the Booking, which means it was selected from a list of Bookings fetched from the `MPBookingService`.

```swift
private func updateButtons() {
    if booking.bookingId != nil {
        self.navigationItem.rightBarButtonItem = cancelBtn
    } else {
        self.navigationItem.rightBarButtonItem = bookBtn
    }
}
```

In your `viewDidLoad()` method, just call the `updateButtons()` method.

```swift
override func viewDidLoad() {
    updateButtons()
}
```

Create an Objective-C exposed method `book()` which will be use by our `UIBarButtonItem` inserted in `viewDidLoad()`. In the `book()` mehod, call `perform(booking)` on the `MPBookingService` instance with our Booking object as input. If all goes well and we have a Booking returned in the block, we assign this new Booking to our `booking` propery and refresh our views. If not, we assume that we have an error, and show this in an alert controller.

```swift
@objc private func book() {
    weak var wself = self
    MPBookingService.sharedInstance().perform(booking) { (booking, error) in
        if let b = booking {
            wself?.booking = b
            wself?.updateButtons()
            wself?.tableView.reloadData()
        } else {
            let alert = UIAlertController(title: "Ooops!", message: "\(error.debugDescription)", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
            self.present(alert, animated: true)
        }
    }
}
```

Create another Objective-C exposed method `cancel()` which will be use by our `UIBarButtonItem` inserted in `viewDidLoad()`. In the `cancel()` mehod, call `cancel(booking)` on the `MPBookingService` instance with our Booking object as input. If all goes well and we have a Booking returned in the block, we assign this new Booking to our `booking` propery and refresh our views. If not, we assume that we have an error, and show this in an alert controller.

```swift
@objc private func cancel() {
    weak var wself = self
    MPBookingService.sharedInstance().cancel(booking) { (booking, error) in
        if error == nil {
            let alert = UIAlertController(title: "Booking was cancelled!", message: "Booking was successfully cancelled!", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
            wself?.present(alert, animated: true)
        } else {
            let alert = UIAlertController(title: "Ooops!", message: "\(error.debugDescription)", preferredStyle: .alert)
            alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
            wself?.present(alert, animated: true)
        }
    }
}
```

In `numberOfSections(in tableView:)`, return 1 since we only need one section.

```swift
override func numberOfSections(in tableView: UITableView) -> Int {
    return 1
}
```

In `tableView(:numberOfRowsInSection section:)`, return the value of `BookingRow.count.rawValue`.

```swift
override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return BookingRow.count.rawValue
}
```

In `tableView(:cellForRowAt indexPath:)`, create a `UITableViewCell` and create a switch control structure by initialising a `BookingRow` enum value from `indexPath.row`. Based on the cases, populate the `textLabel` with `title`, `bookingDescription`, `startTime`, `endTime` and `bookingId` from your `MPBooking` instance.

```swift
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = UITableViewCell.init(style: .subtitle, reuseIdentifier: nil)
    switch BookingRow.init(rawValue: indexPath.row)  {
    case .title:
        cell.textLabel?.text = booking.title ?? ""
        cell.detailTextLabel?.text = "Title"
    case .description:
        cell.textLabel?.text = booking.bookingDescription ?? ""
        cell.detailTextLabel?.text = "Description"
    case .start:
        cell.textLabel?.text = "\(booking.startTime ?? Date.init())"
        cell.detailTextLabel?.text = "Start time"
    case .end:
        cell.textLabel?.text = "\(booking.endTime ?? Date.init().addingTimeInterval(60*60))"
        cell.detailTextLabel?.text = "End time"
    case .id:
        cell.textLabel?.text = booking.bookingId ?? ""
        cell.detailTextLabel?.text = "Booking id"
    default : ()
    }
    return cell
}
```

In `tableView(:cellForRowAt indexPath:)`, create a switch control structure again by initialising a `BookingRow` enum value from `indexPath.row`. Based on the cases, either initialise and present `FieldEditController` or `DatePickerController` which we will implement next.

```swift
override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    weak var wself = self
    switch BookingRow.init(rawValue: indexPath.row) {
    case .title:
        let fieldEditVC = FieldEditController.init()
        fieldEditVC.title = "Edit Title"
        fieldEditVC.beginEdit(initialValue: booking.title) { (value) in
            wself?.booking.title = value
            wself?.tableView.reloadData()
        }
        present(fieldEditVC, animated: true, completion: nil)
    case .description:
        let fieldEditVC = FieldEditController.init()
        fieldEditVC.title = "Edit Description"
        fieldEditVC.beginEdit(initialValue: booking.bookingDescription) { (value) in
            wself?.booking.bookingDescription = value
            wself?.tableView.reloadData()
        }
        present(fieldEditVC, animated: true, completion: nil)
    case .start:
        let dateEditVC = DatePickerController.init()
        dateEditVC.title = "Edit Start Date"
        dateEditVC.beginEdit(initialValue: booking.startTime) { (value) in
            wself?.booking.startTime = value
            wself?.tableView.reloadData()
        }
        present(dateEditVC, animated: true, completion: nil)
    case .end:
        let dateEditVC = DatePickerController.init()
        dateEditVC.title = "Edit End Date"
        dateEditVC.beginEdit(initialValue: booking.endTime) { (value) in
            wself?.booking.endTime = value
            wself?.tableView.reloadData()
        }
        present(dateEditVC, animated: true, completion: nil)
    default : ()
    }
}
```

Creating UI for editing text and dates is outside the scope of this tutorial. But since we need it for creating the actual Booking, you are advised to just insert the following 3 controllers into your code.

First a controller `EditController` for arranging the presented editing view skeleton.

```swift
class EditController: UIViewController {
    let doneButton = UIButton.init()
    let titleLabel = UILabel.init()
    override var title: String? { didSet { titleLabel.text = title } }
    let sw = UIStackView.init()
    func spacer() -> UIView {
        return UIView.init()
    }
    override func viewDidLoad() {
        sw.addArrangedSubview(doneButton)
        sw.addArrangedSubview(titleLabel)
        sw.spacing = 40
        sw.alignment = .center
        sw.axis = .vertical
        let backgroundView = UIView.init(frame: CGRect(x: 0,y: 0,width: 3000,height: 3000))
        backgroundView.backgroundColor = UIColor.systemBackground
        backgroundView.translatesAutoresizingMaskIntoConstraints = false
        sw.insertSubview(backgroundView, at: 0)
        view = sw

        doneButton.setTitle("Done", for: .normal)
        doneButton.setTitleColor(.link, for: .normal)
        doneButton.addTarget(self, action: #selector(close), for: .touchUpInside)
    }
    @objc func close() {
        self.dismiss(animated: true, completion: nil)
    }
}
```

Secondly, a controller `DatePickerController` inheriting `EditController` presenting and managing the date picker.

```swift
class DatePickerController: EditController {

    private let datePicker = UIDatePicker.init()
    var didEdit : ((_ value:Date) -> Void)?
    func beginEdit(initialValue:Date?, didEdit: @escaping ((Date) -> Void)) {
        datePicker.date = initialValue ?? Date.init()
        self.didEdit = didEdit
    }

    override func viewDidLoad() {

        super.viewDidLoad()

        datePicker.addTarget(self, action: #selector(didEditDate), for: .allEvents)

        sw.addArrangedSubview(datePicker)
        sw.addArrangedSubview(spacer())

    }

    @objc func didEditDate() {
        didEdit?(datePicker.date)
    }
}
```

Lastly, a controller `FieldEditController` inheriting `EditController` presenting and managing the text field.

```swift
class FieldEditController: EditController, UITextFieldDelegate {

    private let textField = UITextField.init()
    private var didEdit: ((_ value:String) -> Void)?
    func beginEdit(initialValue:String?, didEdit: @escaping ((String) -> Void)) {
        textField.text = initialValue ?? ""
        self.didEdit = didEdit
    }

    override func viewDidLoad() {

        super.viewDidLoad()

        sw.addArrangedSubview(textField)
        sw.addArrangedSubview(spacer())

        textField.becomeFirstResponder()
        textField.delegate = self

    }

    func textFieldDidEndEditing(_ textField: UITextField) {
        didEdit?(textField.text ?? "")
    }
}
```

This concludes the tutorial about Booking in the MapsIndoors  iOS SDK. Depending on your dataset you should not be far from a working Booking experience where you can list Bookable Locations, list Bookings and create new Bookings.

[See the sample in BookableLocationsController.swift](https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Booking/BookableLocationsController.swift)
