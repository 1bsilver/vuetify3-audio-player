<template>
  <v-container fluid class="pa-0">
    <v-card
      :class="[
        variant === 'modern' ? 'vuetify-audio-modern' : '',
        variant === 'tonal'
          ? [
              'vuetify-audio-tonal',
              'border-opacity-75',
              'border-solid',
              `border-${color}`,
              $vuetify.theme.current.dark
                ? 'vuetify-audio-tonal-dark'
                : 'vuetify-audio-tonal-light',
            ]
          : '',
        'pa-4',
        'pa-sm-6',
      ]"
      :style="
        variant === 'tonal'
          ? {
              borderWidth: 'var(--v-border-width-md)',
              borderStyle: 'solid',
              borderColor: color,
              opacity: 0.75,
            }
          : undefined
      "
      :flat="
        variant === 'modern' || variant === 'tonal'
          ? true
          : flat == undefined || flat == false
          ? false
          : true
      "
    >
      <v-card-text class="pb-2 pb-sm-4 pt-3 pt-sm-5">
        <div
          v-if="!minimal"
          style="
            display: grid;
            grid-template-columns: min-content 1fr min-content;
            align-items: center;
            gap: 10px;
            width: 100%;
            min-height: 36px;
          "
        >
          <span
            class="text-caption text-grey-darken-1"
            style="text-align: right"
            >{{ currentTime }}</span
          >
          <v-progress-linear
            :color="color"
            hide-details
            v-model="percentage"
            :height="12"
            rounded
            :disabled="!loaded"
            class="mx-0"
            style="cursor: pointer; min-width: 0; width: 100%"
            @mousedown="onProgressBarDown"
            @touchstart="onProgressBarDown"
          ></v-progress-linear>
          <span
            class="text-caption text-grey-darken-1"
            style="text-align: left"
            >{{ duration }}</span
          >
        </div>
        <div
          v-else
          style="
            display: flex;
            align-items: center;
            gap: 16px;
            width: 100%;
            min-height: 44px;
            justify-content: center;
            padding: 8px 0 4px 0;
          "
        >
          <span
            class="text-caption text-grey-darken-1"
            style="min-width: 56px; text-align: right; letter-spacing: 0.5px"
            >{{ currentTime }}</span
          >
          <v-progress-linear
            :color="color"
            hide-details
            v-model="percentage"
            :height="8"
            rounded
            :disabled="!loaded"
            class="mx-0"
            style="
              cursor: pointer;
              min-width: 120px;
              width: 160px;
              max-width: 200px;
              margin: 0 4px;
            "
            @mousedown="onProgressBarDown"
            @touchstart="onProgressBarDown"
          ></v-progress-linear>
          <span
            class="text-caption text-grey-darken-1"
            style="min-width: 56px; text-align: left; letter-spacing: 0.5px"
            >{{ duration }}</span
          >
        </div>
      </v-card-text>
      <audio
        id="player"
        ref="player"
        v-on:ended="ended"
        v-on:canplay="canPlay"
        :src="file"
      ></audio>
      <v-card-actions
        class="pt-1 pb-2 pb-sm-3 px-2 px-sm-4 d-flex align-center justify-center"
        style="flex-wrap: wrap; gap: 8px; min-height: 44px"
      >
        <v-spacer v-if="minimal"></v-spacer>
        <v-btn
          variant="outlined"
          icon
          :size="minimal ? 'small' : 'default'"
          class="ma-1 polished-btn"
          :color="color"
          @click="playing ? pause() : play()"
          :disabled="!loaded"
          aria-label="Play/Pause"
          elevation="1"
        >
          <v-icon v-if="!playing || paused">{{ playIcon }}</v-icon>
          <v-icon v-else>{{ pauseIcon }}</v-icon>
        </v-btn>
        <v-btn
          v-if="!minimal"
          variant="outlined"
          :size="minimal ? 'small' : 'default'"
          icon
          class="ma-1 polished-btn"
          :color="color"
          @click="stop()"
          :disabled="!loaded"
          aria-label="Stop"
          elevation="1"
        >
          <v-icon>{{ stopIcon }}</v-icon>
        </v-btn>
        <v-btn
          v-if="loopable"
          variant="outlined"
          :size="minimal ? 'small' : 'default'"
          icon
          class="ma-1 polished-btn"
          :color="color"
          @click="switchIsOnRepeat()"
          :disabled="!loaded"
          aria-label="Repeat"
          elevation="1"
        >
          <v-icon v-if="isOnRepeat">mdi-repeat</v-icon>
          <v-icon v-else>mdi-repeat-off</v-icon>
        </v-btn>
        <v-btn
          v-if="!minimal && !loaded"
          variant="outlined"
          :size="minimal ? 'small' : 'default'"
          icon
          class="ma-1 polished-btn"
          :color="color"
          @click="download()"
          aria-label="Reload"
          elevation="1"
        >
          <v-icon>{{ refreshIcon }}</v-icon>
        </v-btn>
        <v-btn
          v-if="!minimal && loaded && downloadable"
          variant="outlined"
          :size="minimal ? 'small' : 'default'"
          icon
          class="ma-1 polished-btn"
          :color="color"
          @click="download()"
          aria-label="Download"
          elevation="1"
        >
          <v-icon>{{ downloadIcon }}</v-icon>
        </v-btn>
        <v-btn
          v-if="minimal && loaded && downloadable"
          variant="outlined"
          :size="'small'"
          icon
          class="ma-1 polished-btn"
          :color="color"
          @click="download()"
          aria-label="Download"
          elevation="1"
        >
          <v-icon>{{ downloadIcon }}</v-icon>
        </v-btn>
        <v-btn
          v-if="minimal"
          variant="outlined"
          :size="'small'"
          icon
          class="ma-1 polished-btn"
          :color="color"
          @click="mute()"
          :disabled="!loaded"
          aria-label="Mute"
          elevation="1"
        >
          <v-icon>{{ isMuted ? volumeMuteIcon : volumeHighIcon }}</v-icon>
        </v-btn>
        <v-btn
          v-if="playbackSpeed && loaded"
          variant="outlined"
          :size="minimal ? 'small' : 'default'"
          icon
          class="ma-1 polished-btn"
          :color="color"
          @click="cycleSpeed()"
          aria-label="Playback Speed"
          elevation="1"
        >
          <v-badge
            :content="speedLabel"
            color="primary"
            overlap
            offset-x="-8"
            offset-y="-8"
            bordered
            style="pointer-events: none"
          >
            <v-icon>mdi-speedometer</v-icon>
          </v-badge>
        </v-btn>
        <v-spacer></v-spacer>
        <v-row
          v-if="!minimal"
          align="center"
          no-gutters
          style="max-width: 110px; margin: 0 auto"
          class="mt-1"
        >
          <v-col cols="auto" class="pa-0">
            <v-btn
              icon
              variant="text"
              :color="isMuted ? 'grey' : color"
              size="x-small"
              @click="mute()"
              :aria-label="isMuted ? 'Unmute' : 'Mute'"
              style="min-width: 26px"
            >
              <v-icon size="16">{{
                isMuted ? volumeMuteIcon : volumeHighIcon
              }}</v-icon>
            </v-btn>
          </v-col>
          <v-col class="pa-0" style="flex: 1; min-width: 38px; max-width: 70px">
            <v-slider
              v-model="playerVolume"
              :color="color"
              min="0"
              max="1"
              step="0.01"
              hide-details
              density="compact"
              thumb-size="10"
              track-size="3"
              rounded
              style="margin: 0 1px"
              aria-label="Volume"
            />
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
const formatTime = (second) =>
  new Date(second * 1000).toISOString().substr(11, 8);

