### All Props

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
