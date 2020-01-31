---
title: Search and filtering
parent: guides
layout: tutorial
nav_weight: 1200
published: true
date: 2019-11-25
---

## Search and filtering

<script async src="https://jsfiddle.net/mapspeople/k2jynm47/embed/html,result/"></script>

### Search

The `mapsindoors.LocationsService` offers the `getLocations` function. This function can be used for searching for POIs.
It will return a Promise that gets resolved when the query has executed.

See [LocationsService.getLocations](https://app.mapsindoors.com/mapsindoors/js/sdk/latest/docs/LocationsService.html#getLocations) for more information.

```javascript
searchElement.addEventListener('input', debounce((e) => {
    const value = e.target.value;
    if (value > '') {
        mapsindoors.LocationsService.getLocations({ q: value, includeOutsidePOI: true })
            .then(displayResults)
            .then(filterMap);
    } else {
        clearResults();
        clearFilter();
    }
}, 500));
```

The `debounce` method is there to ensure that the service is not being called too rapidly. This method delays the execution of the function by 500ms, unless `debounce` is called again within 500ms, in which case the timer is reset.

See this article ["What is debouncing" by Jamis Charles](https://medium.com/@jamischarles/what-is-debouncing-2505c0648ff1) for a more detailed description of the `debounce` concept.

When the function executes, we check to see if the input is empty or not. If the input is not empty, we proceed to construct the request object.

When the function executes, we check to see if the input is empty or not. If the input is not empty, we proceed to construct the request object.

We pass the value as the `q` property and set the `includeOutsidePOI` property to `true`. When the Promise resolves the response is passed to the displayResults helper function.

If the input is empty, we clear both the result list and reset the map filter by calling the helper functions `clearResults` and `clearFilter`.

```javascript
function displayResults(locations) {
    clearResults();

    if (locations.length > 0) {
        for (const location of locations) {
            searchResults.innerHTML += `<li>${location.properties.name}</li>`;
        }
    } else {
        searchResults.innerHTML = '<li class="no-results">No results matched the query.</li>';
    }

    return locations;
}
```

Two things happen here. First, we clear the previous results. Next, we check if any locations were returned. If so, we loop through them and add them to the result list.

If there are no locations returned, we show a message to the user stating "No results matched the query.". Otherwise, we pass the locations on to the next handler called `filterMap`

```javascript
function filterMap(locations) {
    mapsIndoors.filter(locations.map(location => location.id), false);
    return locations;
}
```

In the `filterMap` helper function, we create a list of `location id`s we can use to filter the POIs on the map by.

The second parameter tells MapsIndoors not to change the viewport of the map.

For more information, see [MapsIndoors.filter in the reference documentation](https://app.mapsindoors.com/mapsindoors/js/sdk/latest/docs/MapsIndoors.html#filter)
