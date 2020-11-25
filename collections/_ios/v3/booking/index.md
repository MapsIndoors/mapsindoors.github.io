---
layout: guide
title: Booking
guide_title: booking
nav_weight: 330
published: true
date: 2020-11-25
permalink: /ios/v3/booking/
---

This guide covers the different aspects of _Booking_ in the MapsIndoors iOS SDK. The concept of booking in MapsIndoors implies that specific Locations in your MapsIndoors dataset is treated as Bookable resources. Typical bookable resources could be meeting rooms and workspaces. 

A MapsIndoors dataset can only have bookable resources if an integration with a booking provider exists. Current examples of booking providers are _Google Calendar_ and _Microsoft Office 365_. These providers and more can be added and integrated to your MapsIndoors project by request.

The central service in the SDK managing bookings is the Booking Service, `MPBookingService`.

```swift
let bookingService = MPBookingService.sharedInstance()
```

The Booking Service can help with the following tasks:

* [Getting a List of Bookable Locations](#bookable-locations)
* [Getting a List of Scheduled Bookings for a Location](#listing-bookings-for-a-location)
* [Performing a Booking](#performing-a-booking-of-a-location)
* [Cancelling a Booking](#cancelling-a-booking-of-a-location)

## Bookable Locations

To determine whether or not a Location is bookable can be looked up using the `MPBookingService.getBookableLocationsUsingQuery()` method. Below is an example of querying for bookable locations:

```swift
let bookingService = MPBookingService.sharedInstance()
let bookableQuery = MPBookableQuery.init()

bookableQuery.startTime = Date.init()
bookableQuery.endTime = bookableQuery.startTime.advanced(by: 60*60)

bookingService.getBookableLocations(using: bookableQuery, completion: { (locations, error) in

})
```

The above example creates a query for locations that are bookable for a timespan between now and 1 hour ahead.

It is also possible to check a location statically using `MPLocation.isBookable`, but please note that this information is not a dynamic property reflecting the current bookable state from the Booking Service. If `MPLocation.isBookable` is true it means that the Location has a potentially bookable resource known by the integrated booking provider, but still it might be booked for a specific time.

## Bookings

A Booking is a timeboxed event model referring to the resource being booked and the users participating in the booked event. 

### Listing Bookings for a Location

Before trying to book a Location for a given time, it is convenient to know in advance whether or not the Location is already booked for the given time.

It is possible to get a list of bookings using the `MPBookingService.getBookingsUsing()` method.

```swift
let bookingService = MPBookingService.sharedInstance()
let bookingsQuery = MPBookingsQuery.init()

bookingsQuery.location = myRoomLocation
bookingsQuery.startTime = Date.init().advanced(by: -60*60)
bookingsQuery.endTime = bookingsQuery.startTime?.advanced(by: 24*60*60)

bookingService.getBookingsUsing(bookingsQuery) { (bookings, error) in
    
}
```

The above example creates a query for bookings that exists for a location with timespan between 1 hour ago and 24 hours ahead.

### Performing a Booking of a Location

It is possible execute a booking creation request using the `MPBookingService.perform()` method which takes a booking object as input. If the booking is successfully performed, the booking will return in the block with an assigned `bookingId`.

```swift
let bookingService = MPBookingService.sharedInstance()
var myBooking = MPBooking.init()

myBooking.location = myRoomLocation
myBooking.title = "Meeting"
myBooking.participantIds = ["myemail@email.com"]
myBooking.startTime = Date.init()
myBooking.endTime = myBooking.startTime!.addingTimeInterval(60*60)

bookingService.perform(myBooking) { (booking, error) in
    myBooking = booking
}
```

In the above example a Booking object is created and several properties are assigned:

* The related Location object
* A Title for the Booking
* Participants for the Event being created through the Booking
* Start and end time

Depending on the Booking provider, the participants will receive invites for an event created by this Booking request.

### Cancelling a Booking of a Location

It is possible to cancel a created Booking using the `MPBookingService.cancel()` method which takes an existing booking object as input.

```swift
let bookingService = MPBookingService.sharedInstance()

bookingService.cancel(myBooking) { (booking, error) in
    
}
```
