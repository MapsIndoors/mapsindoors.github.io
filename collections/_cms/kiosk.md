---
layout: tutorial
title: Setting your app up for Kiosk mode
permalink: /kiosk-mode/
published: false
nav_weight: 1300
date: 2020-02-10
---

Please do the following before getting started:

* Disable the on-screen keyboard in the operating system of the computer the kiosk will run on
* Disable the browser's position

## Create Kiosk Locations in the CMS

Log in to the CMS and create a new Location Type. Give it a name like e.g. "Kiosk".

Create all your physical kiosks as Locations in the CMS with the Location Type you just created.

## Configure the Kiosk

To enable "Kiosk mode" you need to set a few parameters in the URL. The `?` symbol have to be in front of the first parameter, and all other parameters are separated with an `&` symbol.

This is what the full URL for an app in Kiosk mode will look like:

<a href="https://clients.mapsindoors.com/demo/899cf628675f4b0695669529/search?origin=5a0d66192e33469c8909203d&timeout=20">https://clients.mapsindoors.com/<strong>demo</strong>/<strong>899cf628675f4b0695669529</strong>/<strong>search?origin=5a0d66192e33469c8909203d</strong><strong>&timeout=20</strong></a>

Deconstruction the URL, this is what it contains:

* **`demo`** is the `Alias` for your Solution (you can use an API key in the same way if an Alias is not set)
* **`899cf628675f4b0695669529`** is the `VenueID`
* **`?origin=5a0d66192e33469c8909203d`** is the Location selected as "fixed origin"
* **`&timeout=20`** is the timeout period before resetting

### `origin` aka. "Fixed origin"

The "fixed origin" is configured with the `origin` URL parameter followed by the `location id` of the Kiosk. The `location id` can be found in the CMS on the Location under the "Advanced" panel.

This is the place from which all directions will be given from.

Make sure this Locations exists in the Venue you set with the `VenueID`.

Rememember that if you move the physical Kiosk in your buildings you will have to update the position of the `POI` in the CMS as well.

### `timeout` aka. "Reset kiosk"

To make the Kiosk reset after a fixed time of inactivity, use the `timeout` URL parameter. The `timeout` value is in seconds.

## Send SMS with link to route

For the SMS feature to work, MapsPeople needs to activate it.

Moreover, MapsPeople needs to set `phoneCountryCode` in the Solution's `appConfig` like so:

```json
{
    ...
    "appSettings": {
        "phoneCountryCode": "45" // this is the country code for Denmark
    }
}
```

The "Send as SMS" button only shows when getting a route between two MapsIndoors Locations, but this will not be a problem when the browser's position is disabled, and a fixed origin is set.

The limit for sending an SMS to the same phone number is 3 messages per 10 minutes.

## Keeping "Kiosk mode" active in the browser

Once you have constructed the URL with the right parameters, paste it into the browser to see if it looks right.

At this point, do not refresh the browser. If you refresh, the browser will not use the URL parameters, and the app is out of Kiosk mode. To reactivate the Kiosk mode, you need to go to the URL with the parameters again.

Lastly, the computer the Kiosk app runs on needs to be as locked down as possible to avoid the user visiting unauthorized websites. Get in touch with your project manager at MapsPeople to go over the best practices for this.
