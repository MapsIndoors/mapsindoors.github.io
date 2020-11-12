---
title: CMS Dashboard
nav_weight: 1300
published: true
date: 2020-10-21
permalink: /cms-dashboard/
---

## Overview

The CMS Dashboard is an add-on feature that provides cross-Solution statistics and data. The Dashboard is a way for MapsIndoors clients with multiple Solutions to gain further insight into their location data.

Key Benefits:

* Provides a better understanding of the data across Solutions
* Allows Facilities Management to digest otherwise difficult-to-consume facilities-related data
* Provides more powerful analytics across the organization when combining the exported data with other systems
* Assists with finding discrepancies in the data across multiple Buildings, Venues and Solutions (typos, semantics etc.)

### Using The Dashboard

You must be logged into the CMS as an Administrator to use the Dashboard.

Go to the Administration section and click on the Dashboard tab.

![Using The Dashboard]({{ site.url }}/assets/various/Dashboard/UsingTheDashboard.png)

### Dashboard Info Cards

The top of the Dashboard provides high level information about your Solutions, such as how many Venues, Buildings, and Floors have been mapped. Hover over each info card for a brief description.

![Info Cards]({{ site.url }}/assets/various/Dashboard/InfoCards.png)

* **Venues** - Total number of Venues across all Solutions. A Venue is a collection of one or more Buildings.
* **Buildings** - Total number of Buildings in all Venues across all Solutions.
* **Floors** - Total number of Floors in all Buildings in all Venues across all Solutions.
* **Location Types** - Total number of Location Types across all Solutions. Location Types are used to group specific Locations together.
* **Categories** - Total number of Categories across all Solutions. Categories are used to group Locations regardless of their type.
* **POIs with Alias** - Total number of Points of Interest with one or more aliases across Solutions. Aliases are additional search terms for a POI.
* **POIs with Category** - Total number of Points of Interest with one or more Categories across all Solutions. Categories are used to group Locations.
* **Rooms with Alias** - Total number of Rooms with one or more aliases across all Solutions. Aliases are additional search terms for Rooms.
* **Rooms with Category** - Total number of Rooms with one or more Categories across all Solutions. Categories are used to group Locations.

Visit the [MapsIndoors Glossary](https://mapsindoors.github.io/glossary/) for more information on CMS-related terms.

### Dashboard Table

There are three tabs available in the Dashboard table.

* **Buildings** - This table shows the number of Locations (POIs and Rooms) with Categories and Aliases for each floor of each Building within each Solution. In the example below, we can see that the Copenhagen Office has 169 Points of Interest associated with a Category on the ground floor.

![Buildings]({{ site.url }}/assets/various/Dashboard/BuildingsTable.png)

* **Types** - This table shows the number of Locations (POIs and Rooms) associated with each Location Type by Floor, Building, and Solution. In the example below, we can see that there are three Exam Rooms on Floor B1 in the Orlando Campus Hospital.

![Types]({{ site.url }}/assets/various/Dashboard/TypesTable.png)

* **Categories** - This table shows the number of Locations (POIs and Rooms) associated with each Category by Floor, Building, and Solution. In the example below, we can see that there are 13 Meeting Rooms in the Copenhagen Office on the ground floor.

![Categories]({{ site.url }}/assets/various/Dashboard/CategoriesTable.png)

The data in these tables is automatically refreshed every 24 hours.

Filters are available on each tab. You can select all, none, or a subset of Buildings, Location Types, and Categories. The table is automatically updated to reflect your filter selections.

![Dashboard Filters]({{ site.url }}/assets/various/Dashboard/DashboardUsingFilters.gif)

The Building Address field is used to populate the Building filter. The Building Address can be set or updated in the Buildings page in the CMS.

![EditAddress]({{ site.url }}/assets/various/Dashboard/EditAddress.png)

Each table’s data can be exported to a CSV file. The CSV export adheres to the selected filters.

![ExportCSV]({{ site.url }}/assets/various/Dashboard/ExportCSV.png)
