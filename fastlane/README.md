fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

### sync_or_bump_ios_version_number

```sh
[bundle exec] fastlane sync_or_bump_ios_version_number
```

Match or bump iOS version number with Android

### sync_or_bump_android_version_number

```sh
[bundle exec] fastlane sync_or_bump_android_version_number
```

Match or bump Android version number with iOS

### set_version

```sh
[bundle exec] fastlane set_version
```

Set version Android && iOS

----


## iOS

### ios decrypt

```sh
[bundle exec] fastlane ios decrypt
```

Decrypt authkey.json for Testflight

### ios certificates

```sh
[bundle exec] fastlane ios certificates
```

Fetch certificates and provisioning profiles

### ios build_distribute_app

```sh
[bundle exec] fastlane ios build_distribute_app
```

Convenience function for building and distributing different envs of iOS app

### ios prod

```sh
[bundle exec] fastlane ios prod
```

Push a new prod build to TestFlight

### ios dev

```sh
[bundle exec] fastlane ios dev
```

Push a new dev build to TestFlight

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