export default {
  name: "VuetifyAudio",
  props: {
    flat: {
      type: Boolean,
      default: false,
    },
    file: {
      type: String,
      default: null,
    },
    autoPlay: {
      type: Boolean,
      default: false,
    },
    ended: {
      type: Function,
      default: () => {},
    },
    canPlay: {
      type: Function,
      default: () => {},
    },
    minimal: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: null,
    },
    downloadable: {
      type: Boolean,
      default: false,
    },
    playIcon: {
      type: String,
      default: "mdi-play",
    },
    pauseIcon: {
      type: String,
      default: "mdi-pause",
    },
    stopIcon: {
      type: String,
      default: "mdi-stop",
    },
    refreshIcon: {
      type: String,
      default: "mdi-refresh",
    },
    downloadIcon: {
      type: String,
      default: "mdi-download",
    },
    volumeHighIcon: {
      type: String,
      default: "mdi-volume-high",
    },
    volumeMuteIcon: {
      type: String,
      default: "mdi-volume-mute",
    },
    variant: {
      type: String,
      default: "default", // options: default, modern, tonal
      validator: (v) => ["default", "modern", "tonal"].includes(v),
    },
    playbackSpeed: {
      type: Boolean,
      default: false,
    },
    loopable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      firstPlay: true,
      isMuted: false,
      isOnRepeat: false,
      loaded: false,
      playing: false,
      paused: false,
      percentage: 0,
      currentTime: "00:00:00",
      audio: undefined,
      totalDuration: 0,
      playerVolume: 1.0,
      playbackSpeeds: [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5],
      currentSpeedIdx: 0,
    };
  },
  computed: {
    duration: function () {
      return this.audio ? formatTime(this.totalDuration) : "";
    },
    speedLabel() {
      return this.playbackSpeed
        ? `${this.playbackSpeeds[this.currentSpeedIdx]}x`
        : "";
    },
  },
  watch: {
    playerVolume(v) {
      if (v > 0) {
        this.isMuted = false;
      } else {
        this.isMuted = true;
      }
    },
    file(newFile, oldFile) {
      // When file changes, reload and try autoplay if enabled
      if (this.audio) {
        this.loaded = false;
        this.audio.src = newFile;
        this.audio.load();
        if (this.autoPlay) {
          // Try to play after a short delay to ensure audio is ready
          setTimeout(() => {
            this.audio.play().catch((e) => {
              // Log autoplay block for debugging
              console.warn("Autoplay failed:", e);
            });
          }, 100);
        }
        if (this.playbackSpeed) {
          this.currentSpeedIdx = 0;
          this.audio.playbackRate = this.playbackSpeeds[this.currentSpeedIdx];
          this.$forceUpdate();
        }
      }
    },
    playbackSpeed(newVal) {
      if (this.audio) {
        if (newVal) {
          this.audio.playbackRate = this.playbackSpeeds[this.currentSpeedIdx];
        } else {
          this.audio.playbackRate = 1.0;
        }
      }
    },
    autoPlay(newVal) {
      // If autoPlay is toggled on, try to play if loaded
      if (newVal && this.loaded && this.audio) {
        this.audio.play().catch((e) => {
          console.warn("Autoplay failed:", e);
        });
      }
    },
  },
  methods: {
    resolveColor(color, alpha) {
      if (!color) return "";
      // If color is a Vuetify CSS variable
      if (typeof color === "string" && color.startsWith("--v-theme-")) {
        return `var(${color})`;
      }
      // If color is a Vuetify theme name (primary, secondary, etc)
      // Always return the CSS variable, let the theme handle it
      if (typeof color === "string") {
        return `var(--v-theme-${color})`;
      }
      // If color is a hex and alpha is provided, convert to rgba
      if (
        alpha !== undefined &&
        typeof color === "string" &&
        color.startsWith("#")
      ) {
        let hex = color.replace("#", "");
        if (hex.length === 3)
          hex = hex
            .split("")
            .map((x) => x + x)
            .join("");
        const num = parseInt(hex, 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        return `rgba(${r},${g},${b},${alpha})`;
      }
      // If color is already a valid CSS color (e.g. 'red', 'rgb(...)')
      return color;
    },
    onProgressBarDown(e) {
      if (!this.loaded || !this.audio) return;
      const progress = e.target;
      const getPercent = (evt) => {
        const rect = progress.getBoundingClientRect();
        let clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
        let percent = (clientX - rect.left) / rect.width;
        percent = Math.max(0, Math.min(1, percent));
        this.audio.currentTime = percent * this.audio.duration;
        this.percentage = percent * 100;
      };
      getPercent(e);
      const move = (evt) => {
        evt.preventDefault();
        getPercent(evt);
      };
      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
        window.removeEventListener("touchmove", move);
        window.removeEventListener("touchend", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
      window.addEventListener("touchmove", move);
      window.addEventListener("touchend", up);
    },
    setPosition(e) {
      if (!this.loaded || !this.audio || !e) return;
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percent = Math.max(0, Math.min(1, x / rect.width));
      this.audio.currentTime = percent * this.audio.duration;
      this.percentage = percent * 100;
    },
    stop() {
      this.audio.pause();
      this.paused = true;
      this.playing = false;
      this.audio.currentTime = 0;
    },
    switchIsOnRepeat() {
      this.isOnRepeat = !this.isOnRepeat;
    },
    play() {
      if (this.playing) return;
      this.audio.play().then(() => (this.playing = true));
      this.paused = false;
    },
    pause() {
      this.paused = !this.paused;
      this.paused ? this.audio.pause() : this.audio.play();
    },
    download() {
      this.audio.pause();
      window.open(this.file, "download");
    },
    mute() {
      this.isMuted = !this.isMuted;
      this.playerVolume = this.isMuted ? 0 : 1.0;
      this.audio.muted = this.isMuted;
    },
    reload() {
      this.audio.load();
      if (this.playbackSpeed) {
        this.audio.playbackRate = this.playbackSpeeds[this.currentSpeedIdx];
      }
    },
    cycleSpeed() {
      if (!this.playbackSpeed || !this.audio) return;
      this.currentSpeedIdx =
        (this.currentSpeedIdx + 1) % this.playbackSpeeds.length;
      this.audio.playbackRate = this.playbackSpeeds[this.currentSpeedIdx];
      // Force UI update for badge
      this.$forceUpdate();
    },
    _handleLoaded: function () {
      if (this.audio.readyState >= 2) {
        if (this.audio.duration === Infinity) {
          // Fix duration for streamed audio source or blob based
          // https://stackoverflow.com/questions/38443084/how-can-i-add-predefined-length-to-audio-recorded-from-mediarecorder-in-chrome/39971175#39971175
          this.audio.currentTime = 1e101;
          this.audio.ontimeupdate = () => {
            this.audio.ontimeupdate = () => {};
            this.audio.currentTime = 0;
            this.totalDuration = parseInt(this.audio.duration);
            this.loaded = true;
          };
        } else {
          this.totalDuration = parseInt(this.audio.duration);
          this.loaded = true;
        }

        if (this.autoPlay) {
          // Try to play and catch errors (autoplay policy)
          this.audio.play().catch((e) => {
            // Log autoplay block for debugging
            console.warn("Autoplay failed:", e);
          });
        }
        if (this.playbackSpeed) {
          this.audio.playbackRate = this.playbackSpeeds[this.currentSpeedIdx];
        }
      } else {
        throw new Error("Failed to load sound file");
      }
    },
    _handlePlayingUI: function () {
      this.audio.volume = this.playerVolume;
      this.percentage = (this.audio.currentTime / this.audio.duration) * 100;
      this.currentTime = formatTime(this.audio.currentTime);
      this.playing = true;
    },
    _handlePlayPause: function (e) {
      if (e.type === "play" && this.firstPlay) {
        // in some situations, audio.currentTime is the end one on chrome
        this.audio.currentTime = 0;
        if (this.firstPlay) {
          this.firstPlay = false;
        }
      }
      if (
        e.type === "pause" &&
        this.paused === false &&
        this.playing === false
      ) {
        this.currentTime = "00:00:00";
      }
    },
    _handleEnded() {
      if (this.loopable && this.isOnRepeat) {
        this.audio.play();
      } else {
        this.paused = this.playing = false;
      }
    },
    init: function () {
      this.audio.addEventListener("timeupdate", this._handlePlayingUI);
      this.audio.addEventListener("loadeddata", this._handleLoaded);
      this.audio.addEventListener("pause", this._handlePlayPause);
      this.audio.addEventListener("play", this._handlePlayPause);
      this.audio.addEventListener("ended", this._handleEnded);
      if (this.playbackSpeed) {
        this.audio.playbackRate = this.playbackSpeeds[this.currentSpeedIdx];
      }
    },
  },
  mounted() {
    this.audio = this.$refs.player;
    this.init();
  },
  beforeUnmount() {
    if (!this.audio) return;
    this.audio.removeEventListener("timeupdate", this._handlePlayingUI);
    this.audio.removeEventListener("loadeddata", this._handleLoaded);
    this.audio.removeEventListener("pause", this._handlePlayPause);
    this.audio.removeEventListener("play", this._handlePlayPause);
    this.audio.removeEventListener("ended", this._handleEnded);
  },
};
</script>

<style scoped>
/* --- Variant: modern --- */
.vuetify-audio-modern {
  background: var(--v-theme-surface);
  box-shadow: 0 4px 24px 0 rgba(99, 102, 241, 0.1);
  border-radius: 18px;
  border: 1.5px solid var(--v-theme-primary);
  padding: 0.5rem 1rem 1rem 1rem !important;
  transition: box-shadow 0.3s, background 0.3s;
}
.vuetify-audio-modern .v-card-actions {
  display: flex !important;
  flex-wrap: nowrap !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 12px !important;
  min-height: 54px !important;
  padding: 0 !important;
}
.vuetify-audio-modern .v-btn {
  border-radius: 10px !important;
  box-shadow: 0 2px 8px 0 rgba(99, 102, 241, 0.08);
}
.vuetify-audio-modern .v-btn:disabled {
  opacity: 0.5;
}
.vuetify-audio-modern .v-btn .v-icon {
  font-size: 1.4rem !important;
}
.vuetify-audio-modern .v-progress-linear {
  border-radius: 10px !important;
  height: 16px !important;
  box-shadow: 0 2px 12px 0 rgba(99, 102, 241, 0.13);
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--v-theme-surface) 90%, var(--v-theme-primary) 10%)
      0%,
    color-mix(in srgb, var(--v-theme-surface) 80%, var(--v-theme-primary) 20%)
      100%
  ) !important;
  position: relative;
  overflow: visible;
  transition: background 0.3s;
}
.vuetify-audio-modern .v-progress-linear .v-progress-linear__determinate {
  background: linear-gradient(
    90deg,
    var(--v-theme-primary),
    color-mix(in srgb, var(--v-theme-primary) 60%, var(--v-theme-secondary) 40%)
  );
  box-shadow: 0 0 8px 2px
    color-mix(in srgb, var(--v-theme-primary) 60%, transparent 40%);
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s;
  position: relative;
  z-index: 1;
  animation: vaudio-modern-bar-move 2.2s linear infinite;
}
@keyframes vaudio-modern-bar-move {
  0% {
    filter: brightness(1) drop-shadow(0 0 0px var(--v-theme-primary));
  }
  50% {
    filter: brightness(1.08) drop-shadow(0 0 8px var(--v-theme-primary));
  }
  100% {
    filter: brightness(1) drop-shadow(0 0 0px var(--v-theme-primary));
  }
}
.vuetify-audio-modern
  .v-progress-linear
  .v-progress-linear__determinate::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    120deg,
    transparent 60%,
    color-mix(in srgb, var(--v-theme-primary) 30%, var(--v-theme-surface) 70%)
      100%
  );
  opacity: 0.18;
  pointer-events: none;
  z-index: 2;
  border-radius: 10px;
}
.vuetify-audio-modern .v-progress-linear .v-progress-linear__indeterminate {
  background: repeating-linear-gradient(
    90deg,
    var(--v-theme-primary) 0 10px,
    var(--v-theme-secondary) 10px 20px
  );
  opacity: 0.7;
  animation: vaudio-modern-indeterminate 1.2s linear infinite;
}
@keyframes vaudio-modern-indeterminate {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 40px;
  }
}
.vuetify-audio-modern .v-card-text {
  padding-bottom: 0.5rem !important;
  padding-top: 1.2rem !important;
}

