# App Name and Icon Update Guide

## ✅ Completed Changes

The app name has been updated from "RnTemplate" to "Decormate" in:
- `android/app/src/main/res/values/strings.xml`
- `android/settings.gradle`

iOS already had "Decormate" configured in `Info.plist`.

## 📱 Icon Update Steps

### For Android Icons:

1. **Prepare your icon source image:**
   - Create a 1024x1024px PNG with your Decormate logo
   - Make sure it has a transparent background (if needed)
   - The logo should be centered with some padding

2. **Generate all Android icon sizes:**
   - Use online tools like:
     - https://www.appicon.co/
     - https://icon.kitchen/
     - https://www.makeappicon.com/
   - Upload your 1024x1024px source image
   - Download the Android icon set

3. **Replace the icon files:**
   - Replace files in these directories:
     ```
     android/app/src/main/res/
       ├── mipmap-mdpi/ic_launcher.png (48x48)
       ├── mipmap-mdpi/ic_launcher_round.png (48x48)
       ├── mipmap-hdpi/ic_launcher.png (72x72)
       ├── mipmap-hdpi/ic_launcher_round.png (72x72)
       ├── mipmap-xhdpi/ic_launcher.png (96x96)
       ├── mipmap-xhdpi/ic_launcher_round.png (96x96)
       ├── mipmap-xxhdpi/ic_launcher.png (144x144)
       ├── mipmap-xxhdpi/ic_launcher_round.png (144x144)
       ├── mipmap-xxxhdpi/ic_launcher.png (192x192)
       └── mipmap-xxxhdpi/ic_launcher_round.png (192x192)
     ```

### For iOS Icons:

1. **Generate iOS icon set:**
   - Use the same online tools mentioned above
   - Download the iOS icon set (it will have many sizes)

2. **Replace files in:**
   ```
   ios/ReactNativeApp/Images.xcassets/AppIcon.appiconset/
   ```
   - Replace all PNG files while keeping the `Contents.json` file unchanged
   - Critical sizes: 1024x1024px (for App Store), 180x180px, 120x120px, etc.

## 🧹 Clean and Rebuild

After updating icons, clean and rebuild:

### Android:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS:
```bash
cd ios
rm -rf build Pods Podfile.lock
pod install
cd ..
npm run ios
```

## ⚠️ Potential Breaking Changes

### What WON'T Break:
- ✅ App functionality (these are cosmetic changes)
- ✅ API calls and services
- ✅ Navigation and routing
- ✅ Firebase configuration (uses package name, not app name)
- ✅ Google Sign-In (uses bundle ID/package name)
- ✅ Existing user data

### What MIGHT Need Attention:
- 🔄 **If you have existing installed apps:** Users with "RnTemplate" installed won't see it auto-update to "Decormate" - they'll see it as a separate app. This is normal and expected.
- 🔄 **Test after icon changes:** After replacing icons, test on a real device to ensure icons display correctly
- 🔄 **App Store submissions:** When submitting to stores, make sure all icon sizes are valid PNGs

### Things Already Configured:
- ✅ APK output name is already set to "decormate.apk" in `build.gradle`
- ✅ Package name is "com.decormate.app" (won't change)
- ✅ Bundle identifier on iOS uses product name (should verify if needed)

## 📋 Verification Checklist

After updating:
- [ ] App name shows "Decormate" on Android device
- [ ] App name shows "Decormate" on iOS device
- [ ] Android launcher icon displays correctly
- [ ] iOS home screen icon displays correctly
- [ ] App runs without errors
- [ ] No linting errors
- [ ] Build completes successfully

## 🔍 Finding Your Logo

Your Decormate logo is located at:
```
ReactNativeApp/assets/images/decor-mate-logo.png
```

You can use this as the source for generating all icon sizes.

