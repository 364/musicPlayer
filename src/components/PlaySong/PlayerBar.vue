<!--  -->
<template>
  <div class="player-bar">
    <!-- 音乐名称 -->
    <div class="info" @click="$emit('handleToggleShow','showLyrics')">
      <img :src="info.picUrl" alt="picUrl" />
      <div class="name">
        <div>{{ info.name }}</div>
        <div class="artists">{{ info.artists }}</div>
      </div>
    </div>
    <div class="operation">
      <!-- 播放按钮 -->
      <div class="play-btn">
        <i class="iconfont icon-jiantou_shangyiye_o" @click="$emit('handleChangeSong',-1)"></i>
        <i
          :class="['iconfont','play',playIcon]"
          @click="$emit('handleChangeOption',{ 'play':!playState })"
        ></i>
        <i class="iconfont icon-jiantou_xiayiye_o" @click="$emit('handleChangeSong',1)"></i>
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
            :class="['iconfont','order',orderInfo[order]['class']]"
            @click="$emit('handleChangeOption',{ 'order': getNextOrder })"
          ></i>
        </el-tooltip>
        <el-tooltip :content="volume.width" placement="top">
          <i :class="['iconfont', 'volume', volumeIcon]" @click="handleToggleVol"></i>
        </el-tooltip>
        <slider @handleChange="handleChange" :width="volume.width" tag="volume" />
        <el-tooltip content="播放列表" placement="bottom">
          <div class="playlist" @click="$emit('handleToggleShow','showList')">
            <i class="iconfont icon-play-list-line"></i>
            <span>{{ songList.length }}</span>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from "@/components/Slider";

export default {
  name: "player-bar",
  components: { Slider },
  props: {
    info: {
      type: Object
    },
    playState: {
      type: Boolean
    },
    songTime: {
      type: Object
    },
    volume: {
      type: Object
    },
    order: {
      type: Number
    },
    songList: {
      type: Array
    },
    orderInfo: {
      type: Array
    }
  },
  data() {
    return {
      
    };
  },
  computed: {
    getNextOrder() {
      // 获取顺序
      let num = this.order;
      if (++num >= this.orderInfo.length) {
        num = 0;
      }
      return num;
    },
    volumeIcon() {
      // 获取音量图标
      return !this.volume.muted ? "icon-volume" : "icon-jingyin1";
    },
    playIcon() {
      // 暂停播放按钮
      return this.playState ? "icon-pause" : "icon-bofanganniu";
    },
    getOrderTip() {
      // 获取播放顺序提示
      return this.orderInfo[this.order]["name"];
    },
  },
  created() {},
  watch: {},
  methods: {
    handleChange(rate, tag) {
      // 改变进度
      this.$emit("handleChange", rate, tag);
    },
    handleToggleVol() {
      // 切换音量
      const vol = parseInt(this.volume.default) / 100;
      this.$emit("handleChangeVol", !this.volume.muted ? 0 : vol);
    }
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
  z-index: 200;
  .info {
    color: #555;
    display: flex;
    width: @sidebar-width;
    overflow: hidden;
    box-sizing: border-box;
    padding-left: 20px;
    margin-right: 20px;
    cursor: pointer;
    @media screen and (max-width: 1200px) {
      width: @sidebar-small-width;
    }
    align-items: center;
    &:hover {
      &:before {
        content: "\e6dd";
        background: rgba(0, 0, 0, 0.4);
        position: absolute;
        width: 35px;
        height: 35px;
        z-index: 5;
        border-radius: 3px;
        overflow: hidden;
        color: #ccc;
        font-family: element-icons !important;
        transform: rotate(90deg);
        text-align: center;
        line-height: 35px;
      }
    }
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
      .playlist {
        display: flex;
        cursor: pointer;
        i {
          margin-right: 5px;
        }
      }
      .progress-bar-bg{
        margin:0 10px;
      }
    }
    .progress {
      display: flex;
      color: #888;
      align-items: center;
      flex: 1;
      margin: 0 20px;
      .progress-bar-bg{
        margin:0 20px;
      }
    }
  }
}
</style>      