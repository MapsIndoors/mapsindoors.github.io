---
title: App User Roles
guide_title: app-user-roles
layout: guide
nav_weight: 10000
date: 2020-10-26
last_modified_at: 2020-10-26
published: true
permalink: /ios/v3/app-user-roles/
---

App user roles are roles used by the MapsIndoors SDK to determine which content to serve to the application utilizing SDK. The content types that may depend on App User Roles are:

* Locations - for example being restricted from searching and viewing private rooms as a public visitor.
* Route network - for example being restricted from navigating to private rooms as a public visitor.

## Getting App User Roles

If App User Roles are present for a dataset, they can be fetched using the Solution Provider, `MPSolutionsProvider`.

```swift
MPSolutionProvider.init().getUserRoles { (userRoles, error) in
    let janitorRole = userRoles?.first(where: { (role) -> Bool in
        return role.userRoleName == "Janitor"
    })
}
```

## Applying App User Roles

App User Roles can be applied any time on a global level by setting `MapsIndoors.userRoles`.

```swift

MapsIndoors.userRoles = [janitorRole]

```

Setting `MapsIndoors.userRoles` will force the SDK to perform a synchronisation of locations immediately and remove any cached locations that refer to roles that are not currently applied. Route Networks are not synchronised on the basis of changing App User Roles, but the Route Network updates its restrictions settings to respect the applied App User Roles.

When requesting directions, App User Roles can also be applied specifically for the current directions query.

```swift

let directionsService = MPDirectionsService.init()

let directionsQuery = MPDirectionsQuery.init(originPoint: MPPoint.init(lat: 57.0857756, lon: 9.9576971, zValue: 0), destination: MPPoint.init(lat: 57.0861556, lon: 9.958375, zValue: 0))

directionsQuery.userRoles = [janitorRole]

directionsService.routing(with: directionsQuery) { (route, error) in

}

```

Setting specific App User Roles for directions will only apply for the specific directions query and not for locations. On the other hand, if no specific App User Roles are applied for a directions query, the global App User Roles setting will apply for the request.
