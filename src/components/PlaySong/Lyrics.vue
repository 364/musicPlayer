<!-- 歌词 -->
<template>
  <transition name="slide-down">
    <div class="lyrics" v-show="isShow">
      <div class="blur" :style="{backgroundImage:`url(${info.picUrl})`}"></div>
      <div class="content">
        <div class="back" @click="$emit('handleToggleShow','showLyrics')">
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="main">
          <div class="disc" :class="{'paused':!playState}">
            <img :src="info.picUrl" alt />
            <span class="mask"></span>
          </div>
          <div class="info" ref="box">
            <div class="name">
              <h3>{{ info.name }}</h3>
              <div class="artists" v-if="info.currentSong">
                <span>歌手：</span>
                {{ info.artists }}
                <span>专辑：</span>
                {{ info.album }}
              </div>
            </div>
            <div class="text">
              <div class="center" v-if="lyrics.noLyric">{{ lyrics.noLyricText }}</div>
              <ul
                ref="list"
                v-if="lyrics.list.length"
                @mousedown="handleStart"
                @mouseup="handleEnd"
                @mousemove="handleMove"
              >
                <li
                  v-for="(item,index) in lyrics.list"
                  :key="item.time"
                  :class="{ 'active': index === lyrics.index }"
                  :ref="`current${index}`"
                >{{ item.words }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    info: {
      type: Object
    },
    isShow: {
      type: Boolean
    },
    playState: {
      type: Boolean
    },
    lyrics: {
      type: Object
    }
  },
  data() {
    return {
      index: -1,
      drag: false
    };
  },
  computed: {},
  created() {},
  watch: {},
  methods: {
    handleScroll(i) {
      if (this.index != i) {
        const name = "current" + this.lyrics.index;
        if (this.$refs[name]) {
          if (!this.$refs[name].length) return;
          const listRef = this.$refs.list;
          const liRef = this.$refs[name][0];
          listRef.scrollTop = liRef.offsetTop - listRef.clientHeight / 2 + 25;
        }
        this.index = i;
      }
    },
    handleStart() {
      this.drag = true;
    },
    handleMove(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.drag) {
        console.log(e);
      }
    },
    handleEnd(e) {
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
  }
  .blur {
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    filter: blur(30px);
  }
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 20px;
    box-sizing: border-box;
    .back {
      font-size: 25px;
      cursor: pointer;
      display: inline-block;
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
            position: relative;
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
  }
}
</style>