---
title: Download and bundle offline content
guide_title: offline
layout: guide
nav_weight: 600
published: true
date: 2019-09-30
permalink: /ios/v3/offline/
---

If needed, it is possible to bundle MapsIndoors content to make your app work better in offline or poor network conditions. (Please note that while MapsIndoors content can be used offline, Google Maps does not provide offline features. Outdoor wayfinding and Google Places searches will be unavailable and the surrounding map may be unavailable unless it has been cached.)

In your app targets build phases, add a "Run Script" build phase containing the following command:

```bash
${SRCROOT}/Pods/MapsIndoors/Scripts/derive_ressources.sh --api-key=YOUR_MAPSINDOORS_API_KEY --language=en
```

Replace:

* `YOUR_MAPSINDOORS_API_KEY` with your MapsIndoors API key.
* `en` with any one of the languages that your MapsIndoors solution supports (Two letter ISO-639-1 language code). If you only have one language deployed you may remove this input parameter entirely

Depending on the overall size of your MapsIndoors deployment, this may take some time, so during development you might want to check the "Run script only when installing" option. This means that content will only be bundled when archiving for e.g. a release.
