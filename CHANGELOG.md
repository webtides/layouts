# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

<!--
   PRs should document their user-visible changes (if any) in the
   Unreleased section, uncommenting the header as necessary.
-->

<!-- ## Unreleased -->
<!-- ### Added -->
<!-- ### Changed -->
<!-- ### Removed -->
<!-- ### Fixed -->

## [0.7.0] - 2024-06-27

### Changed

-   _BREAKING_ changed package to type module

## [0.6.1] - 2020-07-07

### Added

-   github publish workflow

## [0.6.0] - 2020-03-11

### Added

-   **breaking change:** Support for PostCSS ^8.0.0. `@webtides/layouts` will no longer work with older versions of PostCSS.

## [0.5.2] - 2020-09-29

### Added

-   `rows` definition for the `grid` layout
-   `row-start` and `row-end` definitions for the `item` layout

## [0.5.1] - 2020-08-19

### Fixed

-   flex[align] options for "start" and "end"
-   flex[justify] options for "start" and "end"
-   added aliases for flex[align] options -> "start" & "flex-start" and "end" & "flex-end"
-   added aliases for flex[justify] options -> "start" & "flex-start" and "end" & "flex-end"

## [0.5.0] - 2020-08-13

### Added

-   added “full” width option to container layout
-   makes fixing container width to screen size configurable
-   makes the max-width option for the container plugin configurable

### Changed

-   makes center option editable via config for container layout

## [0.4.0] - 2020-08-12

### Added

-   `reset` attribute to container layout for resetting a previous container padding

## [0.3.0] - 2020-07-23

### Added

-   `defaults` map to config for each plugin to configure default values for viewports

## [0.2.0] - 2020-07-22

### Added

-   `plugins` map to config with a default `selector` defined for each plugin

## [0.1.0] - 2020-07-09

-   initial release
