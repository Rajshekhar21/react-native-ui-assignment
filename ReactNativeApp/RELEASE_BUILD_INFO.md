# Release Build Information

## Release APK Location
- **Path**: `ReactNativeApp/app-release.apk`
- **Size**: 62 MB
- **Built**: October 30, 2025

## Installation Path
The APK is also available at:
`android/app/build/outputs/apk/release/app-release.apk`

## Keystore Information
- **Location**: `android/app-release.keystore`
- **Type**: PKCS12
- **Alias**: `app-release`
- **Key Algorithm**: RSA 2048-bit
- **Validity**: 10,000 days (until March 17, 2053)
- **Store Password**: `decormate2024`
- **Key Password**: `decormate2024`

## Certificate Details
```
Subject: CN=Decormate, OU=Development, O=Decormate, L=Unknown, ST=Unknown, C=US
Signature Algorithm: SHA384withRSA
Valid From: Oct 30, 2025
Valid To: March 17, 2053
```

## Build Configuration
- **React Native Version**: 0.75.4
- **Package Name**: `com.decormate.app`
- **Version Code**: 1
- **Version Name**: 1.0
- **Min SDK**: 23 (Android 6.0)
- **Target SDK**: 34 (Android 14)
- **Hermes Enabled**: Yes
- **ProGuard Enabled**: No (can be enabled by setting `enableProguardInReleaseBuilds = true`)

## Environment Variables (Optional)
You can override keystore credentials using environment variables:
```bash
export RELEASE_STORE_PASSWORD="your-store-password"
export RELEASE_KEY_ALIAS="your-key-alias"
export RELEASE_KEY_PASSWORD="your-key-password"
```

## Building Release APK
To rebuild the release APK:
```bash
cd ReactNativeApp/android
./gradlew assembleRelease
```

The APK will be generated at:
`android/app/build/outputs/apk/release/app-release.apk`

## Installing on Device
```bash
# Via ADB
adb install app-release.apk

# Or transfer the APK to your device and install manually
```

## Important Notes
⚠️ **Keep the keystore file safe!** You'll need it to publish updates to the Play Store.
⚠️ **Never commit keystore passwords to git.** Consider using environment variables for production.
⚠️ This is a self-signed certificate suitable for testing and internal distribution.
⚠️ For Play Store distribution, Google Play App Signing is recommended.

