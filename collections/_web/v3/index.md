---
layout: start
title: MapsIndoors Web SDK v3
permalink: /web/v3/
published: true
date: 2019-09-30
---

This guide explains how to start using a MapsIndoors map in your HTML application.

To benefit from the guides, you will need basic knowledge about:

* JavaScript
* HTML/CSS
* Google Maps Javascript API V3

## Setting up a map

### Set the MapsIndoors API Key

In order to include MapsIndoors in your app, you need an API key. If you are not a customer you can use this API key `57e4e4992e74800ef8b69718` to follow the guide.

In order to include MapsIndoors in your own app with your own content, you need to [contact MapsPeople](https://resources.mapspeople.com/contact-us) to get your building drawings processed and hosted by us.

You will receive a unique API key to use when access has been granted. If you are exploring how this service can become part of your own product, you can read about [partnering with MapsPeople here](https://www.mapspeople.com/become-a-partner).

### Setup Your HTML

Include the following scripts in your HTML document. MapsIndoors depends on Google Maps API v3, so if it’s not present on script load, MapsIndoors will not be able to initialize.

If you need to use a floor selector (most projects do), just add a css reference as in the sample. This will provide a basic CSS-layout for the floor selector.

```html
{% raw %}<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=geometry&key=MY_GOOGLE_API_KEY"></script>
<script type="text/javascript" src="https://app.mapsindoors.com/mapsindoors/js/sdk/VERSION/mapsindoors-VERSION.js.gz?apikey=MY_MAPSINDOORS_API_KEY"></script>
// Load css for default floor selector
<link href="https://app.mapsindoors.com/mapsindoors/js/sdk/ui/FloorSelector.css" type="text/css" rel="stylesheet" />{% endraw %}
```

Replace:

* `MY_GOOGLE_API_KEY` with your own Google API key
* `VERSION` with the wanted MapsIndoors version. See our <a href="https://app.mapsindoors.com/mapsindoors/js/sdk/latest/docs/index.html">Reference Docs</a> for the latest version number. Please note there are two occurrences of `VERSION` to replace in the URL.
* `MY_MAPSINDOORS_API_KEY` with your MapsIndoors API key

As always when setting up Google Maps, create a div with defined width and height.

```html
<div id="map" style="width:600px;height:600px"></div>
```

### Setup JavaScript

Then add the following JavaScript code in a script tag in the top of your HTML page.

```javascript
var myGoogleMap, myMapsIndoors;

var init = function () {

   // Setup Google map
   myGoogleMap = new google.maps.Map(document.getElementById('map'), { center: { lat: 57.085809, lng: 9.9573899 }, zoom: 17 });

   // Setup MapsIndoors
   myMapsIndoors= new mapsindoors.MapsIndoors({ map: myGoogleMap });

   // Add a floor selector
   var div = document.createElement('div');
   var floorSelector = new mapsindoors.FloorSelector(div, myMapsIndoors);
   myGoogleMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(div);

};

google.maps.event.addDomListener(window, 'load', init);
```

## Trying the Showcase Web App

A [showcase app is available on GitHub](https://github.com/MapsIndoors/MapsIndoorsWeb), free to use and adapt to your needs.

### Try the Showcase Web App right away

Before you begin, make sure your development environment includes Node.js, npm package manager and [Angular CLI globally](https://angular.io/cli#installing-angular-cli).

Using a terminal/shell in the project folder, run the following commands:

* Run `npm install` to install all dependencies.

* Run `npm start` for a dev server and then enter a Solution ID in the URL, e.g. <http://localhost:4200/demo.> The app will automatically reload if you change any of the source files.

### Live Demo

Check out a running version [here](https://demo.mapsindoors.com/demo).

## Work with MapsIndoors SDK behind a Firewall

If you need to work with MapsIndoors SDK behind a firewall, you might need to [white-list some IP-adresses](../../ip-whitelisting).
