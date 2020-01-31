---
title: Integration API v1
layout: tutorial
permalink: /api/v1/
published: true
date: 2019-11-28
---

{% include toc.md %}

## Introduction and getting started

From the MapsIndoors Integration API you can get, add, change and delete data related to your MapsIndoors solution via a REST service.

Send your requests to this endpoint: [https://integration.mapsindoors.com](https://integration.mapsindoors.com)

> Note: Only https is supported.
{: .mi-careful}

You can access data through the Integration API using a range of endpoints. The endpoints are described in the Swagger interface definition: [https://integration.mapsindoors.com/doc](https://integration.mapsindoors.com/doc)

In Swagger, each `GET` method is pre-loaded with all mandatory fields needed to get a live example of data. Click the  "_Try it out_" button in Swagger to see the example data.

### Login and credentials

First, log in to the service to get an `access token` to access the data.

This requires a POST request to our Auth API at the following endpoint: <https://auth.mapsindoors.com/connect/token>

The Auth API supports multiple ways to log in. The most common way is authenticating with Google, but you can also use your MapsIndoors username and password.
No matter what login method you choose, you will always need to use the following content-type header when talking to the Auth API:

```bash
Content-Type: application/x-www-form-urlencoded
```

#### Log in with MapsIndoors username/password

To log in with your MapsIndoors login, send them with the `grant_type` set to `password`.

Use the following key/value set:

```bash
grant_type: password
client_id: client
username: <your username>
password: <your password>
```

The body of the request must end up containing a query string like this:

`grant_type=password&client_id=client&username=<your username>&password=<your password>`

#### Log in with Google

The [Google Accounts API](https://developers.google.com/identity/protocols/OAuth2) is used to obtain a valid Google token. You can read more about how to do that here: [https://developers.google.com/identity/protocols/OAuth2](https://developers.google.com/identity/protocols/OAuth2).

When you get a valid response from the Google Authorization Server, send the token to the Auth API to authenticate you.

You tell the Auth API that you are using Google login by setting `grant_type` to `google_id_token`.

Use the following key/value set to achieve this:

```bash
grant_type: google_id_token
client_id: client
id_token: <your Google token>
```

The body of the request should end up containing a query string like this:

`grant_type=google_id_token&client_id=client&id_token=<your Google token>`

#### When you are authenticated

If you sent valid credentials to the Auth API, you will receive a response like this:

```json
{
    "access_token": "eyJhbGciOiJ...vmERrovsg",
    "expires_in": 86400,
    "token_type": "Bearer",
    "scope": "integration"
}
```

You will need the value from the key `access_token` for all your requests to the Integration API by adding the `Authorization` header like this:

```bash
authorization: Bearer eyJhbGciOiJ...vmERrovsg
```

> Note: The access token is valid for 24 hours. After that you will need to reauthenticate, following the same steps as explained above.
{: .mi-careful}

## Data description

### Dataset

The main starting point for your data is the dataset object. This object contains information about the entire data set such as languages and where to find more data.

The demo dataset looks like this:

```json
{
  "id": "550c26a864617400a40f0000",
  "name": "RTX",
  "availableLanguages": [
    "en",
    "da"
  ],
  "baseLanguage": "en",
  "rootObjects": [
    "550c286964617400a4100000"
  ]
}
```

It tells which languages are defined for this project, which language is the default one (english in this case) and it has a `rootObjects` reference list which refers to the geospatial data that makes up the bulk of a MapsIndoors solution the root objects are Geodata objects.

### Geodata

All geospasial data, Geodata, is arranged in a simple tree. Each element has a parent ID (except the root) so as an example, a point of interest (POI) can have a Room parent. The Room will typically be on a Floor in a Building on a Venue. Venues are always the root object (identified with parent ID is null), and is defined by "_An overall geographical area which typically comprises the area of one or more buildings and their relevant surrounding areas such as lawns and parking lots_".

![Geodata Structure]({{ site.url }}/assets/api/v1/geodata-structure.png)

You can create, update, delete all Geodata types: Venue, Building, Floor, Room, Area and POI.

All Geodata BaseTypes have some common keys that is available for all, and then there is some specific ones for each type, listed in BaseTypeProperties.

#### Object definition

**A Geodata object contains the following:**

* `Id [string(24)]`
  * MapsIndoors generated ID. Should be _null_ if you are creating an object.
* `DatasetId [string]`
  * The dataset ID of your MapsIndoors solution.
* `ParentId [string(24)]`
  * The MapsIndoors ID that this Geodata object is a child of.
* `BaseType [string]`
  * The BaseType this Geodata covers.

    _See more in the intro of the Geodata above._
* `BaseTypeProperties [Dictionary]`
  * Properties that directly changes the behaviour of the BaseType itself.

    _See more details below._

* `DisplayTypeId [string(24)]`
  * ID of a Display Type to follow.

    _Only relevant for POI/Room/Area._

* `DisplaySetting [DisplayRule]`
  * An overriding Display Rule to use, instead of the one from the Display Type. \

    See "DisplayRules" under Display Type.

    _Only relevant for POI/Room/Area._

* `Geometry [GeoJSON.Geometry]`
  * The geometry related to the Geodata according to the [GeoJSON](https://geojson.org/) structure in the [WGS84](https://en.wikipedia.org/wiki/World_Geodetic_System) coordinate system.
* `Anchor [GeoJSON.Point]`
  * Generally the anchor is the center of the Geometry itself.
* `Aliases [Array<string>]`
  * A list of searchable aliases that should be associated with the Geodata.
* `Categories [Array<string>]`
  * List of Only relevant for POI/Room/Area.
* `Status [bitfield]`
  * Bit 1: Active. Bit 2: Searchable.

    _See more details in the following example._

* `Properties [Dictionary<string, string>]`
  * Custom properties contains meta information related to the Geodata in a key-value structure.

    _See more details in the following examples._

* `TilesUrl [string]`
  * The URL where the tiles are located. These should be identical across Venues in the same Dataset.

    _Only relevant for Venue._

* `TileStyles [TileStyle]`
  * How the tiles should Only relevant for Venue.

#### BaseTypeProperties for Venue

* `Administrativeid [string]` - <span class="red">* required</span>
  * Unique ID for this Venue.
* `Defaultfloor [nullable int]`
  * The AdministrativeId from a Floor that should be the default selected for the Venue.
* `Imageurl [string]`
  * URL for the image that should be displayed in relation to the Venue.
* `Activestylefolder [string]`
  * The default Style that should be used in the Tiles.
* `Graphid [string(24)]`
  * The ID for the MapsIndoors Graph used to navigate in the building.

#### BaseTypeProperties for Building

* `Administrativeid [string]` - <span class="red">* required</span>
  * Unique ID for this Building.
* `Defaultfloor [nullable int]`
  * The AdministrativeId from a floor that should be the default selected for this Building).
* `Imageurl [string]`
  * URL for the image that should be displayed in relation to the Building.

#### BaseTypeProperties for Floor

* `Name [string]` - <span class="red">* required</span>
  * Floor identifier that will be used in the floor selector e.g. ‘0’, ‘42’, ‘B1’, etc.

    Keep it as short as possible. Recommendation is 1-3 characters.

* `Administrativeid [int]` - <span class="red">* required</span>
  * The index of the Floor inside of its parent Building.

#### BaseTypeProperties for a Location (POI/Room/Area)

* `Administrativeid [string]` - <span class="red">* required</span>
  * Unique ID for this Location.
* `Class [string]`
  * The MapsIndoors color class that the Location should follow.
* `Imageurl [string]`
  * URL for the image that should be displayed in relation to the Location.
* `Activefrom [Nullable Datetime]`
  * A datetime of when it should be available from. Times are defined in UTC.
* `Activeto [Nullable Datetime]`
  * A datetime of when it should be available to. Times are defined in UTC.

Venue, Building, Floor, Room and Area have a polygon that describes where its position is on the map. POIs are noted with a single point on the map and is typically located inside a Room or on a Floor - important things like the coffee machine.

To read, change or delete Geodata use the Geodata endpoints described here: [https://integration.mapsindoors.com/doc/ui/index#/Geodata](https://integration.mapsindoors.com/doc/ui/index#/Geodata)

> Note: When you get data, you only specify the `datasetId` hence you get the entire tree! The other Geodata endpoints works on individual Geodata objects.
{: .mi-careful}

## Detailed data description

### Geodata

Each Geodata element has a number of properties. Let's look at an example - a coat hanger.

#### Example: POI

```json
{
  "id": "13889288f79d4abfb7021ad7",
  "parentId": "f43b931f09314f3f9dd796f9",
  "datasetId": "550c26a864617400a40f0000",
  "baseType": "poi",
  "baseTypeProperties": {
    "class": null,
    "imageurl": null,
    "activefrom": null,
    "activeto": null,
    "administrativeid": "RTX"
  }
  "displayTypeId": "d7558711f7c64534972cc65f",
  "geometry": {
    "coordinates": [
      9.956830884329975,
      57.085763732415764
    ],
    "type": "Point"
  },
  "aliases": [],
  "categories": [],
  "status": 3,
  "properties": {
    "name@en": "Coat stand (RT)",
    "name@da": "Jakkeholder (RT)",
    "description@en": "Just a regular coat stand",
    "description@da": "En almindelig jakkeholder"
  }
}

```

* **Id**

    All elements have a unique 24 character string.

    If you are creating, this should be `null`, since it will be generated upon saving the object.

* **ParentId**

    For elements (other than the root) there is a parentId which links to the element it’s connected to.

    This will be a 24 character string, just as _Id_ is.

* **BaseType**

    Tells what kind of data it is - it can be poi, room, area, floor, building, or venue.

* **BaseTypeProperties**

    Defines a dictionary setup with properties that is bound by its BaseType.

    It is not possible to add any other keys to BaseTypeProperties, except the predefined ones.

* **DisplayTypeId**

    Is a reference to the display type as described below. All rooms and poi geodata requires this to be set. As this is an ID, the reference is a 24 character string format as described above.

* **Geometry**

    Contains the actual geodata - where it is on the map. It’s based on [GeoJSON](http://geojson.org) - in the example above the geometry is a point defining the POIs position on the map.

* **Aliases**

    Is an optional list of aliases for this data written as a list of non-translated text. This can be used e.g. if a building or room has a common nickname users could use when searching for it.

* **Categories**

    Is a reference to the category data as described below. Geodata is not required to reference any categories - like in this example. As this is an ID, the reference is a 24 character string as described above.

* **Status**

    Is a [bitfield](https://en.wikipedia.org/wiki/Bit_field).

  * bit1: active. If an element is not active, it will not be given to the apps.
  * bit2: searchable. If an element is not searchable it might be shown on the map, but not show up in searches.

    As there are two bits, the final values can be:

      0: Not active, Not searchable
      1: active, Not searchable
      2: Not active, searchable (not a very useful combo)
      3: active, searchable

* **Properties**

    Contains other data about the Geodata object such as names, description or even custom data like gate numbers, vendor id, exhibition id or other data needed.

    Name is mandatory - at least for the base language set for the dataset.

    The key format is: <keyname>@<language>

    E.g. name in english will be ‘name@en’ - in the example with a value of "Coat stand (RT)"

    As this is a dictionary setup, the keyname needs to be unique and only contain the ascii chars [a-z] and [0-9]. Use of spaces and unicode chars here is discouraged as it makes it harder to use from the application code side. The char @ is not supported in the keyname as it’s used as a seperator. As an example, if you want to store opening hours here you could use the key openinghours@en as a keyname.

> Note: BaseType ‘Floor’ doesn’t support properties.
{: .mi-careful}

#### Example: Area

Now let’s have a look at another Geodata with the BaseType _Area_.

An Area is a BaseType that is a little different compared to e.g. POI and Room:

It can be a part of a Room, Floor or Venue, but it can’t be a parent to any other Geodata objects. An Area can (unlike a Room) expand across multiple Rooms, or even Buildings.

It will look a lot like the POI example, with a few differences:

```json
{
"id": "7b2fe3da61b34cd9991ba510",
"parentId": "f43b931f09314f3f9dd796f9",
"datasetId": "550c26a864617400a40f0000",
"baseType": "area",
"displayTypeId": "41b1a5274fe8454ba2b6e6ff",
"geometry": {
  "coordinates": [
    [
      [
        9.95615091100001,
        57.085511788
      ],
      [
        9.95631731999998,
        57.085424259
      ],
      [
        9.95635468799998,
        57.085445236
      ],
      [
        9.95618828099998,
        57.085532766
      ],
      [
        9.95615091100001,
        57.085511788
      ]
    ]
  ],
  "bbox": [
    9.95615091100001,
    57.085424259,
    9.95635468799998,
    57.085532766
  ],
  "type": "Polygon"
},
"anchor": {
  "coordinates": [
    9.9562527993,
    57.0854785126
  ],
  "type": "Point"
},
"aliases": [],
"categories": [
],
"status": 3,
"baseTypeProperties": {
  "class": "area",
  "imageurl": "",
  "activefrom": null,
  "activeto": null,
  "administrativeid": "DCC843A7-C762-6D95-94AE-FDBFCEE189EC"
},
"properties": {
  "name@en": "Changing area",
  "description@en": "",
  "name@da": "Omklædnings område",
  "description@da": ""
}
}
```

* **ParentId**

    The area’s ParentId could be either a Venue, a Floor, or a Room. In this case, it is in the same parent as the Goat Hanger POI.

* **Geometry**

    Like before, the structure is based on [GeoJSON](http://geojson.org) and is in this case, a polygon, that encapsulate were the Area is placed.
    There is also a bounding box field called `bbox` as a part of the geometry. This is should define the box around the defined geometry. This is both for optimization purposes, and e.g. to easy navigate a camera to show the geometry when needed to.

* **Anchor**

    The anchor here should normally define the center of the polygon. This can be used for a variety of features, depending on the use case.

### DisplayTypes

Common setup for Geodata of different kinds (meeting room, hallway, ...)

```json
{
  "id": "bb5410b32a5240d182ba50bb",
  "name": "BreakOutArea",
  "aliases": [ "changing", "changing zone" ],
  "displayRules": [
    {
      "name": "default",
      "zoomFrom": 19,
      "zoomTo": 21,
      "iconUrl": "https://app.mapsindoors.com/mapsindoors/gfx/bella/80/BreakOutArea.png",
      "labelZoomFrom": 19,
      "labelZoomTo": 20,
      "visible": true
      "iconVisible": true,
      "labelVisible": true
    }
  ],
  "propertyTemplates": [
    {
      "text": "phone",
      "type": "text"
    }
  ],
  "properties": {
      "name@en": "Changing area",
      "description@en": "",
      "name@da": "Omklædnings område",
      "description@da": ""
   }
}
```

* **Id**

    All elements have a unique 24 character string. This is used when referencing - e.g. when referencing from individual geodata

* **Name**

    The name of a display type is a secondary ID. This can be used as an alternative to the main ID. Note that this is NOT a 24 character string.

* **Aliases**

    Aliases are a list of language neutral terms that can be used when searching for Geodata that references this DisplayType

* **DisplayRules**

    Each type has a set of display rules that tells if and how geodata should be presented. E.g. which icon to use for meeting rooms, when it should be shown based on zoom level or if it should have a label. There are two parts to a rule: An **evaluation** part (zoom from/to) and a **style** part - the rest of the displayRule object.

    Zoom from and to is inclusive. In this example an icon will be shown from zoom level 19 to 21. A quick word on zoom levels: these are described in [web mercator](https://en.wikipedia.org/wiki/Web_Mercator_projection) which is the system we use to show maps. In short zoom level 1 shows a map of the earth in its entirety and a higher zoom level lets you get closer. The highest supported zoom level is generally 21, but some solutions support up to zoom level 22.

    You will notice that there are 3 ‘visibility’ keys (visible, iconVisible, labelVisible). The first one, ‘visible’, is the main switch that will show and hide the whole element. The two others, ‘iconVisible’ and ‘labelVisible’, is changing the individual elements it is attached to. This way, you can toggle the ‘visible’ without having to remember the visible state for both the icon and label.

* **PropertyTemplates**

    The property templates is an option list of which extra properties new Geodata of the given types should have. In this case all POIs of type "breakout areas" will have a field in the CMS to enter a phone number for the new POI. This will then be stored as a property on that Geodata.

* **Properties**

    Contains language specific data about the DisplayType object such as names, description etc. Each property has a key that follows this format:

    `<keyname>@<language>`

    The name property must be specified for every language defined in the dataset.

> Note: The display type data is split in the CMS; currently it can be found in the fans "Location Types" and "Type Visibility".
{: .mi-careful}

### Categories

Categories are used to group Geodata together. As an example, rooms, areas or POIs in some department - e.g. "development" or "marketing" can be set in each of their group. Using categories is not mandatory and thus each Geodata can link to "none to many" categories.

This grouping is then used as a relevancy criteria when searching.

As a simple example: All rooms and areas across any building/venue related to entrances can be grouped using this example:

```json
{
  "id": "5823246d07215b23a02e3cdd",
  "key": "entrance",
  "name": {
    "en": "Entrance",
    "da": "Indgang"
  },
  "properties": {
    "description@en": "The entrance closest to the parking lot",
    "description@da": "Indgangen tættest på parkeringspladsen"
  }
}
```

* **Id**

    All elements has a unique 24 character string. This is used when referencing - e.g. when referencing from individual Geodata

* **Key**

    The key of a category is a secondary ID. This can be used as an alternative to the main ID. Note that this is NOT a 24 character string.

* **Name**

    A translatable name for the category.

* **Properties**

    Contains language specific data about the Category object such as numbers, description  etc. Each property has a key that follows this format:

    `<keyname>@<language>`

    The name property must be specified for every language defined in the dataset.
