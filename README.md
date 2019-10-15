# FrontEnd

## Setting up

### NodeJS

Get started with Node to use everything in the JS ecosystem, including Expo and React Native. We recommend using the latest Node version.

 [Download NodeJS](https://nodejs.org/en/download/)


### Yarn (optional)

Fast, reliable, and secure dependency management.

[Download Yarn](https://yarnpkg.com/es-ES/docs/install#mac-stable)


### Expo

A set of tools and services for building, deploying, and quickly iterating on native iOS, Android, and web apps from the same codebase. The tools we provide are the Expo client app, CLI, SDK, and Snack. The services are build, update, and notify.

There are two ways to build a project with Expo, we call these workflows: you can use the **"managed"** workflow or the **"bare"** workflow. 

With the **"managed"** workflow, you only write JavaScript and lean on the Expo SDK to give you access to your device capabilities and the Expo services to handle the heavy lifting of building your app binary and uploading it to the store, all without you touching Xcode or Android Studio. 

With the **"bare"** workflow, we also speed up your development with the Expo SDK and React Native, and you have full control over your iOS and Android projects.

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
expo start --android,
expo start --ios,
expo start --web,
```

Open Expo Client on your device. Use it to scan the QR code printed by expo start.  You may have to wait a minute while your project bundles and loads for the first time.

Also you can log in to Expo CLI with an Expo account (you can sign up by pressing s in the terminal window with the development server running, or by running expo register) and then use the same account to log in to Expo client mobile app. Once you log in, a link to your current project will automatically appear inside Expo client on your phone.



