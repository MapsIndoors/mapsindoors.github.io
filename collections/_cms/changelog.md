---
title: Changelog
date: 2019-06-10
published: true
---

## June 18th 2020 - v3.28.0

### What’s new

* Improvements to the authentication module.

### Bugfix

* **Locations:** Fixes a styling issue on the bulk editing view.
* **Route Access:** Removes Route segment highlight when a Route Layer Item is selected.
* **Login:** Unauthenticated users are now redirected to the login page when attempting to access the Locations’ URL directly

## June 16th 2020 - v3.27.16

### What’s new

* **Locations:** It is required to select a Location Type in order to create a new Location. The Location Type selection field has been moved so that it comes right under the Name field, which is also required.
* **Venue:** The Venue ID can be found under the Venue menu.

### Bugfix

* **Dashboard:** Reloads data when switching Solution/Customer.
* **Location Types:** Fixes a page crash when editing a Location Type with no icon url.
* **Location Types:** Show the Locations in use for the entire Solution.

## June 10th 2020 - v3.27.11

### What’s new

* **Location Types:** Adds a column showing how many Locations are linked to a Location Type.

### Bugfix

* **Dashboard:** Reloads data when switching Solution/Customer.

## May 26th 2020 - v3.26.0

### What’s new

* **API Keys:** Adds the option to disable an API key.

## May 19th 2020 - v3.25.0

### What’s new

* **API Keys:** Previously, API keys were only available as part of the "Security module". All customers now have access to this. All Solutions get an API key (if they did not have one before), that is the same as the Solution ID (also called Dataset ID). This ensures backward compatibility.
* **Single Sign-On:** This was also part of the "Security module" and is now its own module. It needs to be activated on a per-Solution basis.
* **Security:** This module is now obsolete.

## May 13th 2020 - v3.24.2

### Bugfix

* **Auto Route:** Fixes a bug where Doors were displayed on the wrong Floor.

## May 12th 2020 - v3.24.1

### Bugfix

* **Reset Password:** Fixes a bug where an email was not sent if the email address contained special characters.

## May 6th 2020 - v3.24.0

### What’s new

* New Google Cloud client ID and API Keys

## Apr 30th 2020 - v3.23.3

### Bugfix

* **Customers:** Fixes the check for module activation.
* **Areas:** Fixes a bug where the Venue's default Floor was not found.
* **Areas:** The Areas module can be activated on a per-Customer basis.

## Apr 29th 2020 - v3.23.0

### What’s new

* **Areas:** Areas can be managed under the new Areas menu.
* **Locations' Table:** Multiple Locations can be set as "Searchable" with bulk editing.

## Apr 23rd 2020 - v3.21.0

### What’s new

* On start up, the CMS determines the fastest Manager API to call for all subsequent requests.

## Apr 21st 2020 - v3.20.0

### What’s new

* Added Deployment CMS features.

## Apr 15th 2020 - v3.19.6

### Bugfix

* **Menu:** Navigating the menu would reset the Venue to the first selected Venue.
* **Location Types:** When creating a new Location Type, the zoom-to level was not set to 22 if the Solution supported it.

## Apr 14th 2020 - v3.19.4

### Bugfix

* **Route Access:** Opening/locking an edge did not update it until a page refresh.
* CMS would not load in MS Edge browser.
* CMS login issues in Internet Explorer 11.

## Apr 1st 2020 - v3.19.1

### Bugfix

* **Locations Table:** Locations were not deselected after saving bulk changes.
* **Locations Table:** Last character on buttons wasn’t aligned correctly.

## Mar 26th 2020 - v3.19.0

### What's new

* **Locations Table:** Bulk editing and removal of Categories and Aliases.
* **Locations Table:** Validation of Alias input to ensure that no duplicate Aliases are added

### Bugfix

* **Location:** An error occurred when adding Aliases to a new Location.

## Mar 24th 2020 - v3.18.4

### Bugfix

* **Venue:** Floor names should not be editable.

## Mar 20th 2020 - v3.18.2

### Bugfix

* Fetch the app config after the user has logged in to avoid error.

## Mar 17th 2020 - v3.18.0

### What's new

* **Users:** Implement user roles guards, and improve user roles in general.

## Mar 13th 2020 - v3.17.6

### Bugfix

* **Locations:** Issue when bulk editing outdoor Locations.
* **Locations:** Issue when Location Types are undefined.

## Mar 12th 2020 - v3.17.4

### Bugfix

* **Location Types:** Issue with uploaded icons' display sizes

## Mar 10th 2020 - v3.17.0

### What's new

* Remote error logging

## Mar 4th 2020 - v3.16.0

### What’s new

