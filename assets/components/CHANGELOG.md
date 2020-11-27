# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.1] - 2020-08-14

### Fixed

- **mi-location-info**: details string wasn't returned when the venue and building was named the same (MIAJS-1180)
- **mi-keyboard**: eventListener was attached multiple times (MIAJS-1195)

### Added

- **mi-keyboard**: custom `inputCleared` event listener (MIAJS-1195)

## [3.0.0] - 2020-08-13

### Fixed

- **mi-location-info**: details for outdoor locations wasn't shown (MIAJS-1180)

### Changed

- **mi-keyboard**: some breaking changes was introduced for better control of when the keyboard should be visible. A layout and inputElement property is added (MIAJS-1195)
- **mi-share-sms**: necessary changes to reflect changes made in mi-keyboard component (MIAJS-1195)

## [2.4.0] - 2020-08-07

### Added

- **New**: mi-share-sms component (MIAJS-1204)

### Fixed

- **mi-map**: didn't show any locations until the map had been idle (MIAJS-1126)
- **mi-card**: had a unnecessary div tag which in some cases did cause trouble (MIAJS-1203)

### Changed

- Upgrade to MapsIndoors JS SDK version 3.11.0.

## [2.3.1] - 2020-07-29

### Fixed

- **mi-search**: fixed `mi-near` to provide correctly formatted data to the SDK

## [2.3.0]

### Added

- **mi-search**: added a componentRendered event (MIAJS-1163)

## [2.2.0]

### Added

- **mi-search**: added a idAttribute and dataAttributes attribute (MIAJS-1184)

## [2.1.2]

### Fixed

- **mi-keyboard**: added a "same element" check to handleFocusin method (MIAJS-1163)

## [2.1.1]

### Fixed

- **mi-step-switcher**: adjusted the vertical padding (MIAJS-1028)

## [2.1.0]

### Added

- **New**: mi-step-switcher component (MIAJS-1028)

## [2.0.0]

### Added

- Changelog.

### Changed

- Switched to semantic versioning.
- **mi-search**: disabled browser autocomplete (MIAJS-1161)
- **mi-search**: style changes for a larger appearance (MIAJS-1164)
- **mi-keyboard**: removed the enter key from the keyboard layouts (MIAJS-1154)
- **mi-list-item-location**: vertically centering (MIAJS-1162)

### Fixed

- **mi-location-info**: removed alike building names (MIAJS-1129)
- **mi-keyboard**: when clicking outside the keyboard to dismiss it now exposes the correct click target (MIAJS-1164)
- **mi-list**: fixed reference bug (MIAJS-1120)
