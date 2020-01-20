---
layout: start
title: Getting started
permalink: /cms/
date: 2019-09-30
published: true
---

{% include toc.md %}

## Introduction

The MapsIndoors Content Management System (CMS) allows you to maintain your data within the MapsIndoors platform.

Data is structured in a hierarchy where the top level is your Solution which can contain multiple Venues, which in turn can have multiple Buildings and so on. The data-types in hierarchical order:

* Solution
* Venues
* Buildings
* Floors
* Locations (rooms and points of interest)

Although a point of interest can be placed within a room, it is not required. Points of interest can also be placed "outside” on the ground level which is also the layer where the Google map exists. In this case the POI belongs to the Venue directly.

## Navigating the CMS

The panel on the left lets you navigate the CMS.

There are 2 different roles in the system:

* **Editor** - Editors can create new Locations, make changes to and remove existing Locations
* **Admin** - Administrators have editor rights and have access to icon settings and users

## The Map

After logging in, the map will appear.

![MapsIndoors CMS](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide1.png)

There are a number of key elements:

1. **Solution Name:** This is the name of your Solution
1. **Venue:** This is the name of your Venue. It’s possible to have several Venues. Also, the arrow above the Venue can be clicked to hide the side panel
1. **CMS Guide:** High level guide on various areas to make changes
1. **Venue and Buildings & Routes:**
  - Change Building names, enter aliases
  - Routes will display on the map, along with the entry point to indoor navigation. There is also the ability to close part of the route network
1. **General Settings:**
  - **Location Types:** List of Locations with their icon - ability to edit. Add Location Types here
  - **Categories:** List of categories - ability to edit. Add new categories here. These will populate in an iOS or Android app
  - **Location Type templates:** Ability to add information to a specific Location Type, for example, business hours, email, phone number
1. **App settings:**
  - **App configuration:** App title, MapsIndoors API key, list of categories - editing of the order can be done here
  - **Type visibility:** Set the zoom level of when Location icon will appear. Can also "hide” icon via the eye icon
1. **Administration:**
  - **Users:** Add, edit users for the CMS
1. **Current User**
1. **List:** A list of Locations in the currently selected Venue, can edit from this list
1. **Zoom In/Zoom Out**
1. **Zoom Level:** Indicates which zoom level you are viewing
1. **Filter:**
  - **Type:** dropdown to select a specific Location Type to only see on the map
  - **Category:** dropdown to select a specific Category to only see on the map
  - **Search:** search for Locations
1. **Floor selector:** The floor selector shows the floors available, click on the desired floor to switch floor
1. **POI:** click on this icon to add a POI anywhere on the map

## Locations

When Locations is selected, you see the map with all the icons that determine the Location Type.

To create a new POI, first make it clear if this is an outdoor POI or placed inside a Building. If inside a Building, select the desired Building from the drop down menu. Click on the POI icon in the bottom right corner, then click on the map where it should be added. The placement doesn’t have to be 100% precise, it can be moved afterwards.

![New Location](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide2.png)

After clicking on the box, you will be asked to select a Location Type and Name. The other choices; Description, Categories, Icon are optional.

Select the icon on the map for the Location that you wish to edit, or click on Locations in the main navigation and then choose "View List”. From there you can choose which Location you would like to edit by clicking on the pencil icon.

In the Edit Location Form you can do the following:

### Location Type

This can be changed by clicking the drop down menu with Location Types.

### Name

Enter a new name for the Location. You can also add another language.

### Description

Provide a description of the Location.

There is an option to add more information for this Location. This can be done by clicking on Location Type templates in the main navigation. From there you can add specific fields to a Location Type, those fields will then appear in the Location form.

### Categories

Add or remove Categories the Location belongs to.

### Icon Settings

Change the Icon associated with the Location. See "[Managing Icons](#managing-icons)" for more information.

### Image

Take a photo of your Location and upload it here. Photos on Locations makes it easier for your users to find a location in the real world.

### Image with IndoorView

> IndoorView is only supported for web
{: .mi-careful}

