---
title: Introduction User Roles
parent: guides
nav_weight: 300
published: true
date: 2020-11-09
---

## Overview

In this guide you will be introduced to the concept of User Roles.

```JavaScript
mapsindoors.services.SolutionsService.getAppUserRoles().then(userRoles => {
    mapsindoors.MapsIndoors.setUserRoles(userRoles[0]);
});
```


```JavaScript
const userRole = new mapsindoors.UserRole('USER_ROLE_ID', 'USER_ROLE_NAME');
mapsindoors.MapsIndoors.setUserRoles(userRole):
```


```JavaScript
const userRole1 = new mapsindoors.UserRole('USER_ROLE_ID_1', 'USER_ROLE_NAME_1');
const userRole2 = new mapsindoors.UserRole('USER_ROLE_ID_2', 'USER_ROLE_NAME_2');
mapsindoors.MapsIndoors.setUserRoles([userRole1, userRole2]):
```

## Guides

- [Create a simple map with MapsIndoors](/guides/simple_map/)
- [Introduction to DispayRules](guides/display_rules_intro/)
- [Search and filtering](/guides/search_and_filtering/)
- [Show user location on the map (Blue dot)](/guides/show_users_position/)
