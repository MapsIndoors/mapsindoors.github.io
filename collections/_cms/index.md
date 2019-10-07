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

Data is structured in a hierarchy where the top level is your solution which can contain multiple venues, which in turn can have multiple buildings and so on. The data-types in hierarchical order:

* Solution
* Venues
* Buildings
* Floors
* Locations (rooms and points of interest)

Although a point of interest can be placed within a room, it is not required. Points of interest can also be placed “outside” on the ground level which is also the layer where the Google map exists. In this case the POI belongs to the venue directly.

## Navigating the CMS

The panel on the left lets you navigate the CMS.

There are 2 different roles in the system:

* **Editor** - Editors can create new locations, make changes to and remove existing locations
* **Admin** - Administrators have editor rights and have access to icon settings and users

## The Map

After logging in, the map will appear.

![MapsIndoors CMS](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide1.png)

There are a number of key elements:

1. **Solution Name:** This is the name of your solution
1. **Venue:** This is the name of your Venue. It’s possible to have several venues. Also, the arrow above the Venue can be clicked to hide the side panel
1. **CMS Guide:** High level guide on various areas to make changes
1. **Venue and Buildings & Routes:**
  - Change building names, enter aliases
  - Routes will display on the map, along with the entry point to indoor navigation. There is also the ability to close part of the route network
1. **General Settings:**
  - **Location types:** List of locations with their icon - ability to edit. Add location types here
  - **Categories:** List of categories - ability to edit. Add new categories here. These will populate in an iOS or Android app
  - **Location type templates:** Ability to add information to a specific location type, for example, business hours, email, phone number
1. **App settings:** 
  - **App configuration:** App title, MapsIndoors API key, list of categories - editing of the order can be done here
  - **Type visibility:** Set the zoom level of when location icon will appear. Can also “hide” icon via the eye icon
1. **Administration:**
  - **Users:** Add, edit users for the CMS
1. **Current User**
1. **List:** A list of locations in the currently selected Venue, can edit from this list
1. **Zoom In/Zoom Out**
1. **Zoom Level:** Indicates which zoom level you are viewing
1. **Filter:**
  - **Type:** dropdown to select a specific location type to only see on the map
  - **Category:** dropdown to select a specific category to only see on the map
  - **Search:** search for locations
1. **Floor selector:** The floor selector shows the floors available, click on the desired floor to switch floor
1. **POI:** click on this icon to add a POI anywhere on the map

## Locations

When Locations is selected, you see the map with all the icons that determine the location type.

To create a new POI, first make it clear if this is an outdoor POI or placed inside a Building. If inside a Building, select the desired building from the drop down menu. Click on the POI icon in the bottom right corner, then click on the map where it should be added. The placement doesn’t have to be 100% precise, it can be moved afterwards.

![New location](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide2.png)

After clicking on the box, you will be asked to select a location Type and Name. The other choices; Description, Categories, Icon are optional.

Select the icon on the map for the location that you wish to edit, or click on Locations in the main navigation and then choose “View List”. From there you can choose which location you would like to edit by clicking on the pencil icon.

In the Edit Location Form you can do the following:

**Location Type:** This can be changed by clicking on the drop down menu with location types.

**Name:** Enter a new name if you want to change the name of the location. You also have the option of adding another language.

**Description:** Provide a description of the location. 
There is an option to add more information for this location. This can be done by clicking on Location type templates in the main navigation. From there you can add specific fields to a location type, those fields will then appear in the location form.

**Categories:** Set/change what category it belongs to.

**Icon Settings:** Change the Icon associated with the location. An icon can be chosen from the library or an icon can be uploaded. Use square images in .png format, 40x40 pixels, or 20x20 - as lower screen resolutions will use this size.

**Image:** An image can be uploaded.

**Google Street View:** It can be enabled for the web app at a location by setting a Street View image matching that location.
Google Street View must be available in the building.

1. Click “Set Street View image” 
  - This will open a Google Street View window showing an image closest to this location. In the case an outside image is shown it can be because Google Street View is not available in your building - you need to check that with your organisation or examine using Google maps.
1. Navigate Street View and find an image and viewing angle that is suitable
1. Click “Set image”

## Under show advanced:

**Alias:** Add alternative search phrases, for example a restaurant might have aliases of café, dinner, food, lunch etc.  Insert a comma between each phrase.

**Venue Details:** Change building and or floor.

**Room Identifier:** This can be edited.

**Active (display and searchable):** If required, select a time period during which the location will be visible, leave empty if it should always be shown.

**Location History:** Contains a list of all changes made to a Location. Data comes from the MapsIndoors Audit Log functionality.

## Save changes

Remember to save before clicking on another location or changing the page, otherwise your changes will be lost. To save the changes,  press “Save”-button in the top of the location edit form.

![Locations](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide3.png)

To view a list of all locations in a certain venue, select ‘List View”.

* To sort the data, click on the column title
* To edit a location, click the pencil
* To edit multiple locations, tick each one
* To filter, click on the top right options: Type, Category, or Floor. You can also use the search box for a specific location

