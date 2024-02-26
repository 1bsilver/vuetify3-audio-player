# vuetify3-audio-player

<a href="https://www.npmjs.com/package/vuetify3-audio-player"><img src="https://img.shields.io/npm/dt/vuetify-audio.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vuetify3-audio-player"><img src="https://img.shields.io/npm/v/vuetify3-audio-player.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/vuetify3-audio-player"><img src="https://img.shields.io/npm/l/vuetify3-audio-player.svg" alt="License"></a>

This is an audio player for Vue 3 based on Vuetify 3.
This project is forked from [here](https://github.com/wilsonwu/vuetify-audio) and migrated to Vue 3.

## Features

- Supports Vue 3 and Vuetify 3.
- Support most of audio play in this component.
- You can set the color you want for all component buttons.
- Support download the audio file.
- After audio playing finished or before start the playing, you can do something.
- Support Dark mode of Vuetify.
- Support auto play, but if user didn't interact with the document first, the audio can't be played.
- Support turn on and off audio download button.
- Support disable the Vuetify Card style, and you can use this component in your own Vuetify Card of your page.
- You can set custom icons supported by vuetify v-icon component.

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
