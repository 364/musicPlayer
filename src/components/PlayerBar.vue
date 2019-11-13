<!-- 底部 -->
<template>
  <div class="player-bar">
    <!-- 音乐名称 -->
    <div class="info">
      <img :src="getPicUrl" alt="picUrl" />
      <div class="name">
        <div>{{ getName }}</div>
        <div class="artists">{{ getArtists }}</div>
      </div>
    </div>
    <div class="operation">
      <!-- 播放按钮 -->
      <div class="play-btn">
        <i class="iconfont icon-jiantou_shangyiye_o" @click="handleChangeSong(-1)"></i>
        <i
          :class="['iconfont','play',iconPlayClass]"
          @click="handleChangeOption({ play: !songOptions.play })"
        ></i>
        <i class="iconfont icon-jiantou_xiayiye_o" @click="handleChangeSong(1)"></i>
      </div>
      <!-- 进度条/时间 -->
      <div class="progress">
        <span>{{ songTime.currentTime }}</span>
        <slider @handleChange="handleChange" :width="songTime.width" tag="songTime" />
        <span>{{ songTime.totalTime }}</span>
      </div>
      <!-- 随机/音量/列表 -->
      <div class="list">
        <el-tooltip :content="getOrderTip" placement="top">
          <i
            :class="['iconfont','order',orderInfo[songOptions.order]['class']]"
            @click="handleChangeOption({ order: getNextOrder})"
          ></i>
        </el-tooltip>
        <el-tooltip :content="volume.width" placement="top">
          <i :class="['iconfont', 'volume', getVolIcon]" @click="handleToggleVol"></i>
        </el-tooltip>
        <slider @handleChange="handleChange" :width="volume.width" tag="volume" />
        <el-tooltip content="播放列表" placement="top">
          <i class="iconfont icon-play-list-line"></i>
        </el-tooltip>
      </div>
    </div>
    <audio v-if="songList.length" :src="getSongUrl" ref="audio"></audio>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import * as TYPES from "@/store/types";
import Slider from "@/components/Slider";
import moment from "moment";
import { album } from "@/api";

