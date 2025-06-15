<script setup>
import { ref, computed, onMounted } from "vue";
import VuetifyAudio from "../../src/vuetifyaudio.vue";

const dark = ref(false);
const audioFile = "/sample.mp3";
const minimal = ref(false);
const propsList = [
  {
    name: "file",
    type: "String",
    default: "null",
    desc: "Audio file URL (required)",
  },
  {
    name: "color",
    type: "String",
    default: "null",
    desc: "Vuetify color for controls",
  },
  {
    name: "downloadable",
    type: "Boolean",
    default: "false",
    desc: "Show download button",
  },
  {
    name: "minimal",
    type: "Boolean",
    default: "false",
    desc: "Minimal UI mode",
  },
  {
    name: "autoPlay",
    type: "Boolean",
    default: "false",
    desc: "Autoplay on load",
  },
  { name: "flat", type: "Boolean", default: "false", desc: "Flat card style" },
  {
    name: "playbackSpeed",
    type: "Boolean",
    default: "false",
    desc: "Show playback speed button (user can change speed)",
  },
  {
    name: "loopable",
    type: "Boolean",
    default: "false",
    desc: "Show repeat button and allow looping (user can toggle repeat)",
  },
  {
    name: "ended",
    type: "Function",
    default: "() => {}",
    desc: "Callback when audio ends (event handler)",
  },
  {
    name: "canPlay",
    type: "Function",
    default: "() => {}",
    desc: "Callback when audio can play (event handler)",
  },
  {
    name: "playIcon",
    type: "String",
    default: '"mdi-play"',
    desc: "Icon for play button (Material Design Icon name)",
  },
  {
    name: "pauseIcon",
    type: "String",
    default: '"mdi-pause"',
    desc: "Icon for pause button (Material Design Icon name)",
  },
  {
    name: "stopIcon",
    type: "String",
    default: '"mdi-stop"',
    desc: "Icon for stop button (Material Design Icon name)",
  },
  {
    name: "refreshIcon",
    type: "String",
    default: '"mdi-refresh"',
    desc: "Icon for refresh/reload button (Material Design Icon name)",
  },
  {
    name: "downloadIcon",
    type: "String",
    default: '"mdi-download"',
    desc: "Icon for download button (Material Design Icon name)",
  },
  {
    name: "volumeHighIcon",
    type: "String",
    default: '"mdi-volume-high"',
    desc: "Icon for volume high (Material Design Icon name)",
  },
  {
    name: "volumeMuteIcon",
    type: "String",
    default: '"mdi-volume-mute"',
    desc: "Icon for volume mute (Material Design Icon name)",
  },
  {
    name: "variant",
    type: "String",
    default: '"default"',
    desc: "Player style variant (default, modern, tonal)",
  },
];

onMounted(() => {
  // Dynamically load Prism.js and CSS for syntax highlighting
  if (!document.getElementById("prismjs")) {
    const link = document.createElement("link");
    link.id = "prismjs";
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js";
    script.onload = () => {
      window.Prism && window.Prism.highlightAll();
    };
    document.body.appendChild(script);
  } else {
    window.Prism && window.Prism.highlightAll();
  }
});

const flat = ref(false);
const downloadable = ref(true);
const autoPlay = ref(false);
const playbackSpeed = ref(false);
const loopable = ref(false);
const selectedColor = ref("primary");
const selectedVariant = ref("default");

const codeExample = computed(() => {
  // Only include props that are not at their default values
  const props = [
    'file="/sample.mp3"',
    `color=\"${selectedColor.value}\"`,
    `variant=\"${selectedVariant.value}\"`,
  ];
  if (downloadable.value !== false) props.push(':downloadable="true"');
  if (minimal.value !== false) props.push(':minimal="true"');
  if (flat.value !== false) props.push(':flat="true"');
  if (autoPlay.value !== false) props.push(':autoPlay="true"');
  if (playbackSpeed.value !== false) props.push(':playbackSpeed="true"');
  if (loopable.value !== false) props.push(':loopable="true"');
  return `<template>\n  <vuetify-audio\n    ${props.join(
    "\n    "
  )} />\n</template>`;
});

const codeBlockTheme = computed(() =>
  dark.value ? "code-block-dark" : "code-block-light"
);

// Watch for codeExample changes and re-highlight
import { watch, nextTick } from "vue";
const codeBlock = ref(null);
watch(codeExample, async () => {
  await nextTick();
  if (window.Prism && codeBlock.value) {
    window.Prism.highlightElement(codeBlock.value);
  }
});

