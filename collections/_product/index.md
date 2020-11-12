---
title: MapsIndoors Product Overview
published: true
date: 2019-09-30
permalink: /product/
---

MapsIndoors is an Indoor Wayfinding Platform, which you can build your map experience on top of.

MapsIndoors consists of:

* A Content Management System (CMS)
* Three SDKs:
  * Android
  * iOS
  * JavaScript
* Standard apps built on top of each SDK
* A kiosk web app
* An Integration API

All of these will be presented below.

## Prerequisites for a Custom MapsIndoors Solution

When you buy MapsIndoors your organisation needs to provide MapsPeople with floor plans for each of the buildings you want to have indoor navigation for.

When we receive these they will be digitised and positioned correctly in “the world”. This is what we define as a Solution, for which you will get a MapsIndoors API key. Use this API key when working with the SDKs to access your data.

## Content Management System

When you have a custom MapsIndoors Solution you also get access to the MapsIndoors CMS. Within the CMS you can manage Locations within your Solution; create, remove, update Locations such as parking lots, toilets, coffee machines etc. The content created within the CMS is the content that can be accessed and controlled via the SDKs.

The CMS is used for day-to-day management if a Location needs to be moved (could be a printer or a coffee machine), if Rooms get new names (meeting rooms for example), if access needs to be restricted to some Locations etc.

![MapsIndoors CMS](/assets/product/CMS.png)

## SDKs

The SDKs enable you to build your own custom app on top of, or as an integral part of, your existing app. The MapsIndoors SDKs are available for:

![Platforms](/assets/product/Platforms.png)

The MapsIndoors SDKs are the engines that makes sure you can create a route from a location in the world to one of your indoor locations, search your indoor locations, show the relevant information for a specific location etc. An exhaustive list of features within the SDKs can be found in the reference documentation for each platform.

## Standard Apps & Kiosk

MapsIndoors Standard Apps are built on top of the SDKs and visualises some of the SDK capabilities. They are more or less plug-and-play and provide a good basic indoor navigation app with a map, Category overview of Locations, search, directions and routing.

![WebApp](/assets/product/webApp.png)

The MapsIndoors Standard App suite also includes a plug-and-play Kiosk web app. The app can be run on an information stand and help one-time users of a facility find their way without having an app - for example at a hospital.

![Kiosk](/assets/product/Kiosk1.png)

## Integration API

The MapsIndoors Integration API is used to connect 3rd party systems with MapsIndoors in order to feed data into your MapsIndoors Solution. The API provides an interface to update data in MapsIndoors from an external source. An external source could be a Facility Management System that already contains relevant data for your MapsIndoors Solution.

It is possible to update Locations, Rooms, Venues, Buildings, Floors, Areas etc. automatically instead of having to do it manually via the MapsIndoors CMS.

## Integration Modules

Currently there are two types of integration modules supported; Real-time and Booking integrations.

Real-time integrations are characterised by displaying data “live” on the map (< 1 min delay), for example a live-updating position from a shuttle bus service in an airport. The data is not saved for long-term storage, only briefly cached to ensure delivery to the apps.

Booking integrations are characterised by data flowing in and out of MapsIndoors (read/write). Room bookings can happen directly through your app built with MapsIndoors, and you can display the booking status of a meeting room directly on the map, i.e. whether it is vacant or not.

## Indoor Positioning System

MapsIndoors is an Indoor Navigation Provider that provides directions and guide users as well as present relevant information on the map.

In order to get a precise user position indoors, dynamic turn-by-turn routing, location-based advertising etc. an Indoor Positioning System (IPS) should be put in place in the relevant building(s).

MapsPeople do not sell Indoor Positioning Systems, but MapsIndoors integrate with them. If your organisation wants to have precise positioning there are a range of different technologies to consider such as Beacons, WiFi, ultra-sound etc. You can [read more here](https://blog.mapspeople.com/mapsindoors/indoor-positioning-101).

If you want to know more about how to get your own Mapsindoors Solution [contact us here](https://resources.mapspeople.com/contact-us)
