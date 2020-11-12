---
title: Event handling
parent: guides
nav_weight: 400
published: true
date: 2020-11-05
---

## Overview

In this, we will take a look at the events that MapsIndoors offers and how to utilize them.

> Events are actions or occurrences that happen in the system you are programming, which the system tells you about so you can respond to them in some way if desired.
>-- <cite>[MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)</cite>

For example, if the user clicks on a Location on the map, then you can react to that action by presenting the user with additional info about the Location.

A code example is shown in the JSFiddle below, but will be run through bit by bit in this guide.

<script async src="//jsfiddle.net/mapspeople/gex62wzn/embed/html,result/"></script>

### Ready event

The `ready` event will be fired when MapsIndoors is done initializing and is ready to interact.

```javascript
mapsIndoors.addListener('ready', (e) => {
 log(`MapsIndoors: Ready`);
});
```

### Building changed event

The `building_changed` event will be fired when the map is moved around and a new Building comes in focus.

This is also related to the Floor Selector, which will update its view to show the Floors of the current Building.

The event handler is called with a [building](https://app.mapsindoors.com/mapsindoors/js/sdk/latest/docs/global.html#Building) object representing the building in focus.

```javascript
mapsIndoors.addListener('building_changed', (e) => {
 log(`Building changed: ${e.buildingInfo.name}`);
});
```

### Floor changed event

The `floor_changed` event will be fired when the Floor is changed; either by clicking the Floor Selector or by calling `setFloor()` on the MapsIndoors instance.

The event handler is called with the Floor Index of the current Floor.

```javascript
mapsIndoors.addListener('floor_changed', (e) => {
 log(`Floor changed: ${e}`);
});
```

### Click event

The `click` event will fire when the user clicks on a Location on the map.

The event handler is called with a [location](https://app.mapsindoors.com/mapsindoors/js/sdk/latest/docs/global.html#Location) object representing the Location clicked.

```javascript
mapsIndoors.addListener('click', (location) => {
 log(`Clicked: ${location.properties.name}`);
});
```

---

## Guides

* [Upgrade Guide]({{ site.url }}/web/v4/upgrade-guide/)
* [Create a simple map with MapsIndoors]({{ site.url }}/web/v4/guides/simple-map/)
* [Introduction to DispayRules]({{ site.url }}/web/v4/guides/display-rules-intro/)
* [Event handling]({{ site.url }}/web/v4/guides/using-events/)
* [Search and filtering]({{ site.url }}/web/v4/guides/search-and-filtering/)