const colorOptions = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "red",
  "blue",
  "green",
  "purple",
  "orange",
  "black",
  "white",
];
const variantOptions = ["default", "modern", "tonal"];
</script>

<template>
  <v-app :theme="dark ? 'dark' : 'light'">
    <v-main
      :class="[
        'playground-bg',
        dark ? 'playground-bg-dark' : 'playground-bg-light',
      ]"
    >
      <v-container class="py-8" style="max-width: 1200px">
        <v-row align="center" justify="center">
          <v-col cols="12" class="text-center mb-6">
            <v-avatar
              size="64"
              class="mb-2"
              style="
                background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
                box-shadow: 0 2px 12px 0 rgba(99, 102, 241, 0.12);
              "
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="20"
                  fill="#fff"
                  fill-opacity="0.10"
                />
                <g>
                  <rect
                    x="13"
                    y="15"
                    width="3"
                    height="10"
                    rx="1.5"
                    fill="#6366f1"
                  />
                  <rect
                    x="18.5"
                    y="12"
                    width="3"
                    height="16"
                    rx="1.5"
                    fill="#06b6d4"
                  />
                  <rect
                    x="24"
                    y="18"
                    width="3"
                    height="7"
                    rx="1.5"
                    fill="#6366f1"
                  />
                </g>
                <circle
                  cx="20"
                  cy="20"
                  r="12"
                  stroke="#06b6d4"
                  stroke-width="2.2"
                  fill="none"
                />
              </svg>
            </v-avatar>
            <h1
              class="display-1 font-weight-bold mb-1 logo-title"
              :class="dark ? 'text-primary' : 'text-grey-darken-4'"
            >
              Vuetify Audio Player Playground
            </h1>
            <div
              class="subtitle-1 mb-2"
              :class="dark ? 'text-grey-lighten-2' : 'text-grey-darken-2'"
            >
              A beautiful, modern audio player for Vuetify 3
            </div>
            <v-btn
              variant="tonal"
              color="primary"
              class="mx-2"
              href="https://github.com/ibrahim/vuetify3-audio-player"
              target="_blank"
              prepend-icon="mdi-github"
            >
              GitHub
            </v-btn>
            <v-btn
              variant="tonal"
              color="secondary"
              class="mx-2 dark-toggle-btn"
              @click="dark = !dark"
              prepend-icon="mdi-theme-light-dark"
            >
              <span class="toggle-label">{{
                dark ? "Light Mode" : "Dark Mode"
              }}</span>
            </v-btn>
          </v-col>
        </v-row>
        <v-row align="stretch">
          <!-- Left: Live Demo Controls -->
          <v-col cols="12" md="6" class="d-flex flex-column">
            <v-card
              elevation="10"
              class="pa-6 mb-6 demo-card d-flex flex-column"
              :class="dark ? 'demo-card-dark' : ''"
            >
              <h2 class="font-weight-bold mb-4 usage-title">
                Live Demo Controls
              </h2>
              <div class="demo-controls-card mb-4">
                <div class="d-flex align-center flex-wrap prop-switch-row">
                  <v-switch
                    v-model="minimal"
                    color="primary"
                    inset
                    hide-details
                    label="Minimal Mode"
                    class="prop-switch"
                    density="compact"
                    track-color="secondary"
                    thumb-color="primary"
                  />
                  <v-switch
                    v-model="flat"
                    color="primary"
                    inset
                    hide-details
                    label="Flat"
                    class="prop-switch"
                    density="compact"
                  />
                  <v-switch
                    v-model="downloadable"
                    color="primary"
                    inset
                    hide-details
                    label="Downloadable"
                    class="prop-switch"
                    density="compact"
                  />
                  <v-switch
                    v-model="autoPlay"
                    color="primary"
                    inset
                    hide-details
                    label="Autoplay"
                    class="prop-switch"
                    density="compact"
                  />
                  <v-switch
                    v-model="playbackSpeed"
                    color="primary"
                    inset
                    hide-details
                    label="Playback Speed"
                    class="prop-switch"
                    density="compact"
                  />
                  <v-switch
                    v-model="loopable"
                    color="primary"
                    inset
                    hide-details
                    label="Loopable (Repeat)"
                    class="prop-switch"
                    density="compact"
                  />
                </div>
                <div
                  class="d-flex align-center flex-wrap gap-4 prop-controls-row mt-2"
                >
                  <v-select
                    v-model="selectedColor"
                    :items="colorOptions"
                    label="Color"
                    density="compact"
                    hide-details
                    class="prop-select"
                    style="max-width: 120px"
                  />
                  <v-select
                    v-model="selectedVariant"
                    :items="variantOptions"
                    label="Variant"
                    density="compact"
                    hide-details
                    class="prop-select"
                    style="max-width: 120px"
                  />
                </div>
              </div>
            </v-card>
          </v-col>
          <!-- Right: Player above Usage -->
          <v-col cols="12" md="6" class="d-flex flex-column">
            <v-card
              elevation="10"
              class="pa-6 mb-4 demo-card d-flex flex-column"
              :class="dark ? 'demo-card-dark' : ''"
            >
              <!-- <h2 class="font-weight-bold mb-2 usage-title">
                VuetifyAudio Player
              </h2> -->

              <VuetifyAudio
                :file="audioFile"
                :variant="selectedVariant"
                :color="selectedColor"
                :downloadable="downloadable"
                :minimal="minimal"
                :flat="flat"
                :autoPlay="autoPlay"
                :playbackSpeed="playbackSpeed"
                :loopable="loopable"
                style="max-width: 100%"
              />
            </v-card>
            <v-card
              elevation="10"
              class="pa-6 mb-4 usage-card demo-card d-flex flex-column"
              :class="dark ? 'demo-card-dark' : ''"
            >
              <h3 class="mb-3 font-weight-bold usage-title">Usage</h3>
              <pre
                :class="['code-block', codeBlockTheme]"
                style="text-align: left; margin-bottom: 1.5em"
              >
