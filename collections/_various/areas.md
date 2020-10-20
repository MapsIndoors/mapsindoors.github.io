---
title: Areas feature
permalink: /areas/
published: true
date: 2020-10-20
---

Areas are a type of Location, the same way a POI and a Room is. A POI is a *single-point Location*, while a Room is a *multi-point Location* (i.e. a "polygon"). Think of an Area as a *multi-point POI*, as it does not affect the routing (same as POIs), but there is a polygon (like Rooms).

Areas can be used to indicate a portion of a Floor that is not defined by walls, but is distinct in another way. It could be used to show where the Sales department is placed, where Gold-level exhibitors are located in your exhibition hall, where the social distance markers around a reception desk are etc.

## Displaying Areas in Tiles

If you have the feature enabled for your Solution, the color you choose for an Area will presented as a layer on above the map tiles. Technically, you provide a color in the Display Rule for that Area, and you can do this via both the CMS and the Integration API.

If you do not have the feature enabled, please reach out to your customer success manager.

## Routing

Areas do not have any influence on the routing network for your Solution. Since Areas are not like Rooms, they do not have obstructing walls, and your app's user will get directions through the Areas.

Wayfinding to Areas is possible, as it is a *multi-point POI*, like a room.  This means that the area location can be set as an origin or destination.  Icons for these areas will be displayed based on the type visibility settings in the CMS.

## Support for Areas

### Creating Areas

You can create Areas via the MapsIndoors CMS and the Integration API. You can also set the color in the Display Rule for the Area in both places.

### Presenting Areas

<small style="color: #707a89;">Last updated October 20, 2020.</small>

All Area geometry data is currently sent to the applications from the SDKs, so it is possible to render Areas on the map in your custom-developed app.

The corresponding Display Rule information is sent to the app.  By default the standard applications will render the area only when the Area's POI is clicked on.  If you would like to render the area on the map permanently, it should be done via an SDK display rule method.  

For custom apps, the native app SDKs can render the areas via Display Rules.

[iOS link](https://app.mapsindoors.com/mapsindoors/reference/ios/v3/interface_m_p_location_display_rule.html)
[android link](https://app.mapsindoors.com/mapsindoors/reference/android/v3/com/mapsindoors/mapssdk/LocationDisplayRule.html)