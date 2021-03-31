# Netli.fyi – React Native app for managing Netlify sites


<p align="center">
  <a href="https://apps.apple.com/app/id1547834539">Download iOS</a> • <a href="https://play.google.com/store/apps/details?id=deploy.nyxo.app">Download Android</a> 
<br><br>
</p>

- [Public beta for iOS](https://testflight.apple.com/join/cTsXZE42)
- [Public beta for Android](https://play.google.com/apps/testing/deploy.nyxo.app)


## Running
```bash
yarn # install packages
npx pod-install # install pods for iOS
yarn rnuc # generates configuration file

yarn ios # or 
yarn android # to run on emulator
```


## Generating boot screen

```bash
yarn react-native generate-bootsplash src/assets/images/app-icon.png \
  --background-color=fff \
  --logo-width=100 \
  --assets-path=src/assets/images
```