<code class="language-html" ref="codeBlock" style="background: none; color: inherit; padding: 0; border: none; display: block; text-align: left; white-space: pre;">{{ codeExample.trim() }}</code></pre>
            </v-card>
          </v-col>
        </v-row>
        <!-- Props Card: Full width below both columns -->
        <v-row>
          <v-col cols="12">
            <v-card
              elevation="10"
              class="pa-6 mb-6 props-card demo-card d-flex flex-column"
              :class="dark ? 'demo-card-dark' : ''"
            >
              <h4 class="mb-3 font-weight-bold props-title">Props</h4>
              <div class="props-table-scroll-wrapper">
                <table class="props-table-native professional-props-table">
                  <thead>
                    <tr>
                      <th
                        style="
                          width: 160px;
                          text-align: center;
                          white-space: nowrap;
                        "
                      >
                        Prop
                      </th>
                      <th
                        style="
                          width: 110px;
                          text-align: center;
                          white-space: nowrap;
                        "
                      >
                        Type
                      </th>
                      <th
                        style="
                          width: 180px;
                          text-align: center;
                          white-space: nowrap;
                        "
                      >
                        Default
                      </th>
                      <th style="width: auto; text-align: left">Description</th>
                    </tr>
                  </thead>
                </table>
                <div class="props-table-native-body-scroll">
                  <table class="props-table-native professional-props-table">
                    <tbody>
                      <tr v-for="prop in propsList" :key="prop.name">
                        <td
                          style="
                            width: 160px;
                            text-align: center;
                            white-space: nowrap;
                          "
                        >
                          <code class="professional-prop-name">{{
                            prop.name
                          }}</code>
                        </td>
                        <td
                          style="
                            width: 110px;
                            text-align: center;
                            white-space: nowrap;
                          "
                        >
                          {{ prop.type }}
                        </td>
                        <td
                          style="
                            width: 180px;
                            text-align: center;
                            white-space: nowrap;
                          "
                        >
                          <code>{{ prop.default }}</code>
                        </td>
                        <td
                          style="
                            text-align: left;
                            white-space: normal;
                            word-break: break-word;
                          "
                        >
                          {{ prop.desc }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center mt-8">
            <v-divider class="mb-4" />
            <div
              class="footer text-caption py-2"
              :class="dark ? 'footer-dark' : 'footer-light'"
            >
              Made with <v-icon color="red" size="small">mdi-heart</v-icon> by
              <a href="https://github.com/ibrahim" target="_blank">ibrahim</a> •
              <a href="https://vuetifyjs.com/" target="_blank">Vuetify 3</a>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.playground-bg-light {
  background: linear-gradient(135deg, #f0f7ff 0%, #e0f7fa 100%);
  min-height: 100vh;
  transition: background 0.4s;
}
.playground-bg-dark {
  background: linear-gradient(135deg, #18181b 0%, #232946 100%);
  min-height: 100vh;
  transition: background 0.4s;
}
.display-1 {
  font-size: 2.7rem;
  letter-spacing: -1px;
}
.subtitle-1 {
  color: #666;
}
.demo-card {
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 4px 32px 0 rgba(99, 102, 241, 0.1);
  border: none;
  transition: background 0.3s, box-shadow 0.3s;
}
.demo-card-dark {
  background: #232526;
  box-shadow: 0 4px 32px 0 rgba(6, 182, 212, 0.1);
  border: none;
}
.usage-card,
.props-card {
  background: #fff;
  transition: background 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 12px 0 rgba(60, 60, 60, 0.06);
}
.demo-card-dark,
.usage-card-dark,
.props-card.demo-card-dark .props-table th {
  background: #232526 !important;
  color: #e3eaf7 !important;
}
.code-block {
  border-radius: 8px;
  padding: 1em 1.2em;
  font-size: 1.01em;
  overflow-x: auto;
  margin-bottom: 1.2em;
  font-family: "Fira Mono", "Menlo", "Monaco", "Consolas", monospace;
  box-shadow: 0 2px 12px 0 rgba(60, 60, 60, 0.06);
  transition: background 0.3s, color 0.3s;
  line-height: 1.6;
  word-break: break-word;
  border: 1px solid #e0e0e0;
}
.code-block-light {
  background: #f5f7fa;
  color: #23272e;
}
.code-block-dark {
  background: #181a1b;
  color: #e3eaf7;
  border: 1px solid #232526;
}
.props-table th,
.props-table td {
  padding: 8px 12px;
}
.props-table th {
  background: #f0f0f0;
  color: #333;
  font-weight: 600;
  font-size: 1em;
}
.demo-card-dark .props-table th,
.usage-card-dark .props-table th,
.props-card.demo-card-dark .props-table th {
  background: #232526 !important;
  color: #e3eaf7 !important;
}
.props-table td {
  font-size: 0.98em;
}
.footer {
  border-radius: 8px;
  margin: 0 auto;
  max-width: 400px;
  background: #f5f7fa;
  color: #333;
  transition: background 0.3s, color 0.3s;
  font-size: 1.05em;
}
.footer-dark {
  background: #232526;
  color: #e3eaf7;
}
.footer-light {
  background: #f5f7fa;
  color: #333;
}
.dark-toggle-btn {
  transition: background 0.3s, color 0.3s;
}
.toggle-label {
  transition: color 0.3s;
}
.logo-title {
  background: linear-gradient(90deg, #6366f1 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.usage-title {
  color: #6366f1;
  letter-spacing: -0.5px;
  background: linear-gradient(90deg, #6366f1 0%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.props-title {
  color: #06b6d4;
  letter-spacing: -0.5px;
  background: linear-gradient(90deg, #06b6d4 0%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.v-btn.primary,
.v-btn--variant-tonal.v-btn--color-primary {
  background: linear-gradient(90deg, #6366f1 0%, #06b6d4 100%) !important;
  color: #fff !important;
  border: none !important;
}
.v-btn.secondary,
.v-btn--variant-tonal.v-btn--color-secondary {
  background: linear-gradient(90deg, #06b6d4 0%, #6366f1 100%) !important;
  color: #fff !important;
  border: none !important;
}
.v-btn.primary .v-icon,
.v-btn.secondary .v-icon {
  color: #fff !important;
}
.v-btn--active {
  filter: brightness(0.95);
}
.v-avatar[color="primary"] {
  background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%) !important;
  color: #fff !important;
}
.minimal-switch .v-input--selection-controls__ripple {
  background: linear-gradient(90deg, #06b6d4 0%, #6366f1 100%) !important;
}
.prop-controls-row {
  gap: 18px;
  flex-wrap: wrap;
  margin-bottom: 1.5em;
}
.prop-switch {
  min-width: 150px;
  margin: 0 !important;
  display: flex !important;
  align-items: center !important;
  border-radius: 12px;
  background: rgba(99, 102, 241, 0.04);
  padding: 6px 18px 6px 10px;
  transition: background 0.2s;
}
.prop-switch .v-label {
  white-space: nowrap;
  margin-left: 10px;
  margin-bottom: 0 !important;
  font-size: 1em;
  display: inline-block !important;
}
.prop-switch-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 28px 32px; /* More horizontal and vertical gap for luxury feel */
  padding: 12px 0 10px 0; /* vertical breathing room */
  margin-bottom: 1.2em;
  justify-content: flex-start;
}
.demo-controls-card {
  background: rgba(99, 102, 241, 0.06);
  border-radius: 14px;
  padding: 18px 18px 10px 18px;
  margin-bottom: 1.7em;
  box-shadow: 0 2px 12px 0 rgba(99, 102, 241, 0.06);
  border: 1px solid rgba(99, 102, 241, 0.1);
}
.demo-card .demo-controls-card {
  margin-top: 0.2em;
}
.props-table-scroll-wrapper {
  width: 100%;
}
.props-table-native {
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
}
.props-table-native th,
.props-table-native td {
  padding: 8px 12px;
  background: inherit;
  vertical-align: middle;
}
.props-table-native th {
  background: #f0f0f0;
  color: #333;
  font-weight: 600;
  font-size: 1em;
  position: sticky;
  top: 0;
  z-index: 2;
}
.demo-card-dark .props-table-native th {
  background: #232526 !important;
  color: #e3eaf7 !important;
}
.props-table-native-body-scroll {
  max-height: 260px;
  overflow-y: auto;
  width: 100%;
}
.props-table-scrollable {
  border-collapse: separate;
  width: 100%;
  table-layout: fixed;
}
.props-table-scrollable thead {
  display: table;
  width: 100%;
  table-layout: fixed;
}
.props-table-scrollable tbody {
  display: block;
  width: 100%;
  max-height: 260px;
  overflow-y: auto;
}
.props-table-scrollable thead th {
  position: sticky;
  top: 0;
  z-index: 20;
  background: #f0f0f0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 80px;
  max-width: 160px;
}
.props-table-scrollable th[scope="col"] {
  /* Make sure all headers are single-line and don't wrap */
  white-space: nowrap;
}
.props-table-scrollable td {
  white-space: nowrap;
  text-overflow: initial;
  overflow: visible;
}
.props-table-scrollable td:first-child,
.props-table-scrollable td:nth-child(2),
.props-table-scrollable td:nth-child(3) {
  white-space: nowrap;
  text-overflow: initial;
  overflow: visible;
}
.props-table-scrollable td:nth-child(4) {
  white-space: normal;
  word-break: break-word;
  overflow-wrap: anywhere;
}
.props-table-scrollable tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}
@media (max-width: 700px) {
  .demo-controls-card {
    padding: 10px 6px 6px 6px;
  }
  .prop-controls-row {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .prop-switch,
  .prop-select {
    min-width: 0;
    width: 100%;
  }
  .prop-switch {
    padding: 8px 10px;
  }
}
@media (max-width: 900px) {
  .demo-card,
  .usage-card {
    padding: 1.5em !important;
  }
}
.professional-props-table {
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(60, 60, 60, 0.08);
  border: 1px solid #e5e7eb;
  background: #fff;
  font-family: inherit;
}
.demo-card-dark .professional-props-table {
  background: #232526;
  border: 1px solid #232946;
}
.professional-props-table th {
  background: #f4f6fa;
  color: #23272e;
  font-weight: 600;
  font-size: 1em;
  border-bottom: 2px solid #e5e7eb;
  font-family: inherit;
  position: sticky;
  top: 0;
  z-index: 2;
}
.demo-card-dark .professional-props-table th {
  background: #232946;
  color: #e3eaf7;
  border-bottom: 2px solid #232946;
}
.professional-props-table td {
  background: transparent;
  font-size: 1em;
  border-bottom: 1px solid #f0f4fa;
  transition: background 0.2s;
}
.demo-card-dark .professional-props-table td {
  border-bottom: 1px solid #232946;
}
.professional-props-table tbody tr:nth-child(even) td {
  background: #f8fafc;
}
.demo-card-dark .professional-props-table tbody tr:nth-child(even) td {
  background: #232946;
}
.professional-props-table tbody tr:hover td {
  background: #e0e7ef;
  transition: background 0.2s;
}
.demo-card-dark .professional-props-table tbody tr:hover td {
  background: #1e293b;
  color: #fff;
}
.professional-prop-name {
  color: #6366f1;
  font-weight: 600;
  font-family: inherit;
  font-size: 1em;
  background: none;
  padding: 0;
}
.demo-card-dark .professional-prop-name {
  color: #06b6d4;
}
</style>
