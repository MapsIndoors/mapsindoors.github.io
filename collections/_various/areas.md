---
title: Areas feature
permalink: /areas/
published: true
date: 2020-10-20
---

Areas are a type of Location, the same way a POI and a Room is. A POI is a *single-point Location*, while a Room is a *multi-point Location* (i.e. a "polygon"). Think of an Area as a *multi-point POI*, as it does not affect the routing (same as POIs), but there is a polygon (like Rooms).

Areas can be used to indicate a portion of a Floor that is not defined by walls, but is distinct in another way. It could be used to show where the Sales department is placed, where Gold-level exhibitors are located in your exhibition hall, where the social distance markers around a reception desk are etc.

## Displaying Areas in Tiles

If you have the feature enabled for your Solution, the color you choose for an Area is presented as a layer on top of the map and its tiles. Technically, you provide a color in the Display Rule for that Area, and you can do this via both the CMS and the Integration API.

If you do not have the feature enabled, please reach out to your customer success manager.

## Routing

Areas do not have any influence on the routing network for your Solution. Since Areas are not like Rooms, they do not have obstructing walls, and your app's user will get directions through the Areas.

Wayfinding to Areas is possible, as it is a *multi-point POI*, like a room. This means that the Area can be set as an Origin or Destination. Icons for these Areas will be displayed based on the Type Visibility settings in the CMS.

## Support for Areas

### Creating Areas

You can create Areas via the MapsIndoors CMS and the Integration API. You can also set the color for the Area (in the Display Rule) in both places.  

### Presenting Areas

<small style="color: #707a89;">Last updated October 20, 2020.</small>

All Area geometry data is currently sent to the applications from the SDKs, so it is possible to render Areas on the map in your custom-developed app.

The corresponding Display Rule information is sent to the app. By default the standard applications will render the Area only when the Area is clicked on. If you would like to render the Area on the map permanently, it can be set via an SDK display rule method.

For custom apps, use the SDK to render the Areas via Display Rules:

- [iOS Display Rule SDK documentation](https://app.mapsindoors.com/mapsindoors/reference/ios/v3/interface_m_p_location_display_rule.html)
- [Android Display Rule SDK documentation](https://app.mapsindoors.com/mapsindoors/reference/android/v3/com/mapsindoors/mapssdk/LocationDisplayRule.html)

### Creating Areas with the Integration API

While these Areas can be created in the CMS, creating many of the same size and color can be a manual process. For this reason, the Integration API is ideal for this use-case.

#### Request Parameters

**Endpoint**

Requests to the Integration API for creating, updating and retrieving geodata objects (Locations, which includes POIs, Rooms, and Areas) should be sent to: `https://integration.mapsindoors.com/{YOUR_API_KEY}/api/geodata`

- `Header: 'Content-Type': 'application/json' (GET, PUT, POST)`
- `Header: 'Authorization': 'bearer_token' (GET, PUT, POST)`

#### JSON Payload Schema (PUT, POST)

- `parentId`: If Area is outside, use Venue ID. If Area is indoors, use the Floor ID (of the desired Building)
- `datasetId`: SolutionId
- `baseType`: Area (other unrelated values are Venue, Building, Room, POI)
- `displayTypeId`: `locationType` internal ID
- `displaySetting`: This is a dictionary which contains the things that can be modified from the `displayRule` with the SDK
- `name`: Used for the Label on the map
- `polygon`: Has the following subfields: `visible`, `strokeWidth`, `strokeColor`, `strokeOpacity`, `fillColor`, `fillOpacity`.
- `geometry`: [standard GeoJson](https://tools.ietf.org/html/rfc7946#section-3.1)
- `anchor`: Anchor point with a _subfield type_ as `point`
- `aliases`: Aliases are used to enrich the data when searching
- `categories`: Will be written as the `internal id` of the Category (as opposed to the Name)
- `status`: Availability in search results; 1=no, 3=yes
- `baseTypeProperties`: dictionary not required for `POST`
- `properties`: `name`/`description`/`capacity` (metadata that can be edited via the CMS as well)

#### Post Request Example

```json
[{'parentId': '8b79b8d45c9542da9ef469b2',
 'datasetId': '37f096d15adb4d0981416ad3',
 'baseType': 'area',
 'displayTypeId': '6380e9cbd5414d02ab5d4fad',
 'displaySetting': {'name': 'default',
  'polygon': {'visible': True,
   'strokeWidth': 2.0,
   'strokeColor': '#1E90FF',
   'strokeOpacity': 0.8,
   'fillColor': '#1E90FF',
   'fillOpacity': 0.35}},
 'geometry': {'coordinates': [[[-97.732397, 30.380796],
    [-97.732397, 30.380806],
    [-97.732395, 30.380814],
    [-97.73239, 30.380821],
    [-97.73238, 30.380826],
    [-97.732436, 30.380851],
    [-97.732453, 30.380822],
    [-97.732397, 30.380796]]],
  'bbox': [-97.732453, 30.380796, -97.73238, 30.380851],
  'type': 'Polygon'},
 'anchor': {'coordinates': [-97.73240685714286, 30.38081942857143],
  'type': 'Point'},
 'aliases': ['testing area'],
 'categories': ['e299d010a35e43d3ba0781d7'],
 'status': 3,
 'properties': {'name@en': 'Temporary Room',
  'description@en': 'This room is used for a one-time event.',
  'capacity@en': '20',
  'name@da': 'Midlertidigt værelse'}}]
```