To get started using the IndoorView feature for your Locations, please make sure that the _Google Street View panorama images_ are publicly available for your building by looking at [Google Maps](https://www.google.com/maps). If no imagery is available, please [contact a certified Street View Photographer](https://www.google.com/streetview/contacts-tools/).

1. Click "Set Street View image”
  - This will open a Google Street View window showing the image closest to this Location. Please note that the MapsIndoors CMS looks for panorama images within a certain radius from the Location's position, so make sure to have panorama images published in that area.
1. Navigate Street View and find an image and viewing angle that is suitable
1. Click "Set image”


**MapsIndoors support matrix**

| MapsIndoors | Support for IndoorView | Private hosted panorama images|
| - | - | - |
|CMS|Yes|No|
|Web App|Yes|No|
|Android App|No|No|
|iOS App|No|No|
|Web SDK|Yes, through Google Maps Street View API or Static Street View API|No|
|Android SDK|No|No|
|iOS SDK|No|No|

**Developing your own app**

When developing your own app, you can still use the MapsIndoors CMS to save the Google Street View image information to a Location. When the Panorama image is set, the Location gets populated with a `streetViewConfig` property. Please see below for an example.

Location Object:

```javascript
{
  "id": "586ce41ebc1f571794b9e924",
   ...
  "properties": {
    "name": "Copenhagen",
     ...
    "streetViewConfig": {
      "panoramaId": "CAoSLEFGMVFpcE41dTZnVzNpVnU1WmliRjk0T2tpMENhZ3Fya3ljVFh3TjVzN2lY",
      "povHeading": 203.1294893976259,
      "povPitch": -13.068754012666432
    }
  }
}
```

The parameters above can be used to show a static Street View image through the Street View Static API. Please see [the Street View documentation](https://developers.google.com/maps/documentation/streetview/intro) for more information.

A Street View panorama image can be initialized in a `<div>` the following way:

```javascript
function initStreetView(streetViewConfig) {
       const panorama = new google.maps.StreetViewPanorama(
            document.getElementById('panorama'),
            {
                pano: streetViewConfig.panoramaId,
                pov: {
                    heading: streetViewConfig.povHeading,
                    pitch: streetViewConfig.povPitch
                },
                zoom: 0,
                visible: true
            });
}
```

Please see the official [Google Street View Service documentation](https://developers.google.com/maps/documentation/javascript/streetview) for more information.

**Privately hosted**

As mentioned above, the IndoorView feature only supports publicly available Google Street View imagery but [in the Custom Street View documentation](https://developers.google.com/maps/documentation/javascript/streetview#CustomStreetView) you will find some well-written instructions on how to get up and running with your privately hosted panorama images and the Street View Service for the JavaScript API. At the moment, this is not supported in the Google Maps SDKs for iOS and Android.

When the photographer is done all the panorama file names should include a `panoramaId`, `zoom`, `tileX` and `tileY` property, and the panorama can be called from the server like below. Please see the [sample link](https://developers.google.com/maps/documentation/javascript/examples/streetview-custom-simple) for much more information on this.

```javascript
function getCustomPanoramaTileUrl(panoId, zoom, tileX, tileY) {
        return 'https://company/panorama/'
            + panoId + '-' + zoom + '-' + tileX + '-' + tileY + '.jpg';
}
```

### Under "Show advanced"

- **Alias:** Add alternative search phrases, for example a restaurant might have aliases of café, dinner, food, lunch etc. Insert a comma between each phrase.

- **Venue Details:** Change Building and or floor.

- **Room Identifier:** This can be edited.

- **Active (display and searchable):** If required, select a time period during which the Location will be visible, leave empty if it should always be shown.

- **Location History:** Contains a list of all changes made to a Location. Data comes from the MapsIndoors Audit Log functionality.

**Save changes**

Remember to save before clicking on another Location or changing the page, otherwise your changes will be lost. To save the changes, press "Save”-button in the top of the Location edit form.

![Locations](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide3.png)

To view a list of all Locations in a certain Venue, select ‘List View”.

* To sort the data, click on the column title
* To edit a Location, click the pencil
* To edit multiple Locations, tick each one
* To filter, click on the top right options: Type, Category, or Floor. You can also use the search box for a specific Location

When selecting one a more Locations using the checkboxes, 2 options will appear: Edit Locations or Delete Locations.

- **Change type:** Opens a drop down menu to choose new Location Type

- **Location:** Allows you to change the floor of the Locations

- **Active (display and searchable):** If required, select a time period during which the Location will be visible, leave empty if it should always be shown

Remember to save before clicking on another Location or changing the page, otherwise your changes will be lost. To save the changes, click "Save”.

## Venue

* Edit the Venue name in the available languages
* Choose a default floor

## Buildings

**Adding a building**

* Click on the "Add building" button at the top-right of the page and a popup window should appear.
* Type a building name, search for the building address by typing in the search field or panning the map.
* Place the red cross on the map at the center of the building's location.
* Click "Add" and the popup window should close.
* The building should now appear in the list.

**Editing a building**

* Click on the pencil icon to the left of the Building name. A new menu will appear 
* Edit Building name in the available languages 
* Edit floor names
* Select a default floor under "Show advanced". 

   The Building's default Floor is used to manage panning across Buildings in the apps. In order to improve the user experience in the apps, the default Floor is used when the Building panned to doesn't have the floor index of the floor selector.

**Uploading CAD files for a floor**

* Click on the pencil icon to the left of the Building name and a sidebar should appear.
* Click on "Add floor" or "Update floor" and a popup window should appear.
* Type the floor name.
* Select a CAD file.
* Select any extra files. (optional)
* Add any extra information in the text field.
* Click on "Upload" and a spinner should appear with the upload progress.
* When it is done uploading you should see an added/updated floor name in the list.

## Routes Access

![Routes](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide5.png)

The routes tab allows you to manipulate the network that powers the indoor navigation. It is useful for redirecting traffic by locking paths or isolating entire areas where navigation should be turned off entirely.

To create a parking lot:
* Click on "+ P" in the top right corner. If it is not enabled, zoom in higher than 17.
* The mouse cursor will change to a "+". Click on the map where you want to add the parking lot and a popup window will appear.
* Select a type: Car or Bike.
* Enter a name and click "Save"

To restrict access to a path:
* Click on the path and a popup window will appear.
* Choose between "Open for all", "Open for specific app user roles", "Closed for all".
* When Open for specific app user roles is chosen, a list of app user roles will appear and you can select which roles will be given access.
* Set a delay and click "Save".

## Location Types

![Location Types](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide6.png)

This is a list of all the Location Types in the Solution. From this list you can edit each Location by clicking on the pencil.

**View Settings**

The *View settings* can be set for each Location Type. Use the settings to define how and when the icon and/or label is displayed on the map, and what is shown in the label.

![View Settings]({{ site.url }}/assets/cms/location-types/view-settings.png)

**Location Type templates**

You can add custom data fields to Locations by adding templates to a Location Type defining the data fields. All Locations of a Type will inherit the templates defined for the Type. Add a template to a Location Type by clicking the template button to the right in the table.

To display or otherwise use the custom data, your app needs to be customized. The properties are not available in the Standard app, only when building one using the SDK.

## Categories

![Categories](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide7.png)

Ability to add new categories to the list. Click on New Category, add name, click save. Once created, this Category can be added to a specific Location. The categories can be chosen to be displayed in the app, as well as put in a specific order (this can be done under App Configuration).

## App configuration

**App User Roles**
* Click on "+ Add App User Roles" and a popup window will appear.
* Enter the role name in all the languages. It's mandatory.
* Click "Save" and the entered name should appear in the table.

**App Categories**

Clicking on the arrows to the left of the Category name allows you to change the order. This Category order will be reflected in the apps. You can also choose an icon to be displayed next to the category name.

## Type visibility

Use these settings to control how Icons are shown on the map

**Zoom Level:** This can be edited by moving the dot on the line. The icon will appear in the chosen zoom level

**Visible:** By clicking the eye, this will remove the icon from appearing in the Solution

## Users

Allows Admins, to control who has access and what roles they have, or create new users.

A list appears with all users for the Solution. You can also search for an email via the search box in the upper right.

**Editing a user:** Click on the pencil to the left of the email. The user can be deleted, changed role or added to a Solution. Click Save.

**New user:** Click on new user bottom at top. Enter email, choose Editor or Administrator, and assign the appropriate Solution. Click Create.

## Logs

The Audit Log functionality is a configurable feature in MapsIndoors and if not enabled on your Solution it can be on request.

The Audit Log feature can be used to access the Audit log on MapsIndoor data objects, i.e. you can find or inspect the change history.

The Log functionality is found in the Log menu point in the left menu of the MapsIndoors CMS.

![Audit log](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide9.png)

The Log can be filtered on date, ID, User and Data object types. When pressing download a comma separated file (csv) will be stored on your computer's hard drive.

The log will be in CSV format, which can be opened by a spreadsheet program eg. Excel. Each log entry represents a modification in the data. In short, each entry tells at what time who did what to which object.

The headers represented are:
Time, User, Action, ObjectType, ObjectId and ObjectData

- **Time:** Tells which user did the change (The email representing the user logged in to the system)
- **Action:** Tells what happened:
  - If data was added, the 'Action' will be set to 'Created'
  - If data was changed, the 'Action' will be set to 'Changed'
  - If data was deleted, the 'Action' will be set to 'Deleted'
- **ObjectType:** Tells what type of data was modified (eg. ‘building’, ‘location’, ‘user’, ‘graphdata’ ... )
- **ObjectId:** Is a unique ID that represents the given data - Building, Location or whatever it is.
If you want to see a history of that specific Location this ID can be used to filter by
- **ObjectData:** Is a JSON formatted representation of the actual data stored in the MapsIndoors system. To see what changed you can compare this data to the previous change.

Examples of use cases could be:

* **How to do I get Network history?** Filter the ObjectType to ‘graphdata’ to see these entries. To find a particular user history, filter ‘User’ to their email as well.
* **How to do I get Categories history?** Filter the ObjectType to ‘category’ to see these entries. To find a particular data history, filter ‘User’ to their email as well.
* **How to do I get Location Type/type template/visibility history?** Filter the ObjectType to ‘locationtype’ to see these entries. To find a particular data history, filter ‘User’ to their email as well. The type template is covered in the "LocationTypeField” section of the data. The visibility is covered in the "displayrule” section of the data
* **How to find user login activity?** When a user logs in, the corresponding user object will be changed too (the ‘last login field will be updated’). Filter the ObjectType to ‘user’ to see login entries. To find a particular user login history, filter ‘User’ to their email as well.

If you use Excel you can find a video on how to open a CSV file here: [https://www.youtube.com/watch?v=z5Pxil4jVO4](https://www.youtube.com/watch?v=z5Pxil4jVO4)

* **Icons:** Icons are used for various Locations on the map, e.g. POIs, Rooms. Having a unified representation for specific types of Locations makes the system easier for users to engage with.
* **Location**: A term used for all Rooms and points of interest (POI).
* **POI**: "Point of interest” - is usually an object that isn’t tied to a room. E.g. Vending Machine, Locker, A Statue, ATM etc.
* **Type**: All Locations are of a type. Types serve as templates for Locations to provide a basic setup. Many of the properties can later be overridden for specific Locations.
* **Venue**: Typically a collection of Buildings that are close geographically.
* **Search alias**: An alternative name for a Location allowing users to search for the Location by that name.

## Managing icons

Anywhere in the CMS you can change icons for one or more markers on the map, you use the Icon Manager to do so. Click the "Change"-button to invoke it.

In the Icon Manager, you can choose between a predefined set of MapsIndoors icons, and a list of your uploaded icons. We support uploads of image files in the PNG and SVG formats. Click on an icon in either place, and set it to close the icon manager and preview the icon on the map. Don't worry, it won't be saved until you click "Save" in the details editor.

Remember to keep your icons at a reasonable size. We'll let you know if it's larger than 128x64px, as that would take up a large amount of space on the map. There is a hard limit on the image size of 900x600px or 150kb. The images should also be optimized and compressed to be as small as possible.

You can bulk upload SVGs and PNGs at the same time.

To delete an icon, click the "trash bin" on the image files you want to delete. It is strongly advised to change icons on the Locations, Location Types or Categories before deleting their associated icon file. However, if you delete an icon that is already used by a Location, the Location will revert back to using the icon for its Location Type. If you delete an icon that is used by a Category or Location Type, it will revert to using a generic marker on the map.

### Uploading PNGs

When uploading a PNG image file, make sure you upload it in a 3x size to accommodate for it being scaled down on the map. For example, to display a 20x20px icon on the map, upload it in 60x60px.

### Uploading SVGs

SVG is a vector file format, which lets MapsIndoors convert your icon in a range of sizes to get the best looking icon in every situation.

SVGs should be uploaded with a `width` and `height` that you want the SVG to be displayed on the map in. Make sure you define it in `px`, not `cm` or `%`. E.g., if you want to display a 32x24px icon on the map, upload an SVG with the attributes `width='32px'` and `height='24px'`. For consistency, it's good form to make the `viewport` the same size as the `width` and `height`.

### Supported SVG elements

We only accept SVGs that conform to a very strict ruleset. If an uploaded SVG contains anything other than the elements and attributes listed below, it's rejected. All child elements can be nested as supported by the SVG format.

- `<svg>` element
- `viewbox` attribute
- `<path>` child element
- `<rect>` child element
- `<title>` child element
- `<desc>` child element
- `<circle>` child element
- `<defs>` child element
- `<ellipse>` child element
- `<line>` child element
- `<pattern>` child element
- `<polygon>` child element
- `<polyline>` child element
- `<text>` child element
- `<stop>` child element
- `<use>` child element
- `<linearGradient>` child element
- `<radialGradient>` child element
- `<symbol>` child element
- `<style>` child element
- `<tspan>` child element

When you try to upload an SVG containing one or more of these elements and/or attributes, the upload is cancelled and you will see which files contain the unsupported elements.

If your SVGs contain unsupported elements, you must remove them before they can be uploaded. One typical issue is embedded `base64` data in the SVG, which usually indicates the SVG will display raster image data (PNGs and the like) somewhere in it. That can lead to unintended consequences on the map.

## Support

**Something not working?**

If you have found a bug or encountered an issue you can not resolve, please reach out through our [support portal](https://www.mapspeople.com/support/).

## Feedback

**Do you have feedback for us?**

Send us an email at [cms-feedback@mapspeople.com](mailto:cms-feedback@mapspeople.com)
