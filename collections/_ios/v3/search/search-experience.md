---
layout: tutorial
title: Create a search experience with MapsIndoors
parent: search
nav_weight: 510
published: true
date: 2019-09-30
---
This is an example of creating a simple search experience using MapsIndoors. We will create a map with a search button that leads to another view controller that handles the search and selection. On selection of a location, we go back to the map and shows the selected location on the map.

We will start by creating a simple search controller that handles search and selection of MapsIndoors locations

Declare a protocol for our location selection with a `didSelectLocation` method

```swift
protocol MySearchControllerDelegate {
    func didSelectLocation(location:MPLocation)
}
```

Define `MySearchController`. In this tutorial our search controller is a `UIViewController` that implements the protocols `UISearchBarDelegate`, `UITableViewDelegate` and `UITableViewDataSource`

```swift
class MySearchController: UIViewController, UISearchBarDelegate, UITableViewDelegate, UITableViewDataSource {
```

Setup member variables for `MySearchController`:

* An instance of type `MPLocationService`
* An instance of type `MPQuery`
* An array of `MPLocation` to hold your list of results
* Your delegate object
* A search bar view
* A table view

```swift
let locationService = MPLocationService.sharedInstance()
let query = MPQuery.init()
var locations:[MPLocation] = []
var delegate:MySearchControllerDelegate? = nil
let tableView = UITableView.init()
let searchBar = UISearchBar.init()
```

In `viewDidLoad`, wire up your view controller to the tableview and search bar.

```swift
searchBar.delegate = self
tableView.delegate = self
tableView.dataSource = self
```

Register a class for the reusable table view cell.

```swift
tableView.register(UITableViewCell.self, forCellReuseIdentifier: "reuseIdentifier")
```

Arrange the search bar and the table view in a stack view.

```swift
let topFiller = UIView.init()
let stackView = UIStackView.init(arrangedSubviews: [topFiller, searchBar, tableView])
stackView.axis = .vertical
view = stackView
let kw = UIApplication.shared.keyWindow
topFiller.heightAnchor.constraint(equalToConstant:kw?.safeAreaInsets.top ?? 0).isActive = true
topFiller.backgroundColor = .blue
searchBar.barTintColor = .blue
searchBar.tintColor = .white
searchBar.showsCancelButton = true
searchBar.becomeFirstResponder()
```

In `MySearchController`, implement the `numberOfSections` method, return 1.

```swift
func numberOfSections(in tableView: UITableView) -> Int {
    return 1
}
```

Implement the `numberOfRowsInSection` method, return the length of your locations array.

```swift
func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return locations.count
}
```

Implement the `textDidChange` method:

* Change the query objects query property to reflect the current search text
* Call `getLocationsUsing` with the modified query
* In the callback block, reset the locations array with new results
* Reload table view

```swift
func searchBar(_ searchBar: UISearchBar, textDidChange searchText: String) {
    if searchText.count > 0 {
        query.query = searchText
        let filter = MPFilter()
        filter.take = 10
        locationService.getLocationsUsing(query, filter: filter) { (locations, error) in
            if error == nil {
                self.locations = locations!
                self.tableView.reloadData()
            }
        }
    } else {
        self.locations = []
        self.tableView.reloadData()
    }
}
```

Implement the `searchBarCancelButtonClicked` method, with dismissal of the view controller.

```swift
func searchBarCancelButtonClicked(_ searchBar: UISearchBar) {
    self.dismiss(animated: true, completion: nil)
}
```

Implement the `tableView:cellForRowAt` method. Set the `cell.textLabel.text` to reflect the *name* of the location of same index.

```swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "reuseIdentifier", for: indexPath)
    cell.textLabel?.text = locations[indexPath.row].name
    let defaultValue = ""
    cell.textLabel?.text?.append(", \(locations[indexPath.row].roomId ?? defaultValue), \(locations[indexPath.row].building ?? defaultValue), \(locations[indexPath.row].venue ?? defaultValue)")
    return cell
}
```

Implement the `tableView:didSelectRowAt` method. In this example we just call the delegate method and dismiss the view controller.

Delegate method will be handled by SearchMapController.

```swift
func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    delegate?.didSelectLocation(location: locations[indexPath.row])
    self.dismiss(animated: true, completion: nil)
}
```

[See the sample in MySearchController.swift](https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Search/MySearchController.swift)
