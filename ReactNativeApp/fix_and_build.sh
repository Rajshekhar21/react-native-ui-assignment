#!/bin/bash

# Fix autolinking package name issue
AUTOLINKING_FILE="/Users/rajshekhardas/Projects/react-native-ui-assignment/ReactNativeApp/android/app/build/generated/autolinking/src/main/java/com/facebook/react/ReactNativeApplicationEntryPoint.java"

# Function to fix the autolinking file
fix_autolinking() {
    if [ -f "$AUTOLINKING_FILE" ]; then
        echo "Fixing autolinking package name..."
        sed -i '' 's/com\.reactnativeapp\.BuildConfig/com.decormate.app.BuildConfig/g' "$AUTOLINKING_FILE"
        echo "Fixed autolinking package name"
    else
        echo "Autolinking file not found"
    fi
}

# Build APK with continuous monitoring
echo "Building APK with continuous autolinking fix..."
cd /Users/rajshekhardas/Projects/react-native-ui-assignment/ReactNativeApp/android

# Start the build in background and monitor the autolinking file
./gradlew assembleDebug &
BUILD_PID=$!

# Monitor and fix autolinking file every 2 seconds
while kill -0 $BUILD_PID 2>/dev/null; do
    fix_autolinking
    sleep 2
done

# Wait for build to complete
wait $BUILD_PID
BUILD_EXIT_CODE=$?

# Final fix attempt
fix_autolinking

if [ $BUILD_EXIT_CODE -ne 0 ]; then
    echo "Build failed, trying one more time with final fix..."
    fix_autolinking
    ./gradlew assembleDebug
fi
