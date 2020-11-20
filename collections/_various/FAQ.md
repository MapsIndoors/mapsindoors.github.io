---
title: Frequently Asked Questions
permalink: /faq/
published: true
date: 2020-10-30
---

Here you can find answers to frequently asked questions regarding MapsIndoors. The site will be updated continuously.
If you cannot find what you are searching for you are always welcome to [contact our support team](https://resources.mapspeople.com/get-support).

## MapsIndoors Implementation Questions

### Does MapsIndoors support Xamarin forms

The MapsIndoors iOS and Android SDKs have Xamarin bindings, and can be used in Xamarin projects. However, MapsIndoors does not have components for use directly with the Xamarin Forms UI framework
For more information [have a look here](https://mapsindoors.github.io/xamarin/v3/).

### Can public Google Maps locations be removed from a MapsIndoors solution

Yes, it is possible. You can [read more here](https://developers.google.com/maps/documentation/javascript/styling) on how to style the map including removing Google Maps Locations.

### How can I get a menu structure with Category icons via the mobile SDKs

First you need to create Categories within the CMS for your solution. You can do that within the Categories tab. When you have created the categories you need to make sure that they have been assigned to one or more Locations.

In the App Settings -> App Configuration tab within the CMS you can see the Categories, decide which Categories should be shown, which sequence they should be displayed in and with what icon.

The menu items can be retrieved from the `MPAppDataProvider` on iOS and the `MapsIndoors.getAppConfig()` method on Android.

### Does MapsIndoors support 3D, AR, or a 360-degree view

MapsIndoors now supports Google Street View indoors for our web solution. Interactive panoramas, like the ones we know from Google Maps Street View, are composed by a sequence of 360 degree images. To create these images, you can either use the official Google Maps Street View app or get a certified photographer to help you. When the images are uploaded to Google Maps Street View, go to your MapsIndoors CMS and link your points of interest to the right pictures in Street View.

While the MapsIndoors SDK is currently not an AR/VR SDK, we do expose a lot of geometries. These geometries, e.g. for a route or a location, are referenced in a global (WGS84) coordinate system, and to work for AR/VR, they must be converted to a local metric coordinate system. If you have the development skills, we can definitely help you!

### In what cases do the MapsIndoors SDKs call Google Maps APIs

MapsIndoors utilises Google Maps SDK/APIs for iOS, Android and Web.

The number of map views depends on the implementation of the app on top of the MapsIndoors SDK. Map views on the iOS and Android SDKs are unlimited and free. On Web map views are not unlimited and free.

With regards to route requests that go from the outside into a venue or vice versa e.g. from “Central Station” to “Room X in Building A” or from “Room Y in Building C” to “Empire State Building” the Google Directions API and the Google Distance Matrix API is called.  
The API calls are made to get a Google route as well as identifying feasible “entrances” to/from the venue. These API calls are priced per call per element.

Forgeneral pricing [read more here](https://cloud.google.com/maps-platform/pricing?hl=da) or get in [contact](https://resources.mapspeople.com/contact-us).

### Does MapsIndoors make a Google Places API call on every search

The MapsIndoors SDKs do not call the Google places API at any time. It is up to the applications built on top of the SDKs if they do in the search for example.

The MapsIndoors standard app makes Google Places API calls in the directions panel when the user searches for either a starting location or destination. The Google Places API will be called for every keystroke forming a query with 2 or more characters.

The MapsIndoors standard app both searches in the MapsIndoors database and makes a Google Places API call. The results are combined and presented in one list in the standard app.

When a Google Place suggestion is selected by the user, the Standard Apps call the Google Places API or the Google Geocoding API to get the actual geographical coordinates for the suggestion.

It is therefore up to your application whether a Google places API call is being made upon search or not, or whether it is combined with your solution data.

It is important to note that if you search for indoor content using Google Places API, you might not get floor level (any) information that corresponds to MapsIndoors floor levels!

### How to get accurate indoor positioning (blue dot) using the MapsIndoors SDK

MapsIndoors is an Indoor Navigation Provider that provides directions and guide users as well as present relevant information on the map.

In order to get a precise user position indoors (Blue Dot Experience), dynamic turn-by-turn routing, location-based advertising etc. an Indoor Positioning System (IPS) should be put in place in the relevant building(s).

MapsPeople do not sell Indoor Positioning Systems, but MapsIndoors integrate with a range of them, [read more here](https://mapsindoors.github.io/product/#indoor-positioning-system).

If your organisation wants to have precise positioning there are a range of different technologies to consider such as Beacons, WiFi, ultra-sound etc. You can [read more here](https://blog.mapspeople.com/mapsindoors/indoor-positioning-101).

To some extent, iOS CoreLocation and Android Location Services can fulfill the role of an IPS, depending on the building infrastructure. This should be tested first. You will need some basic knowledge of the LocationManager on Android and the CLLocationManager on iOS.

With regards to specific implementation of showing a blue dot, representing user position on mobile, see:

- Android: [this tutorial](https://mapsindoors.github.io/ios/v3/mapsindoors/blue-dot/).
- iOS: [this tutorial](https://mapsindoors.github.io/android/v3/tutorials/showuserlocationdemopositionprovider/).

### What is the difference between using the phone’s GPS and an indoor positioning technology

GPS is a standardized service available on most mobile devices that is suitable for device positioning outdoors. An indoor positioning technology is typically a combination of technologies, including GPS, WiFi, BLE, and sensor-technology in order to determine an indoor position of an end user’s device.

### Can GPS coordinates be overwritten for web apps

If you never instantiated our `PositionControl` module in the Web SDK, you are able to use another position provider and plot the position from that provider on the map.

### Can MapsIndoors be used for tracking assets

MapsIndoors can be used for asset tracking in at least two ways:

1. By integrating an asset tracking Live Data Source through our backend services, and utilizing this integration through the [Live Data feature in the SDKs](https://mapsindoors.github.io/ios/v3/live-data/).

2. By integrating an asset tracking Data Source on the client side, through our [SDKs using the Location Source feature](https://mapsindoors.github.io/location-sources-in-mapsindoors/).

### How to create a search experience

You can choose to only search in MapsIndoors Locations or combine it with a search in the locations of the underlying map provider. MapsIndoors Standard apps search in both MapsIndoors locations, but also in Google Maps locations.
Use the following links to learn about creating search experiences on the different platforms.

- JavaScript: Follow [this tutorial](https://mapsindoors.github.io/web/v4/guides/search-and-filtering/).
- Android: Follow [this tutorial](https://mapsindoors.github.io/android/v3/tutorials/searchmapdemosearchfragment/).
- iOS: Follow [this tutorial](https://mapsindoors.github.io/ios/v3/search/search-experience/).

### Is it possible to make a Progressive Web App (PWA) with the MapsIndoors JavaScript SDK

Progressive web apps are mainly for running websites in a “mobile app-like” manner on mobile devices. The JavaScript SDK is suited for this as well as most of the work required is within making the application feel like a native app on mobile devices.
However, depending on the amount of map tiles in a solution it may not be trivial to store all of these in the browser cache in an offline context (also, Google doesn’t have an offline mode for maps for Web).

### Can the MapsIndoors web solution be used on mobile in place of having native apps

You can create an excellent indoor wayfinding experience using the MapsIndoors SDK for web. You can see our MapsIndoors Standard Web App as an example. However, most third-party indoor positioning services are only available on native Android and iOS solutions. The ability to tilt and rotate maps is also only available on iOS and Android.

### Is it possible to create dynamic overlays on top of the map

You can change the appearance of an existing location or you can provide new data, which isn’t tied to an existing location in the MapsIndoors Backend. Within the MapsIndoors SDKs the displayRules control the appearance of a location. You can read more here about Display Rules:

- [Documentation for JavaScript](https://app.mapsindoors.com/mapsindoors/js/sdk/latest/docs/global.html#DisplayRule) and [dynamic updates](https://mapsindoors.github.io/ios/v3/map-styling/) for web.
- [Documentation for Android](https://app.mapsindoors.com/mapsindoors/reference/android/v3/com/mapsindoors/mapssdk/LocationDisplayRule.Builder.html).
- [Documentation for iOS](https://app.mapsindoors.com/mapsindoors/reference/ios/v3/interface_m_p_map_control.html#a53a48aaa8d76bd8eecda58c1e9bf31ad) and [map styling](https://mapsindoors.github.io/ios/v3/map-styling/) for iOS.

### How can you display only one of your categories on the map

In order to request Locations you use the LocationsService. The filter function, which you can [read more about here](https://mapsindoors.github.io/web/v3/guides/search_and_filtering/) can be used to filter a Category e.g. "Offices". This will provide you with a list of the relevant locations.

In order to display them on the map for web you will have to use the `MapsIndoors.filter( locationIds:[String] )` method and on iOS and Android the `MapControl.searchResult` method. The input is the location's ID's and when they are called only the Locations whose ID's match will be displayed on the map.

### How do you integrate MapsIndoors SDK into your own app

MapsIndoors is built on top of a map provider - often Google Maps. In order to quickly get up and running you can initialize a Google Map and apply MapsIndoors content on top of it with just a few lines of code. Complexity grows depending on your feature requirements. Learn more from [our guides for Web, Android and iOS](https://mapsindoors.github.io/).

### Can the searchability of a Location be enabled/disabled from the Integration API

Yes, [have a look here](https://mapsindoors.github.io/api/v1/#object-definition). You can set the Status bitfield.

- Not active & not searchable = 0
- Active & not searchable = 1
- Not active & searchable = 2
- Active & searchable = 3

<!-- ### If we want our users to use their mobile device's browser to navigate from home to their gate, is it possible to pop them out to Google Maps / Apple Maps / Waze for driving directions and then pop them back into the browser when they've arrived at the airport?

Short Answer: We don't believe this is possible, but we aren't 100% certain it isn't. It would be quite tricky.

Long Answer: Let's start with IF they had a mobile app. If the airport has a mobile app, there could be buttons / callouts that send the user to the driving navigation app of their choice (Google Maps / Apple Maps / etc). The airport could set up a geofence so the mobile app knows when the passenger has arrived at the airport. The geofence makes it possible to make a device-local notification that is shown to the user like any other notification. When the notification is tapped, the app is launched. Easy peasy ;-).

Side note, an app like ours can launch the Google Maps app with a special parameter that indicates whether a “back button” should be presented in the Google Maps UI. When that button is tapped in Google Maps, the originating app is launched. But that is specific to Google Maps.
Now, if they don't have a mobile app, there are two main challenges:

1) Listening for position changes while the browser is idle and another app is running.
It's possible ServiceWorkers can do the trick (https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API). But we are not sure that the Geolocation API, which is used for determining the device position, is available within a ServiceWorker.

2) Pop back to the browser / make a device-level notification that is shown to the user when arriving at the airport.
We have never heard of that being possible, but we are not 100% certain it isn’t. A workaround might be to send a notification via the Push API (https://developer.mozilla.org/en-US/docs/Web/API/Push_API) with a link to the website with the MapsIndoors map. -->

## CMS

### What is the limits of App User Roles per solution

You can create as many ap user roles as you like to accomodate your need for different routing based on user profile within your app.

### Do icons have to be stored in the CMS or can they be stored elsewhere and be represented on the map

When creating locations via the CMS you can only use icons stored from the CMS. Custom icons have to be uploaded via the Icon Manager within the CMS. For a type of Locations this can be set within the Location Types panel and for a single Location within the Locations menu in the CMS.

### How is Location images stored via the "Image URL" in the CMS handled

The MapsIndoors backend does not download or store images from the image URL; it is only loaded on the app side. However, a few things to keep in mind for Location images.

If the image is stored in our CMS, we guarantee the availability of the image. If you store it externally, you need to make sure that it is available via the provided URL.

For mobile there are offline mode considerations to make. MapsIndoors does not yet load these images when a synchronizeContent method is called. If you embed all the data into your app (pre-bake all content) then your images will be included. To sum up offline variants:

1. Embed all data into an app using our build script. This will put a copy of all MapsIndoors data and map tiles inside the mobile app at build time. This means you can download an app from the App Store, put your phone into flight mode, launch the app, and everything will work.

2. The app may use synchronizeContent, which downloads all data and map tiles except the POI images. If you go into offline mode after this method is called, nothing will be shown in place of the image.

### Can routes be changed manually

You can edit the route network within the CMS in the "Route Access" tab. You can do so by opening and closing paths and apply waiting times at specific checkpoints and only allow access tu user with a soecific user role.

If your route changes go beyond these features, please submit a support ticket and we’ll take care of it for you!

### Can floor plan content be updated manually

It is not possible to edit room walls in the MapsIndoors CMS. However, you can easily change names and other relevant content of any room and draw areas inside a room or spanning rooms.

If your desired changes go beyond these features, please submit a support ticket and we’ll take care of it for you!

### Can map colors be changed manually

The colors are inherent in the map tiles and requires our Deployment Team to create new tiles for you. Please submit a support ticket and we’ll take care of it for you!

### Can a Location have custom content

Using Location Type Templates you can add new properties to a Location Type. For example if you want to have emails added for Locations of type "Office" you can create that property for the Type Offices. You can choose whether it should be in the format of an email adress, a URL or text - json or rich text. The mobile SDKs allow you to read these properties and use them in any way you please within your app.

### What does the lat/long in Location metadata refer to

The Locations' lat/long is the coordinates of the POI (the icon you see in the middle of the room). When digitizing the map, we will usually place this in the middle of the room, but you are free to move the POI/icon within the CMS, which will change the lat/long of the room.

### Can the MapsIndoors CMS be integrated with another Facility Management System so content only needs to be changed once

MapsIndoors can be integrated with any other system using the MapsIndoors REST API.

## Deployment

### How is the process of getting a MapsIndoors solution

If you want to have a MapsIndoors application with your buildings in it please don't hesitate to contact us!

The process involves you providing us with the floor plans of your buildings in e.g. CAD format. Our MapsIndoors Deployment specialists will then process your building(s) and create a MapsIndoors Solution specific to your organisation.

You will get a MApsIndoors API key, which unlocks your specific map - either used in our MapsIndoors Standard Apps or if you want to implement your own apps on top of our SDKs. Please review the [MapsIndoors SDK Guides and Documentation](https://mapsindoors.github.io/).

If you want to know more about the MapsIndoors app and/or the commercial aspects of MapsIndoors, please [contact us here](https://resources.mapspeople.com/contact-us). If you have other technical questions that are not answered by our existing documentation, please create a support request.

### What is the expected timeframe for a MapsIndoors project

The time can very quite widely; from two days to 4-6 weeks.

It is dependent on a number of factors:

- How big are the building(s) you need to have digitized
- How complex are the buildings in shape
- The level of quality of the floor plans you can provide

However, we can deliver increments so that you do not have to wait until every single square foot has been digitised. We will agree on this in collaboration with you.

### In what format do you need our data for MapsIndoors deployment

We support various data formats, but prefer DWG files for building drawings and CSV files for the related meta data about your rooms and other locations. The attributes for the locations should be delivered in a spreadsheet, which we will provide you with.

We support a variety of different floor plan formats:

GIS formats (preferred):
– MapInfo
– Esri Shape files
– Esri Geodatabase
– Geojson
– KML
– KMZ

CAD formats (preferred):
– DWG
– DXF

Graphics formats:
– AI
– PDF
– Images

### Will our MapsIndoor maps visible on google.maps.com

The MapsPeople solution is built on top of the Google Maps SDK, and is not a part of the public google.maps.com. Rather, it is owned by you.

It is possible to get your building/venue on to the public google.maps.com site with a separate agreement or you can apply to Google independently.

MapsPeople can not guarantee if and when the building will appear on google.maps.com and has no say in Google’s independent acceptance process.

### Can you help me with upload of CAD drawings to Google Indoor Maps

Yes, we have experience uploading our MapsIndoors maps to Google Indoor Maps.
MapsPeople, however, can not guarantee when Google will update the Google Indoor Maps platform with your new data.

## Security

### Does Google have access to our data

Client data belongs to our clients alone and is not shared or exchanged with third parties such as Google or other business partners.

### Where do MapPeople store our data

Map graphics are generated and hosted by MapsPeople. To ensure fast and easy delivery to all corners of the world, MapsPeople relies on Amazon’s Content Delivery Network (CDN). MapsIndoors data and services are hosted in and shared between a cloud provider’s regional data centers across the world.

To ensure safety, scalability, and high availability, MapsPeople hosts locations and routing network data as well as services and APIs at Google and Azure. All cloud providers are ISO certified. The MapsIndoors database and management services hosted at cloud providers take advantage of the extra measures of security granted by the service providers.

All MapsIndoors services and APIs are designed, programmed, and maintained based on the requirements outlined in PCI-DSS-12.

### What data are you collecting/monitoring from end users’ activities

We monitor all requests to our back-end services which can include data such as:
– search words
– search filtering
– unique sessions (anonymous session ID)
– technical info (device/browser info, software versions, etc.)

<!-- ### Is landmark navigation natively supported

Providing more detailed indoor route descriptions is on the roadmap, but this does not include support for landmarks. We’ve received feedback internally and externally that landmark navigation is a useful feature, and we’ve documented it as such so we can revisit it.

For right now, there is a solution/workaround, but it’s going to require some fun logic.

In the CMS create a location with a new category, e.g. “Indoor Landmark“. Note down the key of that category to use it in the code later.

Routes contain coordinates, so we need to iterate through these (MPRoute.legs.steps.start_location). With each coordinate set you can query a bounding box (MPFilter.bounds) search by extruding the coordinate. Put a limit (MPFilter.take) of e.g. 10 to the results.

When you have a result, you need to ensure that the found landmark/location and the route coordinate is in the same room. You can do this by filtering the results to get a list of rooms (MPLocation.baseType == .room), then filter out the landmarks (MPLocation.categories.allKeys.contains(…)).

To determine room containment you can use the MPGeometryHelper:

let polygons:[MPPolygonGeometry] = MPGeometryHelper.polygons(for: room)
for polygon in polygons {
  let isInsideRoom = polygon.contains(landmark.geometry.getCoordinate())
}
-->

## Google Maps

<!--### We are using `REACTJS` library for MMF Web. For Google JavaScript API, we are using 3rd party npm package react-google-maps which creates the react component wrapper for the google JavaScript maps api. This library provides very simple bindings to the Google Maps api and lets us use it in our app as React Components.

One of the issues is we are trying to update the map markers dynamically on user interaction. Using google JavaScript API, we have methods to add or update or remove markers and the transition is smoother without re-rendering of the map. If we use react-google-maps, we need to pass the updated markers to the google maps react component which trigger’s the re-render of the google maps and the transition is flickery.-->

### Are there any best practices for Google Maps JavaScript API and ReactJS Library combinations? Does google support any react map libraries or defines any best practices for the same

Unfortunately there is no official support for React. However, [reach out](https://resources.mapspeople.com/get-support) with your specific issue and we will do our best to help you.