export default {
  name: "player-bar",
  components: {
    Slider
  },
  data() {
    return {
      default: {
        name: "DO RE MI FA SO LA XI",
        artists: "Enjoy music Enjoy life",
        picUrl: require("@/assets/images/artists.jpg")
      },
      songTime: {
        currentTime: "00:00",
        totalTime: "00:00",
        width: "0%"
      },
      volume: {
        default: "100%",
        width: "100%",
        muted: false
      },
      iconPlayClass: "icon-bofanganniu",
      orderInfo: [
        { class: "icon-unorderedlist", name: "顺序播放" },
        { class: "icon-xunhuanbofang", name: "列表循环" },
        { class: "icon-danquxunhuan", name: "单曲循环" },
        { class: "icon-suijibofang", name: "随机播放" }
      ]
    };
  },
  computed: {
    getSongUrl() {
      // console.log(this.songList[this.songOptions.current].url);
      return this.songList[this.songOptions.current].url;
    },
    getVolIcon() {
      // 获取音量图标
      return !this.volume.muted ? "icon-volume" : "icon-jingyin1";
    },
    getNextOrder() {
      // 获取顺序
      let num = this.songOptions.order;
      if (++num >= this.orderInfo.length) {
        num = 0;
      }
      return num;
    },
    getOrderTip() {
      // 获取顺序提示
      return this.orderInfo[this.songOptions.order]["name"];
    },
    getPicUrl() {
      // 获取歌曲图片
      return this.default.picUrl;
    },
    getCurrent() {
      // 获取当前播放的内容
      return this.songList[this.songOptions.current];
    },
    getName() {
      // 获取歌曲名
      if (this.getCurrent) {
        return this.getCurrent.name;
      }
      return this.default.name;
    },
    getArtists() {
      // 获取歌手
      if (this.getCurrent) {
        return this.$root.getArtists(this.getCurrent);
      }
      return this.default.artists;
    },
    ...mapState({
      songList: state => state.detail.songList,
      songOptions: state => state.detail.songOptions
    })
  },
  created() {},
  watch: {
    songList(newVal) {
      if (this.getCurrent) {
        this.songTime.totalTime = this.$root.formatTime(
          this.getCurrent.dt,
          "mm:ss"
        );
        this.default.picUrl = this.getCurrent.al.picUrl;
        this.$nextTick(() => {
          // 播放
          if (!this.$refs.audio) return;
          this.$refs.audio.addEventListener(
            "timeupdate",
            this.handlePlayTime,
            false
          );
          // 播放结束
          this.$refs.audio.addEventListener("ended", this.handlePlayEnd, false);
        });
      }
    },
    songOptions(newVal) {
      console.log(newVal.play);
      if (this.$refs.audio) {
        if (newVal.play) {
          // 播放
          this.$refs.audio.play();
          this.iconPlayClass = "icon-pause";
        } else {
          this.$refs.audio.pause();
          this.iconPlayClass = "icon-bofanganniu";
        }
      }
    }
  },
  methods: {
    handleToggleVol() {
      // 切换音量
      const vol = parseInt(this.volume.default) / 100;
      this.handleChangeVol(!this.volume.muted ? 0 : vol);
    },
    handleChangeVol(rate) {
      // 改变音量
      this.volume.width = parseInt(rate * 100) + "%";
      this.volume.muted = !rate;
      if (this.$refs.audio) {
        this.$refs.audio.volume = rate;
      }
    },
    handlePlayTime() {
      // 改变播放事件
      const { currentTime, duration } = this.$refs.audio;
      let value = currentTime / duration;
      this.songTime = Object.assign({}, this.songTime, {
        currentTime: this.$root.formatTime(currentTime * 1000, "mm:ss"),
        width: value * 100 + "%"
      });
    },
    handlePlayEnd() {
      // 播放结束
      this.songTime = Object.assign({}, this.songTime, {
        currentTime: "00:00",
        width: "0%"
      });
      this.handleChangeSong(1);
    },
    handleChange(rate, tag) {
      // 改变进度
      if (tag === "volume") {
        this.handleChangeVol(rate);
        this.volume.default = !rate ? "75%" : parseInt(rate * 100) + "%";
      } else {
        if (this.$refs.audio) {
          const { duration } = this.$refs.audio;
          this.$refs.audio.currentTime = duration * rate;
          this.handlePlayTime();
        }
      }
    },
    handleChangeOption(obj) {
      // 改变信息
      this[TYPES.MUTATIONS_SET_SONG_OPTIONS](obj);
    },
    handleChangeSong(num) {
      // 改变歌曲
      this.handleChangeOption({ play: false });
      let current = this.songOptions.current;
      let play = true;
      current += num;
      switch (this.songOptions.order) {
        case 0:
          // 顺序播放
          if (current < 0 || current >= this.songList.length - 1) {
            play = false;
            current = 0;
            this.$refs.audio.pause();
          }
          break;
        case 1:
          // 列表循环
          if (current >= this.songList.length - 1) {
            current = 0;
          }
          if (current < 0) {
            current = this.songList.length - 1;
          }
          break;
        case 3:
          // 随机播放
          current = Math.round(Math.random() * this.songList.length - 1);
          break;
        default:
          break; // 单曲循环
      }
      this.handleChangeOption({ current });
      if (this.$refs.audio && play) {
        this.default.picUrl = this.getCurrent.al.picUrl;
        setTimeout(()=>{
          this.handleChangeOption({ play: true });
        },1000)
      }
    },
    ...mapMutations([
      TYPES.MUTATIONS_SET_SONG_OPTIONS,
      TYPES.MUTATIONS_GET_SONG_DETAIL
    ])
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
    align-items: center;
    img {
      width: 35px;
      height: 35px;
      position: absolute;
      border-radius: 3px;
      overflow: hidden;
    }
    .name {
      width: 100%;
      padding-left: 40px;
      box-sizing: border-box;
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