When selecting one a more locations using the checkboxes, 2 options will appear: Edit locations or Delete Locations.

**Change type:** Opens a drop down menu to choose new location type

**Location:** Allows you to change the floor of the locations

**Active (display and searchable):** If required, select a time period during which the location will be visible, leave empty if it should always be shown

Remember to save before clicking on another location or changing the page, otherwise your changes will be lost. To save the changes, click “Save”.

## Venue and buildings

![Venue](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide4.png)

**Venue:** Edit venue name, choose another language, add aliases

**Buildings:** Click on the pencil icon to the left of the building name. A new menu will appear, edit building name, choose another language, add aliases, change floor names

## Routes

![Routes](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide5.png)

The routes tab allows you to manipulate the network that powers the indoor navigation. It is useful for redirecting traffic by locking paths or isolating entire areas where navigation should be turned off entirely.

To lock a path, click on the path within the map. The path will turn yellow and a small pop up menu appears. You can choose to keep the path open or closed. Also you are able to add wait time to the path. Click Save. If you need to unlock that path, click on the area you locked and then open the path. Click Save.

## Location Types

![Location types](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide6.png)

This is a list of all the location types in the solution. From this list you can edit each location by clicking on the pencil.

## Categories

![Categories](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide7.png)

Ability to add new categories to the list. Click on New category, add name, click save. Once created, this category can be added to a specific location type. The categories can be chosen to be displayed in the app, as well as put in a specific order (this can be done under App Configuration).

## Location type templates

![Location type templates](https://app.mapsindoors.com/mapsindoors/cms/assets/images/guide8.png)

Locations inherit templates from their types. These templates allow you to set up custom data fields. Note that these templates only add the properties. To display or otherwise use a property the app needs to be customized. Standard app users will not be able to use the properties.

## App configuration

Under App categories - clicking on the arrows to the left of the category name allows you to change the order. This category order will be on the app. You can also choose an icon to be displayed next to the category name.

## Type visibility

Use these settings to control how Icons are shown on the map

**Zoom Level:** This can be edited by moving the dot on the line. The icon will appear in the chosen zoom level

**Visible:** By clicking the eye, this will remove the icon from appearing in the solution

## Users

Allows Admins, to control who has access and what roles they have, or create new users.

A list appears with all users for the solution. You can also search for an email via the search box in the upper right.

**Editing a user:** Click on the pencil to the left of the email. The user can be deleted, changed role or added to a solution. Click Save.

**New user:** Click on new user bottom at top. Enter email, choose Editor or Administrator, and assign the appropriate solution. Click Create.

## Logs

The Audit Log functionality is a configurable feature in MapsIndoors and if not enabled on your solution it can be on request.

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
- **ObjectId:** Is a unique ID that represents the given data - building, location or whatever it is. 
If you want to see a history of that specific location this ID can be used to filter by
- **ObjectData:** Is a JSON formatted representation of the actual data stored in the Mapsindoors system. To see what changed you can compare this data to the previous change.

Examples of use cases could be:

* **How to do I get Network history?** Filter the ObjectType to ‘graphdata’’ to see these entries. To find a particular user history, filter ‘User’ to their email as well.
* **How to do I get Categories history?** Filter the ObjectType to ‘category’ to see these entries. To find a particular data history, filter ‘User’ to their email as well.
* **How to do I get Location type/type template/visibility history?** Filter the ObjectType to ‘locationtype’ to see these entries. To find a particular data history, filter ‘User’ to their email as well. The type template is covered in the “LocationTypeField” section of the data. The visibility is covered in the “displayrule” section of the data
* **How to find user login activity?** When a user logs in, the corresponding user object will be changed too (the ‘last login field will be updated’). Filter the ObjectType to ‘user’ to see login entries. To find a particular user login history, filter ‘User’ to their email as well.

If you use Excel you can find a video on how to open a CSV file here: [https://www.youtube.com/watch?v=z5Pxil4jVO4](https://www.youtube.com/watch?v=z5Pxil4jVO4)

* **Icons:** Icons are used for various Locations on the map, e.g. POIs, Rooms. Having a unified representation for specific types of locations makes the system easier for users to engage with.
* **Location**: A term used for all Rooms and points of interest (POI).
* **POI**: “Point of interest” - is usually an object that isn’t tied to a room. E.g. Vending Machine, Locker, A Statue, ATM etc.
* **Type**: All locations are of a type. Types serve as templates for locations to provide a basic setup. Many of the properties can later be overridden for specific locations.
* **Venue**: Typically a collection of buildings that are close geographically.
* **Search alias**: An alternative name for a location allowing users to search for the location by that name.

## Support

**Something not working?**

If you have found a bug or encountered an issue you can not resolve, please reach out through our [support portal](https://www.mapspeople.com/support/]

## Feedback

**Do you have feedback for us?**

Send us an email at [cms-feedback@mapspeople.com](mailto:cms-feedback@mapspeople.com)
