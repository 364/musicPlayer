<!-- 底部 -->
<template>
  <div class="player-bar">
    <!-- 音乐名称 -->
    <div class="info">
      <img src alt />
      <div class="name">
        <div>{{ getName }}</div>
        <div class="artists">{{ getArtists }}</div>
      </div>
    </div>
    <div class="operation">
      <!-- 播放按钮 -->
      <div class="play-btn">
        <i class="iconfont icon-jiantou_shangyiye_o"></i>
        <i :class="['iconfont','play',iconPlayClass]" @click="handlePlay"></i>
        <i class="iconfont icon-jiantou_xiayiye_o"></i>
      </div>
      <!-- 进度条/时间 -->
      <div class="progress">
        <span>{{ songTime.currentTime }}</span>
        <slider :width="songTime.width" />
        <span>{{ songTime.totalTime }}</span>
      </div>
      <!-- 随机/音量/列表 -->
      <div class="list">
        <i :class="['iconfont','order',iconOrderClass[songOptions.order]['class']]"></i>
        <i class="iconfont icon-volume volume"></i>
        <slider :width="volume.width" />
        <i class="iconfont icon-play-list-line"></i>
      </div>
    </div>
    <audio v-if="songUrlList.length" :src="songUrlList[songOptions.current].url" ref="audio"></audio>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import * as TYPES from "@/store/types";
import Slider from "@/components/Slider";
import moment from "moment";

export default {
  name: "player-bar",
  components: {
    Slider
  },
  data() {
    return {
      default: {
        name: "DO RE MI FA SO LA XI",
        artists: "Enjoy music Enjoy life"
      },
      songTime: {
        currentTime: "00:00",
        totalTime: "00:00",
        width: "0%"
      },
      volume:{
        width:'100%'
      },
      iconPlayClass: "icon-bofanganniu",
      iconOrderClass: [
        { class: "icon-unorderedlist", name: "顺序播放" },
        { class: "icon-xunhuanbofang", name: "列表循环" },
        { class: "icon-danquxunhuan", name: "单曲循环" },
        { class: "icon-suijibofang", name: "随机播放" }
      ]
    };
  },
  computed: {
    getCurrent(){
      return this.songDetailList[this.songOptions.current]
    },
    getName() {
      if (this.getCurrent) {
        return this.getCurrent.name;
      }
      return this.default.name;
    },
    getArtists() {
      if (this.getCurrent) {
        return this.$root.getArtists(this.getCurrent);
      }
      return this.default.artists;
    },
    ...mapState({
      songDetailList: state => state.detail.songList.details,
      songUrlList: state => state.detail.songList.urls,
      songOptions: state => state.detail.songOptions
    })
  },
  created() {},
  watch: {
    songDetailList(newVal) {
      if (this.getCurrent) {
        this.songTime.totalTime = this.$root.formatTime(this.getCurrent.dt,"mm:ss")
      }
    },
    songOptions(newVal) {
      if (newVal.play) {
        // 播放
        this.$refs.audio.play();
        this.iconPlayClass = "icon-pause";
      } else {
        this.$refs.audio.pause();
        this.iconPlayClass = "icon-bofanganniu";
      }
    },
    songUrlList(newVal) {
      if (newVal.length) {
        this.$nextTick(() => {
          this.$refs.audio.addEventListener(
            "timeupdate",
            () => {
              // console.log(
              //   "监听音频播放时间并更新进度条",
              //   this.$refs.audio.currentTime,
              //   this.$refs.audio.duration
              // );
              this.handlePlayTime();
            },
            false
          );
        });
      }
    }
  },
  methods: {
    handlePlayTime() {
      const { currentTime, duration } = this.$refs.audio;
      let value = currentTime / duration;
      this.songTime = Object.assign({}, this.songTime, {
        currentTime: this.$root.formatTime(currentTime * 1000,"mm:ss"),
        width: value * 100 + "%"
      });
    },
    handlePlay() {
      this[TYPES.MUTATIONS_SET_SONG_OPTIONS]({ play: !this.songOptions.play });
    },
    updateProgress(audio) {
      var value = audio.currentTime / audio.duration;
    },
    ...mapMutations([TYPES.MUTATIONS_SET_SONG_OPTIONS])
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.player-bar {
  width: 100%;
  height: @footer-height;
  position: absolute;
  bottom: 0;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background: fade(#fff, 90%);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-right: 20px;
  color: @theme-color;
  .info {
    color: #555;
    display: flex;
    width: @sidebar-width;
    overflow: hidden;
    box-sizing: border-box;
    padding-left: 20px;
    margin-right: 20px;
    @media screen and (max-width: 1200px) {
      width: @sidebar-small-width;
    }
    .name {
      width: 100%;
      > div {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .artists {
        color: #999;
        line-height: 20px;
      }
    }
  }
  .operation {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex: 1;
    .play-btn {
      font-weight: 600;
      .play {
        font-weight: 400;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 100%;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        &:hover {
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }
      }
    }
    .play-btn,
    .list {
      width: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 22px;
      i {
        cursor: pointer;
      }
    }
    .list {
      width: 160px;
      .volume {
        margin-left: 10px;
        font-size: 22px;
      }
    }
    .progress {
      display: flex;
      color: #888;
      align-items: center;
      flex: 1;
      margin: 0 20px;
    }
  }
}
</style>      