/* --- Variant: tonal --- */
.vuetify-audio-tonal {
  background: rgba(245, 245, 250, 0.85);
  border-radius: 16px;
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  /* Remove static border and box-shadow, now handled inline for color prop */
  /* box-shadow and border removed here to allow inline style to control them */
  padding: 0.7rem 1.1rem 1.1rem 1.1rem !important;
  transition: box-shadow 0.3s, background 0.3s, border 0.3s;
}
.vuetify-audio-tonal .v-card-actions {
  display: flex !important;
  flex-wrap: nowrap !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 14px !important;
  min-height: 52px !important;
  padding: 0 !important;
}
.vuetify-audio-tonal .v-btn {
  border-radius: 8px !important;
  box-shadow: none !important;
  font-weight: 600;
  font-size: 1.08rem;
  letter-spacing: 0.02em;
  min-width: 44px;
  min-height: 44px;
  transition: background 0.18s, color 0.18s, border 0.18s;
  /* Remove background, border, and color so Vuetify color prop works */
}
.vuetify-audio-tonal .v-btn:disabled {
  opacity: 0.5;
}
.vuetify-audio-tonal .v-btn .v-icon {
  font-size: 1.35rem !important;
  /* Remove color override so icon uses color prop */
}
.vuetify-audio-tonal .v-progress-linear {
  border-radius: 8px !important;
  height: 14px !important;
  box-shadow: none !important;
  background: rgba(255, 255, 255, 0.55) !important;
  position: relative;
  overflow: visible;
  transition: background 0.3s;
}
.vuetify-audio-tonal .v-progress-linear .v-progress-linear__determinate {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--v-theme-primary, #bdb4e7) 40%, #fff 60%) 0%,
    color-mix(in srgb, var(--v-theme-secondary, #eaddff) 60%, #fff 40%) 100%
  );
  box-shadow: 0 0 0 0 transparent;
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s;
  position: relative;
  z-index: 1;
}
.vuetify-audio-tonal .v-progress-linear .v-progress-linear__indeterminate {
  background: repeating-linear-gradient(
    90deg,
    var(--v-theme-primary, #bdb4e7) 0 10px,
    var(--v-theme-secondary, #eaddff) 10px 20px
  );
  opacity: 0.5;
}
.vuetify-audio-tonal .v-slider .v-slider__thumb {
  box-shadow: 0 0 0 0 transparent;
  border: 1.5px solid var(--v-theme-primary, #bdb4e7);
  background: rgba(255, 255, 255, 0.85);
}
.vuetify-audio-tonal .v-slider .v-slider__track-container {
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--v-theme-primary, #bdb4e7) 40%, #fff 60%) 0%,
    color-mix(in srgb, var(--v-theme-secondary, #eaddff) 60%, #fff 40%) 100%
  ) !important;
  height: 3px !important;
  box-shadow: none !important;
}
.vuetify-audio-tonal .text-caption {
  color: var(--v-theme-primary, #6750a4) !important;
  opacity: 0.85;
}
.vuetify-audio-tonal-light {
  background: rgba(245, 245, 250, 0.85);
}
.vuetify-audio-tonal-dark {
  background: rgba(30, 32, 40, 0.92);
  color: #e3eaf7;
}
@media (max-width: 600px) {
  .vuetify-audio-modern {
    padding: 0.5rem 0.5rem 1rem 0.5rem !important;
  }
  .vuetify-audio-modern .v-card-actions {
    gap: 6px !important;
    min-height: 44px !important;
  }
  .vuetify-audio-modern .v-row {
    min-width: 60px !important;
    max-width: 80px !important;
    margin-left: 4px !important;
  }
  .vuetify-audio-tonal {
    padding: 0.4rem 0.3rem 0.7rem 0.3rem !important;
    border-radius: 12px;
    backdrop-filter: blur(8px) saturate(1.1);
    -webkit-backdrop-filter: blur(8px) saturate(1.1);
  }
  .vuetify-audio-tonal .v-card-actions {
    gap: 7px !important;
    min-height: 38px !important;
  }
  .vuetify-audio-tonal .text-caption {
    font-size: 0.98rem !important;
  }
}
</style>
