<!-- 歌词 -->
<template>
  <transition name="slide-down">
    <div class="lyrics" v-show="isShow">
      <div class="blur" :style="{backgroundImage:`url(${info.picUrl})`}"></div>
      <div class="content" v-show="!showComment">
        <!-- 返回 -->
        <div class="back" @click="$emit('handleToggleShow','showLyrics')">
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="main">
          <!-- 专辑图 -->
          <div class="disc" :class="{'paused':!playState}">
            <img :src="info.picUrl" alt />
            <span class="mask"></span>
          </div>
          <div class="info" ref="box">
            <!-- 歌曲信息 -->
            <div class="name">
              <h3>{{ info.name }}</h3>
              <div class="artists" v-if="info.current">
                <span>歌手：</span>
                {{ info.artists }}
                <span>专辑：</span>
                {{ info.album }}
              </div>
            </div>
            <!-- 歌词 -->
            <div class="text">
              <div class="center" v-if="lyrics.noLyric">{{ lyrics.noLyricText }}</div>
              <ul ref="list" v-if="lyrics.list.length" @mousedown="handleStart" @mouseup="handleEnd" @mousemove="handleMove">
                <li v-for="(item,index) in lyrics.list" :key="index" :class="{ 'active': index === lyrics.index }" :ref="`current${index}`">
                  {{ item.words }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="player-bar">
          <!-- 进度条/时间 -->
          <div class="progress">
            <span>{{ songTime.currentTime }}</span>
            <slider @handleChange="handleChange" :width="songTime.width" height="1px" tag="songTime" />
            <span>{{ songTime.totalTime }}</span>
          </div>
          <div class="operation">
            <!-- 评论/喜爱 -->
            <div class="chat">
              <i class="iconfont icon-heart2"></i>
              <span @click="$emit('handleToggleShow','showComment')">
                <i class="el-icon-chat-dot-square"></i>
                <span>{{ getComment }}</span>
              </span>
            </div>
            <!-- 播放按钮 -->
            <div class="play-btn">
              <i class="iconfont icon-jiantou_shangyiye_o" @click="$emit('handleChangeSong',-1)"></i>
              <i :class="['iconfont','play',playIcon]" @click="$emit('handleChangeOption',{ 'play':!playState })"></i>
              <i class="iconfont icon-jiantou_xiayiye_o" @click="$emit('handleChangeSong',1)"></i>
            </div>
            <!-- 随机/音量/列表 -->
            <div class="list">
              <el-tooltip :content="getOrderTip" placement="bottom">
                <i :class="['iconfont','order',orderInfo[order]['class']]" @click="$emit('handleChangeOption',{ 'order': getNextOrder })"></i>
              </el-tooltip>
              <el-tooltip :content="volume.width" placement="bottom">
                <i :class="['iconfont', 'volume', volumeIcon]" @click="handleToggleVol"></i>
              </el-tooltip>
              <slider @handleChange="handleChange" height="2px" :width="volume.width" tag="volume" />
              <!-- <el-tooltip content="播放列表" placement="bottom">
                <div class="playlist" @click="$emit('handleToggleShow','showList')">
                  <i class="iconfont icon-play-list-line"></i>
                  <span>{{ songList.length }}</span>
                </div>
              </el-tooltip>-->
            </div>
          </div>
        </div>
      </div>
      <!-- 评论 -->
      <div v-if="info.current.id && showComment " class="comment">
        <div class="back" @click="$emit('handleToggleShow','showComment')">
          <i class="el-icon-arrow-left"></i>返回
        </div>
        <div class="name">
          <h3>{{ info.name }}</h3>
          <div class="artists">
            <span>歌手：</span>
            {{ info.artists }}
            <span>专辑：</span>
            {{ info.album }}
          </div>
        </div>
        <Comment :comment="comment" @handleChangePage="handleChangePage" method="dark" ref="comment" />
      </div>
    </div>
  </transition>
</template>

<script>
import Slider from "@/components/Slider";
import Comment from "@/components/Comment";

export default {
  name: "lyrics",
  components: { Slider, Comment },
  props: {
    info: {
      type: Object
    },
    isShow: {
      type: Boolean
    },
    showComment: {
      type: Boolean
    },
    playState: {
      type: Boolean
    },
    lyrics: {
      type: Object
    },
    songTime: {
      type: Object
    },
    volume: {
      type: Object
    },
    orderInfo: {
      type: Array
    },
    order: {
      type: Number
    },
    songList: {
      type: Array
    },
    comment: {
      type: Object
    }
  },
  data() {
    return {
      index: -1,
      drag: false
    };
  },
  computed: {
    getComment() {
      // 获取歌曲评论数
      return this.comment.total > 999 ? "999+" : this.comment.total;
    },
    getNextOrder() {
      // 获取歌曲顺序
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
    }
  },
  created() {},
  watch: {
    isShow(val) {
      if (val) {
        this.handleScroll();
      }
    }
  },
  methods: {
    handleChangePage(obj) {
      // 评论改变
      // console.log(obj)
      this.$emit("handleChangeComment", obj);
      this.handleScrollTop();
    },
    handleScrollTop() {
      // 评论翻页滚动
      const el = this.$refs.comment.$el;
      this.$root.scrollTop(el, 0, 20);
    },
    handleToggleVol() {
      // 切换音量
      const vol = parseInt(this.volume.default) / 100;
      this.$emit("handleChangeVol", !this.volume.muted ? 0 : vol);
    },
    handleChange(rate, tag) {
      // 改变进度
      this.$emit("handleChange", rate, tag);
    },
    handleToggleVol() {
      // 切换音量
      const vol = parseInt(this.volume.default) / 100;
      this.$emit("handleChangeVol", !this.volume.muted ? 0 : vol);
    },
    handleScroll(i) {
      // 歌词滚动
      if (this.index != i) {
        const name = "current" + this.lyrics.index;
        if (this.$refs[name]) {
          if (!this.$refs[name].length) return;
          const boxRef = this.$refs.box;
          const listRef = this.$refs.list;
          const liRef = this.$refs[name][0];
          listRef.scrollTop = liRef.offsetTop - boxRef.clientHeight / 2 + 25;
        }
        this.index = i;
      }
    },
    handleStart() {
      // 拖拽歌词开始
      this.drag = true;
    },
    handleMove(e) {
      // 拖拽歌词移动
      e.stopPropagation();
      e.preventDefault();
      if (this.drag) {
        console.log("move", e);
      }
    },
    handleEnd(e) {
      // 拖拽歌词结束
      this.drag = false;
      console.log("end", e);
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

.lyrics {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 300;
  .lyrics,
  .blur {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    filter: blur(30px);
    background-color: #000;
  }
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 20px;
    box-sizing: border-box;
    .back {
      font-size: 25px;
      cursor: pointer;
      display: inline-block;
      padding: 10px 20px 0;
    }
    .main {
      display: flex;
      height: 75%;
      align-items: center;
      width: 90%;
      margin: 0 auto;
      justify-content: space-around;
      flex: 1;
      position: relative;
      top: 42%;
      transform: translateY(-50%);
      .info {
        width: 50%;
        height: 100%;
        align-self: flex-start;
        .name {
          margin-bottom: 36px;
          h3 {
            font-weight: 400;
            font-size: 20px;
          }
          .artists {
            span {
              color: rgba(255, 255, 255, 0.4);
              &:last-child {
                margin-left: 10px;
              }
            }
          }
        }
        .text {
          height: 74%;
          font-size: 14px;
          overflow: hidden;
          -webkit-box-sizing: border-box;
          ul {
            transition: all 0.3s;
            overflow-y: auto;
            height: 100%;
            cursor: grabbing;
            &::-webkit-scrollbar {
              display: none;
            }
            li {
              height: 25px;
              line-height: 25px;
              &.active {
                color: @theme-color;
              }
            }
          }
          .center {
            height: 100%;
            display: flex;
            align-items: center;
          }
        }
      }
      .disc {
        position: relative;
        width: 300px;
        height: 300px;
        animation: rotate 20s linear infinite;
        animation-play-state: running;
        &.paused {
          animation-play-state: paused;
        }
        img {
          width: 70%;
          margin: 50%;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url("~@/assets/images/disc.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .player-bar {
      color: #888;
      padding: 40px 50px;
      // height: @footer-height;
      position: absolute;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      left: 0;
      .progress {
        display: flex;
        align-items: center;
        flex: 1;
        .progress-bar-bg {
          margin: 0 20px;
          background: rgba(255, 255, 255, 0.1);
        }
      }
      .operation {
        display: flex;
        margin-top: 12px;
        color: #ddd;
        justify-content: space-between;
        align-items: center;
        i {
          font-size: 16px;
          cursor: pointer;
        }
        .chat,
        .list {
          cursor: pointer;
          width: 120px;
          > i {
            margin-right: 5px;
          }
        }
        .play-btn {
          display: flex;
          align-items: center;
          i {
            font-size: 20px;
            font-weight: bold;
            padding: 0 10px;
          }
          i:nth-child(2) {
            font-size: 25px;
          }
        }
        .list {
          display: flex;
          align-items: center;
          .volume {
            margin-left: 10px;
            font-size: 22px;
          }
          .progress-bar-bg {
            margin-left: 10px;
            background: #888;
          }
          .playlist {
            display: flex;
            cursor: pointer;
          }
        }
      }
    }
  }
  > .comment {
    padding: 50px 0;
    > div {
      padding: 0 50px;
    }
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    overflow: hidden;
    color: #fff;
    position: relative;
    box-sizing: border-box;
    .back {
      cursor: pointer;
    }
    .name {
      margin-bottom: 36px;
      text-align: center;
      h3 {
        font-weight: 400;
        font-size: 20px;
        margin: 5px;
      }
      .artists {
        span {
          color: rgba(255, 255, 255, 0.4);
          &:last-child {
            margin-left: 10px;
          }
        }
      }
    }
    .comment {
      height: 85%;
      overflow-y: auto;
    }
  }
}
</style>