---
title: Frequently Asked Questions
permalink: /faq/
published: true
date: 2020-10-30
---

Here you can find answers to frequently asked questions regarding MapsIndoors. The site will be updated continuously.
If you cannot find what you are searching for you are always welcome to [contact our support team](https://resources.mapspeople.com/get-support).

## Show user location

MapsIndoors is an Indoor Navigation Provider that provides directions and guide users as well as present relevant information on the map.
In order to get a precise user position indoors an Indoor Positioning System (IPS) should be put in place in the relevant building(s). MapsIndoors integrate with a range of them.
With regards to specific implementation see below.

### Android

In [this tutorial](https://mapsindoors.github.io/ios/v3/mapsindoors/blue-dot/) you can learn how to show a blue dot on the map, representing the users location.

### iOS

In [this tutorial](https://mapsindoors.github.io/android/v3/tutorials/showuserlocationdemopositionprovider/) you can learn how to show a blue dot on the map, representing the users location.

## Tracking assets

MapsIndoors can be used for asset tracking in at least two ways:

1. By integrating an asset tracking Live Data Source through our backend services, and utilizing this integration through the [Live Data feature in the SDKs](https://mapsindoors.github.io/ios/v3/live-data/).

2. By integrating an asset tracking Data Source on the client side, through our [SDKs using the Location Source feature](https://mapsindoors.github.io/location-sources-in-mapsindoors/).

## Creating a search experience

Search can be in MapsIndoors locations only or combined with the underlying map providers' location search. MapsIndoors Standard apps search in both MapsIndoors locations, but also in Google Maps locations.

### Android

Follow [this tutorial](https://mapsindoors.github.io/android/v3/tutorials/searchmapdemosearchfragment/) to learn about creating a search experience on Android.

### iOS

Follow [this tutorial](https://mapsindoors.github.io/ios/v3/search/search-experience/) to learn about creating a search experience on iOS.

### JavaScript

Follow [this tutorial](https://mapsindoors.github.io/web/v3/guides/search_and_filtering/) to learn about creating a search experience on web.

## Does MapsIndoors make a Google Places API call on every search?

The MapsIndoors SDKs do not call the Google places API at any time. It is up to the applications built on top of the SDKs if they do in the search for example.

The MapsIndoors standard app makes Google Places API calls in the directions panel when the user searches for either a starting location or destination. The Google Places API will be called for every keystroke forming a query with 2 or more characters.

The MapsIndoors standard app both searches in the MapsIndoors database and makes a Google Places API call. The results are combined and presented in one list in the standard app.

When a Google Place suggestion is selected by the user, the Standard Apps call the Google Places API or the Google Geocoding API to get the actual geographical coordinates for the suggestion.

It is therefore up to your application whether a Google places API call is being made upon search or not, or whether it is combined with your solution data.

It is important to note that if you search for indoor content using Google Places API, you might not get floor level (any) information that corresponds to MapsIndoors floor levels!

## In what cases do the MapsIndoors SDKs call Google Maps APIs?

MapsIndoors utilises Google Maps SDK/APIs for iOS, Android and Web.

The number of map views depends on the implementation of the app on top of the MapsIndoors SDK. Map views on the iOS and Android SDKs are unlimited and free. On Web map views are not unlimited and free.

With regards to route requests that go from the outside into a venue or vice versa e.g. from “Central Station” to “Room X in Building A” or from “Room Y in Building C” to “Empire State Building” the Google Directions API and the Google Distance Matrix API is called.  
The API calls are made to get a Google route as well as identifying feasible “entrances” to/from the venue. These API calls are priced per call per element.

Forgeneral pricing [read more here](https://cloud.google.com/maps-platform/pricing?hl=da) or get in [contact](https://resources.mapspeople.com/contact-us).

## Support of Xamarin forms

The MapsIndoors iOS and Android SDKs have Xamarin bindings, and can be used in Xamarin projects. However, MapsIndoors does not have components for use directly with the Xamarin Forms UI framework
For more information have a [look here](https://mapsindoors.github.io/xamarin/v3/).

## Accurate indoor positioning

MapsIndoors is a platform for Indoor Navigation. In order to obtain a precise position indoors you can set up an Indoor Positioning System (IPS) and integrate it with the MapsIndoors platform.
[Read more here](https://mapsindoors.github.io/product/#indoor-positioning-system)

## Making a Progressive Web App (PWA) with the MapsIndoors JavaScript SDK

Progressive web apps are mainly for running websites in a “mobile app-like” manner on mobile devices. The JavaScript SDK is suited for this as well as most of the work required is within making the application feel like a native app on mobile devices.
However, depending on the amount of map tiles in a solution it may not be trivial to store all of these in the browser cache in an offline context (also, Google doesn’t have an offline mode for maps for Web).

## Overriding GPS coordinates for progressive web apps

If you never instantiated our PositionControl module in the Web SDK, you are able to use another position provider and plot the position from that provider on the map.

## Creating dynamic overlays on top of the map

You can change the appearance of an existing location or you can provide new data, which isn’t tied to an existing location in the MapsIndoors Backend. Within the MapsIndoors SDKs the displayRules control the appearance of a location. You can read more here:

### Android

Display rules [documentation for Android](https://app.mapsindoors.com/mapsindoors/reference/android/v3/com/mapsindoors/mapssdk/LocationDisplayRule.Builder.html).

### iOS

[Display rules documentation](https://app.mapsindoors.com/mapsindoors/reference/ios/v3/interface_m_p_map_control.html#a53a48aaa8d76bd8eecda58c1e9bf31ad) and [map styling](https://mapsindoors.github.io/ios/v3/map-styling/) for iOS.

### JavaScript

[Display rules documentation](https://app.mapsindoors.com/mapsindoors/js/sdk/latest/docs/global.html#DisplayRule) and [dynamic updates](https://mapsindoors.github.io/ios/v3/map-styling/) for web.

## Location type template property support

You can add json / rich text as normal text in the property. The mobile SDKs allow you to read these properties and use them in any way you please.

## Location metadata lat/long

The Locations' lat/long is the coordinates of the POI (the icon you see in the middle of the room). When digitizing the map, we will usually place this in the middle of the room, but you are free to move the POI/icon, which will change the lat/long of the room.

## App user roles limit per solution

There is no limit.

## Displaying only one of your categories in your app

The filter function can be used to filter for the locations belonging to a category. Also [check out](https://mapsindoors.github.io/web/v3/guides/search_and_filtering/)

## Do icons have to be stored in the CMS or can they be stored elsewhere and represented on the map

Icons for locations/POIs can only use icons stored from the CMS. Any other images added via eg. the custom overlay can be hosted anywhere.

## Handling of images stored via the "Image URL" feature in the CMS

The MapsIndoors backend does not download or store images from the image URL; it is only loaded on the app side.

However, a few things to keep in mind for POI images:

If the image is stored in our CMS, we guarantee the availability of the image. If you store it externally, you need to make sure that it is available via the provided URL.

For mobile there are offline mode considerations to make. MapsIndoors does not yet load these images when a synchronizeContent method is called. If you embed all the data into your app (pre-bake all content) then your images will be included. To sum up offline variants:

1. Embed all data into an app using our build script. This will put a copy of all MapsIndoors data and map tiles inside the mobile app at build time. This means you can download an app from the App Store, put your phone into flight mode, launch the app, and everything will work.

2. The app may use synchronizeContent, which downloads all data and map tiles except the POI images. If you go into offline mode after this method is called, nothing will be shown in place of the image.

## Removing public Google Maps locations/POIs from a MapsIndoors solution

[Read more here](https://developers.google.com/maps/documentation/javascript/styling) on how to style the map including removing Google Maps Locations.

## Getting the Category icon and menu structure via the mobile SDKs

In the MapsIndoors data model, categories themselves do not have icons, but types and menu items have. The existence of menu items requires that the menu items have been created by enabling the categories to be displayed in the menu from the CMS. The menu items can be retrieved from the `MPAppDataProvider` on iOS and the `MapsIndoors.getAppConfig()` method on Android.

## Live positioning in MapsIndoors

MapsIndoors relies on a third-party positioning provider for live positioning. You can implement your own positioning provider with a third party SDK or we can help you.

## The difference between using my phone’s GPS and an indoor positioning technology

GPS is a standardized service available on most mobile devices that is suitable for device positioning outdoors. An indoor positioning technology is typically a combination of technologies, including GPS, WiFi, BLE, and sensor-technology in order to determine an indoor position of an end user’s device.

## Support 3D, AR, or a 360-degree view

MapsIndoors now supports Google Street View indoors for our web solution. Interactive panoramas, like the ones we know from Google Maps Street View, are composed by a sequence of 360 degree images. To create these images, you can either use the official Google Maps Street View app or get a certified photographer to help you. When the images are uploaded to Google Maps Street View, go to your MapsIndoors CMS and link your points of interest to the right pictures in Street View.

While the MapsIndoors SDK is currently not an AR/VR SDK, we do expose a lot of geometries. These geometries, e.g. for a route or a location, are referenced in a global (WGS84) coordinate system, and to work for AR/VR, they must be converted to a local metric coordinate system. If you have the development skills, we can definitely help you!

<!--
# CMS

## Changing the route/floor plan

You can edit your route network by opening and closing paths and apply waiting times at specific checkpoints. If your route/floor plan changes go beyond these features, please submit a support ticket and we’ll take care of it for you!

## Updating floor plan content

While it is not possible to edit room walls in the MapsIndoors CMS, you can easily change names and other relevant content of any room. You must submit any other floor plan changes as a support ticket.

## Changing map colors

The colors are inherent in the map tiles. In order to change the colors please file a ticket in our customer portal to change the colors within your map.

Development
Is the Blue Dot Experience included as one of the MapsIndoors SDK features?
An Indoor Positioning Service (IPS) is needed for the Blue Dot Experience. MapsIndoors SDK is itself not an IPS. To learn more about indoor position, we recommend this blog post.
MapsIndoors provides indoor maps and directions with seamless indoor/outdoor integration because our maps are built on Google Maps.
In order to utilize the Blue Dot Experience, users must find an IPS and use that location in MapsIndoors. To some extent, iOS CoreLocation and Android Location Services can fulfill the role of an IPS, depending on the building infrastructure. This should be tested first. You will need some basic knowledge of the LocationManager on Android and the CLLocationManager on iOS.
We have made implementations for the LocationManagers platform in demo apps shipped with the MapsIndoors SDK. See more here.
 
How do I set up a MapsIndoors application?
MapsIndoors Deployment specialists will process your building(s) and deploy the platform. For information on implementation, please review the MapsIndoors SDK Guides and Documentation. If you want to know more about the MapsIndoors app and/or the commercial aspects of MapsIndoors, please contact us. If you have other technical questions that are not answered by our existing documentation, please create a support request.
 
How do you integrate MapsIndoors SDK into our own app?
MapsIndoors is built on top of Google Maps. You can initialize a Google Map and apply MapsIndoors content on top of it with just a few lines of code. Complexity grows depending on your feature requirements. Learn more from our guides for iOS, Android, Web, or CMS: https://mapsindoors.github.io/.
 
How do I integrate the MapsIndoors CMS with my Facility Management System so I only have to change the content of my building in one place?
MapsIndoors can be integrated with any other system using the MapsIndoors REST API.
 
Can I get the mobile solution as a web solution? Which features are only available on mobile?
You can create an excellent indoor wayfinding experience using the MapsIndoors SDK for web. However, most third-party indoor positioning services are only available on native Android and iOS solutions. The ability to tilt and rotate maps is also only available on iOS and Android.
Deployment
What is the expected timeframe for a MapsIndoors deployment?
Deployment time depends on venue size and data quality. A typical deployment can vary as widely as two days to 4-6 weeks.
 
Can I view my maps on google.maps.com?
The MapsPeople solution is built on top of the Google Maps SDK, and is not a part of the public google.maps.com. Rather, it is owned by you. It is possible to get your building/venue on to the public google.maps.com site with a separate agreement or you can apply to Google independently. MapsPeople can not guarantee if and when the building will appear on google.maps.com and has no say in Google’s independent acceptance process.
 
I uploaded my CAD drawings to Google Indoor Maps, can you help me with this?
Yes, we have experience uploading our MapsIndoors maps to Google Indoor Maps.
MapsPeople, however, can not guarantee when Google will update the Google Indoor Maps platform with your new data.
 
In what format do you need my data for MapsIndoors deployment?
We support various data formats, but prefer DWG files for building drawings and CSV files for the related meta data about your rooms and other locations.
The attributes for the locations should be delivered in a spreadsheet such as this.
 
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
Security
Does Google have access to our data?
Client data belongs to our clients alone and is not shared or exchanged with third parties such as Google or other business partners.
 
Where is our data stored?
Map graphics are generated and hosted by MapsPeople. To ensure fast and easy delivery to all corners of the world, MapsPeople relies on Amazon’s Content Delivery Network (CDN). MapsIndoors data and services are hosted in and shared between a cloud provider’s regional data centers across the world. To ensure safety, scalability, and high availability, MapsPeople hosts locations and routing network data as well as services and APIs at Google and Azure. All cloud providers are ISO certified. The MapsIndoors database and management services hosted at cloud providers takes advantage of the extra measures of security granted by the service providers. All MapsIndoors services and APIs are designed, programmed, and maintained based on the requirements outlined in PCI-DSS-12.
 
What data are you collecting/monitoring from end users’ activities?
We monitor all requests to our back-end services which can include data such as:
– search words
– search filtering
– unique sessions (anonymous session ID)
– technical info (device/browser info, software versions, etc.)
 
 
Q: (2/25/20) Is landmark navigation natively supported (from iOS developer from Deloitte)?
A: Providing more detailed indoor route descriptions is on the roadmap, but this does not include support for landmarks. We’ve received feedback internally and externally that landmark navigation is a useful feature, and we’ve documented it as such so we can revisit it.
 
For right now, there is a solution/workaround, but it’s going to require some fun logic.
 
In the CMS create a location with a new category, e.g. “Indoor Landmark“. Note down the key of that category to use it in the code later…
 
Routes contain coordinates, so we need to iterate through these (MPRoute.legs.steps.start_location). With each coordinate set you can query a bounding box (MPFilter.bounds) search by extruding the coordinate. Put a limit (MPFilter.take) of e.g. 10 to the results.
 
When you have a result, you need to ensure that the found landmark/location and the route coordinate is in the same room. You can do this by filtering the results to get a list of rooms (MPLocation.baseType == .room), then filter out the landmarks (MPLocation.categories.allKeys.contains(…)).
 
To determine room containment you can use the MPGeometryHelper:
 
let polygons:[MPPolygonGeometry] = MPGeometryHelper.polygons(for: room)
for polygon in polygons {
  let isInsideRoom = polygon.contains(landmark.geometry.getCoordinate())
}

Q: (2/27/20) Can you enable/disable if a POI is searchable from the Integration API?
A: Yes, see https://mapsindoors.github.io/api/v1/#object-definition. You can set the Status bitfield.
Not active & not searchable = 0
Active & not searchable = 1
Not active & searchable = 2
Active & searchable = 3

** What Active means has not yet been determined.

Q: (3/12/2020) If an airport wants a passenger to use their mobile device's browser to navigate from home to their gate, is it possible to pop them out to Google Maps / Apple Maps / Waze for driving directions and then pop them back into the browser when they've arrived at the airport?

Short Answer: We don't believe this is possible, but we aren't 100% certain it isn't. It would be quite tricky.

Long Answer: Let's start with IF they had a mobile app. If the airport has a mobile app, there could be buttons / callouts that send the user to the driving navigation app of their choice (Google Maps / Apple Maps / etc). The airport could set up a geofence so the mobile app knows when the passenger has arrived at the airport. The geofence makes it possible to make a device-local notification that is shown to the user like any other notification. When the notification is tapped, the app is launched. Easy peasy ;-).

Side note, an app like ours can launch the Google Maps app with a special parameter that indicates whether a “back button” should be presented in the Google Maps UI. When that button is tapped in Google Maps, the originating app is launched. But that is specific to Google Maps.
Now, if they don't have a mobile app, there are two main challenges:

1) Listening for position changes while the browser is idle and another app is running.
It's possible ServiceWorkers can do the trick (https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API). But we are not sure that the Geolocation API, which is used for determining the device position, is available within a ServiceWorker.

2) Pop back to the browser / make a device-level notification that is shown to the user when arriving at the airport.
We have never heard of that being possible, but we are not 100% certain it isn’t. A workaround might be to send a notification via the Push API (https://developer.mozilla.org/en-US/docs/Web/API/Push_API) with a link to the website with the MapsIndoors map.

Google Maps
Q: (Jan 2020) We are using `REACTJS` library for MMF Web. For Google JavaScript API, we are using 3rd party npm package react-google-maps which creates the react component wrapper for the google JavaScript maps api. This library provides very simple bindings to the google maps api and lets us use it in our app as React Components.

One of the issues is we are trying to update the map markers dynamically on user interaction. Using google JavaScript API, we have methods to add or update or remove markers and the transition is smoother without re-render of the map. If we use react-google-maps, we need to pass the updated markers to the google maps react component which trigger’s the re-render of the google maps and the transition is flickery.

We are trying to understand if there are any best practices for Google Maps JavaScript API and ReactJS Library combo? Does google support any react map libraries or defines any best practices for the same?

A: Alright, there is no official support for React, so advice comes with a grain or two of salt...

To use the built-in marker functionality, you would need to redraw the map like you are currently doing. Probably the best way to handle this is to render the markers with OverlayView instead:
https://developers.google.com/maps/documentation/javascript/customoverlays
If you have a set number of markers and it's just a matter of toggling whether they are visible, then setVisible on the Marker object might be a possible solution as well:
https://developers.google.com/maps/documentation/javascript/reference/marker#Marker.setVisible

You might also consider the IconLayer of deck.gl -->