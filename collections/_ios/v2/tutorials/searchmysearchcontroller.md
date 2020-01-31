---
title: Create a Search Experience with MapsIndoors - Part 1
parent: tutorials
nav_weight: 120
date: 2019-09-30
published: true
---

> A [newer version]({{ site.url }}/ios/v3) of the MapsIndoors SDK for iOS is available. The legacy version will not receive new features and will only get critical bugfix and security updates.
{: .mi-warning}

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

* An instance of type `MPLocationsProvider` (the service)
* An instance of type `MPLocationQuery`
* An array of `MPLocation` to hold your list of results
* Your delegate object
* A search bar view
* A table view

```swift
let locationsProvider = MPLocationsProvider.init()
let query = MPLocationQuery.init()
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
let stackView = UIStackView.init(arrangedSubviews: [searchBar, tableView])
stackView.axis = .vertical
view = stackView
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
    query.query = searchText
    query.queryMode = .autocomplete
    locationsProvider.getLocationsUsing(query) { (locationData, error) in
        if error == nil {
            self.locations = locationData!.list!
            self.tableView.reloadData()
        }
    }
}
```

Implement the `tableView:cellForRowAt` method. Set the `cell.textLabel.text` to reflect the *name* of the location of same index.

```swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "reuseIdentifier", for: indexPath)
    cell.textLabel?.text = locations[indexPath.row].name
    return cell
}
```

Implement the `tableView:didSelectRowAt` method. In this example we just call the delegate method and dismiss the view controller.
Delegate method will be handled by [SearchMapController](../searchmysearchcontroller)

```swift
func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    delegate?.didSelectLocation(location: locations[indexPath.row])
    self.dismiss(animated: true, completion: nil)
}
```

In [Part 2](../searchmysearchcontroller) we will create the map view controller that displays the search selection.

[See the sample in MySearchController.swift](https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Search/MySearchController.swift)
