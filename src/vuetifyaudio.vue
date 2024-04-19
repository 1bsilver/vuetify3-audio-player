<template>
  <v-container fluid>
    <v-card
      style="text-align: center"
      :flat="flat == undefined || flat == false ? false : true"
    >
      <v-card-text>
        <v-row>
          <v-col class="px-0 mx-0 text-caption">{{ currentTime }}</v-col>
          <v-col :cols="minimal ? 6 : 8">
            <v-progress-linear
              :color="color"
              hide-details
              v-model="percentage"
              :height="20"
              clickable
              rounded
              @click="setPosition()"
              :disabled="!loaded"
            ></v-progress-linear>
          </v-col>
          <v-col class="px-0 mx-0 text-caption">{{ duration }}</v-col>
        </v-row>
      </v-card-text>
      <audio
        id="player"
        ref="player"
        v-on:ended="ended"
        v-on:canplay="canPlay"
        :src="file"
      ></audio>
      <v-card-actions>
        <v-spacer v-if="minimal"></v-spacer>
        <v-btn
          variant="outlined"
          icon
          :size="minimal ? 'small' : 'default'"
          class="ma-2"
          :color="color"
          @click="playing ? pause() : play()"
          :disabled="!loaded"
        >
          <v-icon v-if="!playing || paused">{{ playIcon }}</v-icon>
          <v-icon v-else>{{ pauseIcon }}</v-icon>
        </v-btn>
        <v-btn
          variant="outlined"
          :size="minimal ? 'small' : 'default'"
          icon
          class="ma-2"
          :color="color"
          @click="stop()"
          :disabled="!loaded"
        >
          <v-icon>{{ stopIcon }}</v-icon>
        </v-btn>
        <v-btn
          variant="outlined"
          :size="minimal ? 'small' : 'default'"
          icon
          class="ma-2"
          :color="color"
          @click="switchIsOnRepeat()"
          :disabled="!loaded"
        >
          <v-icon v-if="isOnRepeat">mdi-repeat</v-icon>
          <v-icon v-else>mdi-repeat-off</v-icon>
        </v-btn>
        <v-btn
          variant="outlined"
          :size="minimal ? 'small' : 'default'"
          icon
          class="ma-2"
          :color="color"
          @click="loaded ? download() : reload()"
          v-if="!loaded"
        >
          <v-icon>{{ refreshIcon }}</v-icon>
        </v-btn>
        <v-btn
          variant="outlined"
          :size="minimal ? 'small' : 'default'"
          icon
          class="ma-2"
          :color="color"
          @click="loaded ? download() : reload()"
          v-if="loaded && downloadable"
        >
          <v-icon>{{ downloadIcon }}</v-icon>
        </v-btn>
        <v-btn
          v-if="minimal"
          variant="outlined"
          :size="minimal ? 'small' : 'default'"
          icon
          class="ma-2"
          :color="color"
          @click="mute()"
          :disabled="!loaded"
        >
          <v-icon>{{ isMuted ? volumeMuteIcon : volumeHighIcon }}</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
        <v-slider
          v-if="!minimal"
          v-model="playerVolume"
          rounded
          thumb-size="15"
          hide-details
          :color="color"
          max="1"
          step="0.01"
          min="0"
          density="compact"
          class=""
        >
          <template #prepend>
            <v-icon v-if="!isMuted" @click="mute()" :color="color">
              {{ volumeHighIcon }}
            </v-icon>
            <v-icon v-else @click="mute()" :color="color">
              {{ volumeMuteIcon }}
            </v-icon>
          </template>
        </v-slider>
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
      playerVolume: 0.5,
    };
  },

  methods: {
    setPosition() {
      this.audio.currentTime = parseInt(
        (this.audio.duration / 100) * this.percentage
      );
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
      this.playerVolume = this.isMuted ? 0 : 0.5;
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
    this.audio.removeEventListener("timeupdate", this._handlePlayingUI);
    this.audio.removeEventListener("loadeddata", this._handleLoaded);
    this.audio.removeEventListener("pause", this._handlePlayPause);
    this.audio.removeEventListener("play", this._handlePlayPause);
    this.audio.removeEventListener("ended", this._handleEnded);
  },
};
</script>
