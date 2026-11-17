# AATKit React Native Sample

Sample app showing how to integrate [AATKit](https://www.npmjs.com/package/@addapptr/react-native-aatkit) ad mediation into a React Native app on iOS and Android.

## What the sample shows

The app demonstrates a typical AATKit integration: SDK initialization, consent handling, and the main ad formats (banners, in-feed banners, fullscreen and native ads), together with ad event callbacks. Start with [`App.tsx`](App.tsx).

## Requirements

- Node.js 20 or newer
- A React Native development environment for iOS and/or Android. Follow the official [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide.
- iOS: Xcode, Ruby, and Bundler (CocoaPods is installed through the bundled `Gemfile`)

## Getting started

```bash
git clone https://github.com/AddApptr/aatkit-react-native-sample.git
cd aatkit-react-native-sample
npm ci
```

### iOS

```bash
bundle install
cd ios && bundle exec pod install && cd ..
npm run ios
```

### Android

```bash
npm run android
```

To start the Metro bundler on its own, run `npm start`.

## Test mode

The sample runs in AATKit test mode (`testModeAccountID` in [`App.tsx`](App.tsx)) and uses Google's public AdMob test app IDs (`Info.plist` and `AndroidManifest.xml`). It shows test ads only.

Before you reuse any of this code in your own app, replace these values with your own account configuration and AdMob app IDs.

## Documentation

- Integration guide: https://aatkit.gitbook.io/aatkit-react-native-integration
- npm package: [`@addapptr/react-native-aatkit`](https://www.npmjs.com/package/@addapptr/react-native-aatkit)
- Plugin release notes: https://aatkit.gitbook.io/release-notes/react-native-plugin/release-notes
