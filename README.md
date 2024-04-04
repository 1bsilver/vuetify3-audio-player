# vuetify3-audio-player

<a href="https://www.npmjs.com/package/vuetify3-audio-player"><img src="https://img.shields.io/npm/dt/vuetify3-audio-player.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vuetify3-audio-player"><img src="https://img.shields.io/npm/v/vuetify3-audio-player.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/vuetify3-audio-player"><img src="https://img.shields.io/npm/l/vuetify3-audio-player.svg" alt="License"></a>

This is an audio player for Vue 3 based on Vuetify 3.
This project is forked from [here](https://github.com/wilsonwu/vuetify-audio) and migrated to Vue 3.

## Features

- Supports Vue 3 and Vuetify 3.
- Supports most of the audio play in this component.
- You can set the color you want for all component buttons.
- Supports downloading the audio file.
- Support Dark mode of Vuetify.
- Supports auto play, but if user didn't interact with the document first, the audio can't be played.
- Supports disabling audio download button.
- Supports disable the Vuetify Card style, and you can use this component in your own Vuetify Card of your page.
- You can set custom icons supported by vuetify v-icon component.
- Supports small size with the minimal props.

### Preview

![Example](https://lh3.googleusercontent.com/fife/ALs6j_HbodTLB1IcQJDRqbT46UeMbudR2LoA7kggoht-DSMutVo9ZycvgC-chiAEeK_iVQkuCl-UhHJlBF3fvU4hUh_KCQuSMFUwctZOgYLVfVm-kyNb91WtYZe11hvLvWq9bksSv5cmMHkSkg_5YrF3bfot9HfUj2365d9YeJt60r8L1Zt4DahVzYVqDN0GU65tRjoLHlC88bdEhuKkdKXIrcBCy6uqD6bEuZcQGq5ghepYve9q8CqwZvveF3qNtWfXHnPy1EyZT7xu5opQn7xk7D2TQD6lBIiYydYF3aqIs2Ery-SWz9lomWE7IHGZXNweLMiYi4n_NOT8ocd5IRmdfbKKWexMztZ_T97VCr02ptKF92fvUbcyE_DYDyb7SWMtahuIYs8yYGVfThUdrcZdHvrmsxb1aOqBvJg7iXqAmYyT21zph19eCR1nLqUC_Kqm6TP2ezvs8QQkcjKOhrFlqWroEHeLu8fzEs77iuxB1zrgKYFVMymZJYe5ufScm5XpgFB4s8Op3QEKrju-9crl0AGxYLo6_0TxWk78R_z54Tuq93A1pMl1_2MlONajVX8ps2Nrgo4_TD1i7IlyvpTaoe6dIJO-HNyY293dTtCdPba2bCTdzQJhMowy5NuDlQh3I9RDFpH8P2q7LBhfHwM_EHajS-THwmNEGSo3ECXLpaZVuuAWpHkfmmVr4fkLb_uaBtGvVTvks0xHEAzUEJbJuvSlB4JsBvURITM4Ug5JeAtp-P1WkVd9KWqm2Wuc2SSiUt-js6oftH2GE4H-n-kKepqLaDq0Wsw6_o3jFPqxbyczV_6zXg9NFfsmdK8T1B4gSd08LIAMG6cUm1UuKVFGFvSlkCZbMwnTOjc4CuezoV98I_cVpX2kRUYN12g6OUU-Fk7wuU32j0vuEqviAwTp8TxEUGI-bnrVyQTxvVoq9swG1fPm3imxHjrLnw3B2PdfStu5DQLVAJ5vUxzsvSvlbcQVqQXFp_Gsp0AdAnDTzghBZzENWDgC_pfckF5FlgW2IRrmSBxz25e6_Sx63nGJlmIlAmI3Zt8lQ7Pd5guvhy4qPoW09tJxwRsIFXb3Zw8DYnavZy2kuIPRHJHe9TsXH3n-VHLpXKR56nhhiQx4EwO9_lNT5A2bkTA75q3CnLEw4b0y8205YHQHuOQgt5onh7vBiC2E9n-6BSenjQZEW-vPiRU1kp1knoHdHTTvIxBIigy6U610-0eSx6CdMB__hy3q6wTZNXh60WHle5c8GTrYZP_du8DcACfM__ijeR1L2j__5fKKZhnHXZUz0dGL7FHBpciK6E-ZZEGBrMfYxlQfB1zQ6ll77rw5vmDdVtLjgYWYlQzLmmyEkOAg6NclkZCQ-W2eu1ICuiBP-gdl1y6wILH-AGZEc6gTRQJVTrhYaOZI8jxZ0TbVSgu1uedJmflPGPdEn8pAsJ6kR_Pg-CoH5oEjQsbGjG1kRM9zdBF2qzOYiSEU02ynt6kAuC5bxe43ecWgQdmcFXtydZVoAhQIDe3LBAVLBGOefjCBsmKrliWx_nChFwqE9AQ=w640-h320)

### Installation

Use npm: `npm install vuetify3-audio-player --save`

### Prepare

At first make sure your project is Vue project, and has `Vuetify` as UI framework:

1. Install Vuetify:

```
npm install vuetify --save-dev
```

2. Add Vuetify to `app.js` or `main.js`:

```js
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);
```

You also can use Vue plugin to install `Vuetify` by only one line command:

```
vue add vuetify
```

Node: Make sure you are using the default Vuetify iconfont (mdi) or override the icon attributes with some other supported by v-icon component.

### Usage

Add below code into your `<script>`:

```js
export default {
  components: {
    VuetifyAudio: () => import("vuetify3-audio-player"),
  },
  data: () => ({
    file: "http://www.hochmuth.com/mp3/Boccherini_Concerto_478-1.mp3",
  }),
};
```

OR

```js
import VuetifyAudio from "vuetify3-audio-player";
export default {
  components: {
    VuetifyAudio,
  },
  data: () => ({
    file: "http://www.hochmuth.com/mp3/Boccherini_Concerto_478-1.mp3",
  }),
};
```

And below code in the `<template>`:

```html
<vuetify-audio
  :file="file"
  color="success"
  :ended="audioFinish"
  downloadable
></vuetify-audio>
```

### Attributes

- **file** (String) (Required): Set audio file for the audio player
- **ended** (Function) (Optional): Set callback function name after audio finish
- **canPlay** (Function) (Optional): Set callback function name when audio ready for playing
- **color** (String) (Optional): Set all component buttons color
- **autoPlay** (Boolean) (Optional, default is false): Add it to make the audio auto play, but in some web browsers maybe failed, because some browsers need user active in the page first then allow sound auto play.
- **downloadable** (Boolean) (Optional, default is false): Add it to let the audio file can be downloaded.
- **minimal** (Boolean) (Optional, default is false): Sets the player to be minimal (Reduces size).
- **flat** (Boolean) (Optional, default is false): When set to true, make the Vuetify Card style to flat, that you can combine other information/image/data with this control in your page.
- **playIcon** (String) (Optional, default is mdi-play): Set the icon for play
- **pauseIcon** (String) (Optional, default is mdi-pause): Set the icon for pause
- **stopIcon** (String) (Optional, default is mdi-stop): Set the icon for stop
- **refreshIcon** (String) (Optional, default is mdi-refresh): Set the icon for refresh
- **downloadIcon** (String) (Optional, default is mdi-download): Set the icon for download
- **volumeHighIcon** (String) (Optional, default is mdi-volume-high): Set the icon for volume
- **volumeMuteIcon** (String) (Optional, default is mdi-volume-mute): Set the icon for mute

### License

MIT