* **Analytics Dashboard:** Added "Export to CSV" functionality. Added "metric cards" tooltips.  Rooms and POIs cards have been split up.

## Mar 2nd 2020 - v3.15.2

### Bugfix

* **Locations:** Close detail sidebar automatically after saving changes to a POI.
* **Location Types:** Show selected Location Type view settings.

## Feb 27th 2020 - v3.15.0

### What's New

* The Analytics Dashboard can be activated at a Customer level, which is reflected in all Solutions for that specific Customer.
* Analytics dashboard table.
* Mapsindoors icon for handicapped parking
* The Client CMS has been updated to Angular 8.
* Support for Address field on Buildings.
* Support for Custom Properties on Locations, Buildings and Venues.
* Support for setting Locations, Buildings and Venues as searchable or non-searchable
* Swiched Room IDs with External IDs.

### Bug Fixes

* Single image upload issue for a POI.
* POI creation issue.

## Feb 11th 2020 - v3.9.1

### What's New

* Support for login with OAuth for any Customer that uses this standard.

### Bug Fixes

* **User:** Users with the Editor role were set as Publisher in the backend. This is now aligned so that it is called Editor everywhere.
* **Icon Manager:** Info about file type has been added.

## Jan 28th 2020 - v3.8.3

### New

* Display the Solution’s default language first, and then all non-default languages alphabetically.

### Bug Fixes

* **Type visibility:** Sort location types alphabetically.
* **User:** Newly created user had no roles and was treated as a legacy user by the CMS.
* **Route Access:** When two edges on different floors had the same coordinates, it was only possible to create a route element on one of them.

## January 2020 - v3.8.0

### What’s New

