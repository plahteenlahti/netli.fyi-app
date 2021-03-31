<p align="center">
  <h1 align="center">Netli.fyi</h1>
  <h4 align="center">React Native app for managing Netlify sites</h4>
</p>

<p align="center">
  <a href="https://apps.apple.com/app/id1547834539">Download iOS</a> • <a href="https://play.google.com/store/apps/details?id=deploy.nyxo.app">Download Android</a> 
<br><br>
</p>

- [Public beta for iOS](https://testflight.apple.com/join/cTsXZE42)
- [Public beta for Android](https://play.google.com/apps/testing/deploy.nyxo.app)


## Getting Started
You will need to register for a new Netlify OAuth2 Application ([learn more here](https://docs.netlify.com/api/get-started/#authentication)). After doing this, create a `.env` file in the root of the project with the following values:

```
redirect_url=https://url.to.something
client_secret=secret
client_id=id
```

Run the following commands to get the project running

```bash
yarn # install packages
npx pod-install # install pods for iOS
yarn rnuc # generates configuration file based on the .env files

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
