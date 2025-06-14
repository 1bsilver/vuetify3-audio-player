import App from "./App.vue";
import "./style.css";
import vuetify from "./plugins/vuetify";
import { createApp } from "vue";
import "@mdi/font/css/materialdesignicons.css";

// Import your actual component directly from the parent package
import VuetifyAudio from "../../src/vuetifyaudio.vue";

const app = createApp(App);

app.use(vuetify);
app.component("VuetifyAudio", VuetifyAudio);

app.mount("#app");