* **CAD file upload:** Ability to create new buildings and floors and upload CAD files (.dwg, .dxf) for the floors in the CMS. You can find [a guide in the documentation](https://mapsindoors.github.io/cms/#buildings).
* **Icon Manager:** Added the option to "skip" uploading icons larger than 128x64px.
  * When deleting an icon in the Icon Manager that is in use on the map, it is also removed from the map.

### Bug Fixes

* **Icon Manager:** Shows a more descriptive error message when an image fails.
* **Locations:** Google Street View network now available inside The White House demo Solution.
* **Route Access:** Fixed issue where external doors showed up as elevator doors.

## January 2020 - v3.7.8

### Bug Fixes

* Fixed issue about the floor selector disappearing when switching from locations' list-view to map-view after the detail window has been closed.

## December 2019

### New

* **Icon manager:** Unified icon handling for Locations, Location Types and Categories.
  * No more Icons, Custom Icons and Advanced Icons. Choose from MapsIndoors Icons and Uploads.
  * Preview Location icon on map before saving Location.
  * Improved validation of SVG uploads to avoid display errors.

### Bug Fixes

* Fixed letter casing bug where location floor could be invalidated when editing location.

## November 2019 - v3.7.6

### Updates

* **New menu structure:** The menu structure is rearranged with new category titles.
* **Icon and label visibility:** Location icon and label visibility can now be controlled individually and are being reflected in the table.

## November 2019 - v3.7.5

### Bug Fixes

* **Route Access:** Fixed issue about parking spots not being shown.

## October 2019 - v3.7.4

### Bug Fixes

* **Locations:** Styling of the location icon library has been fixed.

## October 2019 - v3.7.3

### New

* **Venue:** It is possible to change the venue's default floor and sidebar is set to always be open.

### Updates

* **Location Types Templates:** This menu is accessible via the location types table because a template is created for a specific location.

### Bug Fixes

* **Locations:** Shrinking locations list when filtering.

## September 2019 - v3.7.2

### New

* **Type visibility:** Maximum zoom level can now be set per location type.

### Updates

* **Venue and buildings:** This menu has been split ip into two menus.
* **Route access:** Path locking with three states.

### Bug Fixes

* **Locations:** Clicking a room polygon opens the selected room's info window.

## August 2019 - v3.7.1

### New

* **Venue and buildings:** A building can have a default floor.
* **App configuration:** Manages app user roles, which ensure that specific user groups are not routed where they are not allowed or don’t have access to.
* **Route access:** Parking lots can be created as entrypoint for cars and bikes, which means that a car or bike will be directed to the parking lot. When locking a path, an app user role can be selected to give some users access.

## July 2019 - v.3.6.7

### New

* **Guide:** User guide for Google StreetView.
* **Change Password:** When logged in with a Google account, the change password button will not be available.

## July 2019 - v.3.6.6

### New

* **Security:** A certificate file should now be uploaded for Single Sign-On with SAML Authentication.

## May 2019 - v.3.6.0

### New

* **Locations:** If Google Street View is available for a location/POI, it can be enabled by setting a Street View image matching the POI. The image set will be shown in the web app for the user to access.

## March 2019

### New

* **App configuration:** Fill in an app ID and save. You will now be able to access a standard web app on the link provided. A button will be shown in the sidebar to quickly preview changes made in the CMS.
* **Type visibility:** Enable or disable clustering of POIs of the same type.
* **Logs:** When editing locations, under advanced, a log of changes has been added. A new log tab is available upon request. (export to .csv)
* **Security:** SAML and AAD login integration

## December 2018

### New

* **Routes:** Wait time can be added to paths.

## November 2018

### New

* **Guide and support panel**: A new panel for support, contact and release notes.
* **Logos**: Advanced markers to emphasize some locations.
* **Edit location:** User curated icon library.
* Set the active tile style if there is more than one.
* Floors can be named for each building.
* Automatically suggest translations when creating new types.

### Changed

* New coat of paint.
* Export map has been moved to tools and had a facelift.

## October 2018

### New

* **Routes**: Lock or unlock paths in the routing network.

### Changed

* Improved map interaction and styling.

---

## [3.5.0] - 20-03-2018

### Added

* Navigate between buildings or reset the venue view in export map.
* Filter locations by floor (list view).
* New Map (Google Maps JS API 3.32).

### Changed

* Moved location type to the top to better indicate its importance.
* The name of a location is now automatically set to the type. Can still be changed if needed.
* Split display settings and types in two pages.
* Improved analytics.

### Fixed

* Floor selector displays name rather than ID.
* Displaying default language name on venues instead of Adm. ID.

## [3.4.1] - 20-02-2018

### Added

### Changed

### Fixed

* Creating a new Location with Custom Properties did not work on all Solutions.

## [3.4.0] - 20-02-2018

### Added

* Select all/deselect all, Locations table.
* Graph bounds and editing.

### Changed

* Refactored locations list.
* Improved ordering of locations.
* Improved database performance greatly improving system responsiveness when loading many locations.
* Ordered types by viewdistance.

### Fixed

* In some situations custom fields on locations would not save correctly.
* Error message when trying to add an existing user.

## [3.3.1] - 19-01-2018

### Added

### Changed

### Fixed

* Deleting locations now works.

## [3.3.0] - 11-12-2017

### Added

* Venue bounds, Network visualiser.
* Edit Venue bounds.
* Remember last Venue (until changing Solution).
* Create new Venue.
* Delete Venue.
* Toggle labels for Locations map.
* Solution Types.
* Solution expiration date.

### Changed

* Moved from Angular Http to Angular HttpClient.
* Buildings moved to separate page.

### Fixed

## [3.2.0] - 29-11-2017

### Added

* Label rotation and type for export map.
* Icon size for export map.
* Master data (venue, buildings) page.
* Tooltip for type and image in edit panel for locations.

### Changed

* Tighter display settings page allowing more types to be shown at the time.

### Fixed

* Styling issues related to toolbars.

## [3.1.1] - 16-11-2017

### Added

### Changed

### Fixed

* Only use localstorage to check Solution when reloading.
* Collapsing the sidebar updates the map-size, preventing grey areas with no tiles.
* Fixed an error when trying to save a location with no name set for one or more languages.

## [3.1.0] - 14-11-2017

### Added

* Zoom level indcator.
* Modified and modified by to the location list.

### Changed

* Updated to Angular 5.
* Types has a create/edit panel.
* Types page changed to focus more on display settings.

### Fixed

* Bug where categories would not be set on locations.
* Bug where new locations with categories would not be created.
* Login issues when using the email/password form.

## [3.0.0] - 06-11-2017

### Added

* Customer and partners page.
* App configurations page.
* Network visualiser.
* Categories management. It is now possible to create, edit and delete categories.
* Entering a category name when multiple languages are present in a Solution will try to translate via Google translate API.
* Import graphs.
* Automatic user invitaions.
* Reset password.
* Solutions management.
* New filters for locations.

### Changed

* Locations are now managed on venue level.
* Menu is split into venue mangement, general settings and administration.
* Top level venue select.
* Type settings has a new layout which is easier to use and takes up less space.
* Venue and buildings became the Master data page.
* Locations is now one page with view settings for map and list.
* User management for customers now lives in a Solution limited space.
* User management reworked.
* New bulk edit.
* New export map.

### Fixed

* Remember last Solution.
* Custom fields update when changing type of a location.
* Location search now works as intended.
* Hundreds of bugs. Too many to list, the codebase is entirely new.

### Removed

* AngularJS.
* Bootstrap 3.0.
* Unused libraries.
* Complexity.
