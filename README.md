# vuetify3-audio-player

<a href="https://www.npmjs.com/package/vuetify3-audio-player"><img src="https://img.shields.io/npm/dt/vuetify3-audio-player.svg" alt="Downloads"></a>
<a href="https://www.npmjs.com/package/vuetify3-audio-player"><img src="https://img.shields.io/npm/v/vuetify3-audio-player.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/vuetify3-audio-player"><img src="https://img.shields.io/npm/l/vuetify3-audio-player.svg" alt="License"></a>

A beautiful, modern, and fully customizable audio player for Vue 3 & Vuetify 3.

---

## 🚀 Live Playground

Try all features live in the `/playground` folder or [online demo](https://github.com/1bsilver/vuetify3-audio-player#playground). All props, color options, and variants are interactive.

---

## Features

- 🎵 **Vue 3 + Vuetify 3**: Seamless integration with the latest Vue ecosystem.
- 🎨 **Modern, Responsive UI**: Looks great on all devices, supports dark mode.
- ⚡ **Live Playground**: Try all props and see live code updates in the [playground](./playground/).
- 🧩 **All Props Documented**: Every prop, event, and icon is documented and demoed.
- 🖌️ **Customizable Colors & Icons**: Choose from Vuetify theme colors and set your own icons.
- 🏷️ **Minimal & Flat Modes**: Compact/minimal UI and flat card support.
- 🔁 **Loop, Download, Playback Speed**: All the controls you expect.
- ♿ **Accessibility**: Keyboard navigation, aria-labels, and focus states.
- 🚀 **Performance Optimized**: Fast, efficient, and production-ready.
- 📦 **NPM & GitHub**: [npm](https://www.npmjs.com/package/vuetify3-audio-player) | [GitHub](https://github.com/1bsilver/vuetify3-audio-player)

---

## Installation

```sh
npm install vuetify3-audio-player --save
```

## Usage

```js
import VuetifyAudio from "vuetify3-audio-player";
export default {
  components: { VuetifyAudio },
  data: () => ({
    file: "http://www.hochmuth.com/mp3/Boccherini_Concerto_478-1.mp3",
  }),
};
```

```html
<vuetify-audio
  :file="file"
  color="primary"
  :downloadable="true"
  :minimal="false"
  :autoPlay="false"
  :flat="false"
  :playbackSpeed="false"
  :loopable="false"
  :ended="onEnded"
  :canPlay="onCanPlay"
  playIcon="mdi-play"
  pauseIcon="mdi-pause"
  stopIcon="mdi-stop"
  refreshIcon="mdi-refresh"
  downloadIcon="mdi-download"
  volumeHighIcon="mdi-volume-high"
  volumeMuteIcon="mdi-volume-mute"
  variant="default"
/>
```

---

## Props

| Prop           | Type     | Default           | Description                                                   |
| -------------- | -------- | ----------------- | ------------------------------------------------------------- |
| file           | String   | null              | Audio file URL (required)                                     |
| color          | String   | null              | Vuetify color for controls                                    |
| downloadable   | Boolean  | false             | Show download button                                          |
| minimal        | Boolean  | false             | Minimal UI mode                                               |
| autoPlay       | Boolean  | false             | Autoplay on load                                              |
| flat           | Boolean  | false             | Flat card style                                               |
| playbackSpeed  | Boolean  | false             | Show playback speed button (user can change speed)            |
| loopable       | Boolean  | false             | Show repeat button and allow looping (user can toggle repeat) |
| ended          | Function | () => {}          | Callback when audio ends (event handler)                      |
| canPlay        | Function | () => {}          | Callback when audio can play (event handler)                  |
| playIcon       | String   | "mdi-play"        | Icon for play button (Material Design Icon name)              |
| pauseIcon      | String   | "mdi-pause"       | Icon for pause button (Material Design Icon name)             |
| stopIcon       | String   | "mdi-stop"        | Icon for stop button (Material Design Icon name)              |
| refreshIcon    | String   | "mdi-refresh"     | Icon for refresh/reload button (Material Design Icon name)    |
| downloadIcon   | String   | "mdi-download"    | Icon for download button (Material Design Icon name)          |
| volumeHighIcon | String   | "mdi-volume-high" | Icon for volume high (Material Design Icon name)              |
| volumeMuteIcon | String   | "mdi-volume-mute" | Icon for volume mute (Material Design Icon name)              |
| variant        | String   | "default"         | Player style variant (default, modern, tonal)                 |

---

## License

MIT
