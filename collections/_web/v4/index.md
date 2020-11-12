---
title: MapsIndoors Web SDK v4
permalink: /web/v4/
nav_weight: 1
published: true
date: 2020-11-05
---

Welcome to the documentation site for the MapsIndoors JavaScript SDK. On this page you will get an overview of the MapsIndoors web application and which prerequisites you need in order to start playing around with the SDK yourself. In the bottom of this page you will find an overview of our guides to get you started.

This guide explains how to start using a MapsIndoors map in your HTML application.

To benefit from the guides, you will need basic knowledge about:

* JavaScript
* HTML/CSS
* Google Maps Javascript API V3

## Live Demo

To get an overview of the MapsIndoors web app capabilities check out a [running version of MapsIndoors here](https://clients.mapsindoors.com/demo).

## Prerequisits before getting your hands dirty

The MapsIndoors web application is built on top of Google Maps. You therefore need to get a Google Maps API key.

You also need a MapsIndoors API key in order to see indoor floor plans.

### Get a Google Maps API Key

You need to setup the Google Maps API in your project by following the steps in the link below:

* Web: [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/get-api-key)

Some Web Service APIs are also needed for the MapsIndoors SDK, so make sure to enable them when getting your key:

* [Google Maps Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/start)
* [Google Maps Directions API](https://developers.google.com/maps/documentation/directions/start)
* [Google Places API Web Service](https://developers.google.com/places/web-service/intro)

Remember to enable relevant Maps products (i.e. Maps JavaScript API) in your Google project and include these on your API key if you apply restrictions.

### Get a MapsIndoors API Key

In order to include MapsIndoors in your app, you need an API key. If you are not a customer you can use this API key `79f8e7daff76489dace4f9f9` to follow the guide.

In order to include MapsIndoors in your own app with your own content, you need to [contact MapsPeople](https://resources.mapspeople.com/contact-us) to get your building drawings processed and hosted by us.

You will receive a unique API key to use when access has been granted. If you are exploring how this service can become part of your own product, you can read about [partnering with MapsPeople here](https://www.mapspeople.com/become-a-partner).

## Showcase Web App

A [showcase app is available on GitHub](https://github.com/MapsIndoors/MapsIndoorsWeb), free to use and adapt to your needs.

### Try the Showcase Web App right away

Before you begin, make sure your development environment includes Node.js, npm package manager and [Angular CLI globally](https://angular.io/cli#installing-angular-cli).

Using a terminal/shell in the project folder, run the following commands:

* Run `npm install` to install all dependencies.

* Run `npm start` for a dev server and then enter an API key or Alias from your Solution in the URL, e.g. [http://localhost:4200/demo](http://localhost:4200/demo). The app will automatically reload if you change any of the source files.

## Work with MapsIndoors SDK behind a Firewall

If you need to work with MapsIndoors SDK behind a firewall, you might need to [white-list some IP-adresses](../../ip-whitelisting).

---

## Guides

* [Upgrade Guide]({{ site.url }}/web/v4/upgrade-guide/)
* [Create a simple map with MapsIndoors]({{ site.url }}/web/v4/guides/simple-map/)
* [Introduction to DispayRules]({{ site.url }}/web/v4/guides/display-rules-intro/)
* [Event handling]({{ site.url }}/web/v4/guides/using-events/)
* [Search and filtering]({{ site.url }}/web/v4/guides/search-and-filtering/)
