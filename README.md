# FrontEnd

## Setting up

### NodeJS

Get started with Node to use everything in the JS ecosystem, including Expo and React Native.

 [Download NodeJS](https://nodejs.org/en/download/)


### Yarn (optional)

Fast, reliable, and secure dependency management.

[Download Yarn](https://yarnpkg.com/es-ES/docs/install#mac-stable)


### Expo

A set of tools and services for building, deploying, and quickly iterating on native iOS, Android, and web apps from the same codebase. The tools provided are the Expo client app, CLI, SDK, and Snack. The services are build, update, and notify.

There are two ways to build a project with Expo: you can use the **"managed"** workflow or the **"bare"** workflow. 

With the **"managed"** workflow, you only write JavaScript and lean on the Expo SDK to give you access to your device capabilities and the Expo services to handle the heavy lifting of building your app binary and uploading it to the store, all without you touching Xcode or Android Studio. 

With the **"bare"** workflow, Expo also speeds up your development with the Expo SDK and React Native, and you have full control over your iOS and Android projects.

![project-lifecycle-workflow](https://docs.expo.io/static/images/project-lifecycle-workflows.png)


The **"managed"** workflow has been chosen, so you don't have to use Xcode or Android Studio. 
Apps are built with the managed workflow using the expo-cli and the Expo client on your mobile device.

[Expo Documentation](https://docs.expo.io/versions/latest/)


#### Installation

##### Local Development Tool: Expo CLI

```bash
npm install expo-cli --global
```

##### Mobile Client: Expo for iOS and Android

[iOS](https://itunes.com/apps/exponent)
[Android](https://play.google.com/store/apps/details?id=host.exp.exponent)


## Running

### Start the development server

```bash
cd project-path
expo start
```

#### Or for a specific platform

```bash
cd project-path
expo start --android
expo start --ios
expo start --web
```

Open Expo Client on your device. Use it to scan the QR code printed by expo start.  You may have to wait a minute while your project bundles and loads for the first time.

Also you can log in to Expo CLI with an Expo account (you can sign up by pressing s in the terminal window with the development server running, or by running expo register) and then use the same account to log in to Expo client mobile app. Once you log in, a link to your current project will automatically appear inside Expo client on your phone.


## Continuous Integration (CI)

### Test with Jest

[(Testing with Jest - Documentation)](https://docs.expo.io/versions/latest/guides/testing-with-jest/)

We will set up the CI to run the following two scripts.

```bash
npm ci
npx jest --ci
```

Travis CI

```yml
language: node_js
node_js:
  - node
  - lts/*
cache:
  directories:
    - ~/.npm
    - .jest
before_script:
  - npm install -g npm@latest
script:
  - npm ci
  - npx jest --ci
```

## Continuous Delivery (CD)

### Deploy to Expo

To interact with the Expo API, we need to install the Expo CLI:

```bash
npm install --save-dev expo-cli
```

To perform the authentication, we will add this script to our configuration:

```bash
npx expo login -u $EXPO_USERNAME -p $EXPO_PASSWORD
```
($EXPO_USERNAME and $EXPO_PASSWORD  are environment variables which are "injected" into the environment and scrubbed from the logs to keep it safe.


To create the builds, we will add this script to our configuration:
```bash
npx expo publish --non-interactive
```

Travis CI

```yml
language: node_js
node_js:
  - node
  - lts/*
cache:
  directories:
    - ~/.npm
    - .jest
before_script:
  - npm install -g npm@latest
  - echo fs.inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
  - echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
  - echo fs.inotify.max_queued_events=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
script:
  - npm ci
  - npx jest --ci
jobs:
  include:
    - stage: deploy
      node_js: lts/*
      script:
        - npm ci
        - npx expo login -u $EXPO_USERNAME -p $EXPO_PASSWORD
        - npx expo publish --non-interactive
```

[Setting up Continuous Integration and Continuous Delivery](https://docs.expo.io/versions/latest/guides/setting-up-continuous-integration/)

## Project structure


--**assets** — Fonts, icons and images.

--**components** — All shared React components. Usually these components are the ones that we call “dummy”, that have no state logic and can be easily reused across the app.

--**config** — Config files.

--**i18n** — These are the translation strings for users of different language and locale

--**modules** — There are pieces that have no corresponding view part (JSX). Typical examples of that is the colors module (contains all the app colors) and the utils module (contains utility functions that are being reused).

--**services** — These are the functions that wrap the API calls.

--**views** — Application screens. These are also React components, but they are the ones that we call containers, because they contain their own state.

[Best practices for creating React Native apps](https://medium.com/react-native-training/best-practices-for-creating-react-native-apps-part-1-66311c746df3)




