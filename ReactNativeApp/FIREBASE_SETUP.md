# Firebase React Native Setup Guide

## Overview
The app now uses React Native Firebase SDK instead of the web SDK. This requires native configuration files to be added to your project.

## Required Configuration Files

### 1. iOS Configuration

**File:** `GoogleService-Info.plist`
**Location:** `ios/ReactNativeApp/GoogleService-Info.plist`

**Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings → General
4. Under "Your apps", select iOS app
5. Download `GoogleService-Info.plist`
6. Add it to `ios/ReactNativeApp/GoogleService-Info.plist`

**Update Info.plist:**
Add URL schemes to `ios/ReactNativeApp/Info.plist`:
```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>REVERSED_CLIENT_ID</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>YOUR_REVERSED_CLIENT_ID</string>
        </array>
    </dict>
</array>
```

### 2. Android Configuration

**File:** `google-services.json`
**Location:** `android/app/google-services.json`

**Steps:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings → General
4. Under "Your apps", select Android app
5. Download `google-services.json`
6. Add it to `android/app/google-services.json`

**Update build.gradle files:**

`android/build.gradle`:
```gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.3.15'
    }
}
```

`android/app/build.gradle`:
```gradle
apply plugin: 'com.google.gms.google-services'
```

## Environment Variables

**Required:** `FIREBASE_WEB_CLIENT_ID`
**Location:** `.env` file or environment

Get this from Firebase Console → Project Settings → General → Web apps → Web API key

## After Adding Configuration Files

1. **iOS:**
   ```bash
   cd ios
   pod install
   cd ..
   ```

2. **Android:**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

3. **Clean and rebuild:**
   ```bash
   npx react-native start --reset-cache
   ```

## Testing

The app currently shows a React Native Firebase test screen. Once the configuration files are added:

1. Run the test to verify Firebase is working
2. If successful, uncomment the AppNavigator in App.tsx
3. The full app should work with authentication

## Troubleshooting

**Common Issues:**
- "Firebase app not initialized" → Missing configuration files
- "Google Sign-In not working" → Check REVERSED_CLIENT_ID in Info.plist
- "Build errors" → Clean and rebuild after adding config files

**Verification:**
- Check that `GoogleService-Info.plist` is in `ios/ReactNativeApp/`
- Check that `google-services.json` is in `android/app/`
- Verify environment variables are set
- Run `pod install` for iOS
- Clean and rebuild the project
