<template>
  <v-container fluid class="pa-0">
    <v-card
      :class="[
        variant === 'modern' ? 'vuetify-audio-modern' : '',
        'pa-4',
        'pa-sm-6',
      ]"
      style="text-align: center; max-width: 420px; margin: 0 auto"
      :flat="
        variant === 'modern'
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
          v-if="!minimal"
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
      default: "default", // options: default, modern
      validator: (v) => ["default", "modern"].includes(v),
    },
  },
  computed: {
    duration: function () {
      return this.audio ? formatTime(this.totalDuration) : "";
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
    };
  },

  methods: {
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

        if (this.autoPlay) this.audio.play();
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
      if (this.isOnRepeat) {
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
  border-radius: 8px !important;
  height: 12px !important;
  box-shadow: 0 1px 6px 0 rgba(99, 102, 241, 0.08);
}
.vuetify-audio-modern .v-row {
  flex-wrap: nowrap !important;
  align-items: center !important;
  margin-left: 8px !important;
  margin-right: 0 !important;
  min-width: 90px !important;
  max-width: 120px !important;
}
.vuetify-audio-modern .v-col {
  padding: 0 !important;
}
.vuetify-audio-modern .text-caption {
  font-size: 1.01rem !important;
  color: var(--v-theme-primary) !important;
  font-weight: 500;
  letter-spacing: 0.2px;
}
.vuetify-audio-modern .v-card-text {
  padding-bottom: 0.5rem !important;
  padding-top: 1.2rem !important;
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
}
</style>
