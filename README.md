<p align="center">
  <h1 align="center">Netli.fyi</h1>
  <h4 align="center">React Native app for managing Netlify sites</h4>
</p>

<div align="center">
  <br/>
  <a align="center" href="https://github.com/plahteenlahti?tab=followers">
    <img src="https://img.shields.io/github/followers/plahteenlahti?label=Follow%20%40plahteenlahti&style=social" />
  </a>
  <br/>
  <a align="center" href="https://twitter.com/plahteenlahti">
    <img src="https://img.shields.io/twitter/follow/plahteenlahti?label=Follow%20%40plahteenlahti&style=social" />
  </a>
</div>
<br/>

<p align="center">
  <img src="https://user-images.githubusercontent.com/7436554/113141380-4e067c00-9232-11eb-9aa4-0a1f9bdd0323.png" />
</p>

<hr></hr>

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
yarn rnuc .env # generates configuration file based on the .env files

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
