<!-- 歌词 -->
<template>
  <transition name="slide-down">
    <div class="lyrics" v-show="isShow">
      <div class="blur" :style="{backgroundImage:`url(${getPicUrl})`}"></div>
      <div class="content">
        <div class="back" @click="handleChangeOption({ showLyrics: !songOptions.showLyrics})">
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="main">
          <div class="disc" :class="{paused:!songOptions.play}">
            <img :src="getPicUrl" alt />
            <span class="mask"></span>
          </div>
          <div class="info" ref="box">
            <div class="name">
              <h3>{{ getName }}</h3>
              <div class="artists" v-if="getCurrent">
                <span>歌手：</span>
                {{ getCurrent | getArtists }}
                <span>专辑：</span>
                {{ getCurrent.al.name }}
              </div>
            </div>
            <div class="text">
              <div class="center" v-if="!getCurrent">享受生活，享受音乐 {{ songOptions.default.artists }}</div>
              <div v-else class="list" ref="list">
                <ul>
                  <li
                    v-for="(item,index) in songOptions.lyricsList"
                    :key="item.time"
                    :class="{ 'active': index === songOptions.lyricsIndex }"
                    :ref="`current${index}`"
                  >{{ item.words }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import * as TYPES from "@/store/types";

export default {
  name: "lyrics",
  components: {},
  data() {
    return {};
  },
  computed: {
    getName() {
      // 获取歌曲名
      if (this.getCurrent) {
        return this.getCurrent.name;
      }
      return this.songOptions.default.name;
    },
    getCurrent() {
      // 获取当前播放的内容
      return this.songList[this.songOptions.current];
    },
    getPicUrl() {
      // 获取歌曲图片
      return this.getCurrent
        ? this.getCurrent.al.picUrl
        : this.songOptions.default.picUrl;
    },
    ...mapState({
      isShow: state => state.detail.songOptions.showLyrics,
      songList: state => state.detail.songList,
      songOptions: state => state.detail.songOptions
    })
  },
  created() {},
  watch: {
    songList(newVal) {
      if (newVal.length) {
        this.handleGetLyrics();
      }
    },
    songOptions(newVal, oldVal) {
      if (newVal.current != oldVal.current) {
        this.handleGetLyrics();
      }
      if (newVal.audio) {
        const { lyricsList } = this.songOptions;
        for (let i = lyricsList.length - 2; i >= 0; i--) {
          if (newVal.audio.currentTime > lyricsList[i].time) {
            this[TYPES.MUTATIONS_SET_SONG_OPTIONS]({ lyricsIndex: i });
            break;
          }
        }
      }
      if (newVal.lyricsIndex != oldVal.lyricsIndex) {
        this.handleScroll();
      }
    }
  },
  methods: {
    handleScroll() {
      const name = "current" + this.songOptions.lyricsIndex;
      if (this.$refs[name]) {
        if (!this.$refs[name].length) return;
        const boxRef = this.$refs.box;
        const listRef = this.$refs.list;
        const liRef = this.$refs[name][0];
        listRef.scrollTop = liRef.offsetTop - boxRef.clientHeight / 2;
      }
    },
    handleGetLyrics() {
      if (this.getCurrent) {
        const id = this.getCurrent.id;
        this[TYPES.ACTIONS_GET_SONG_LYRICS]({ id });
      }
    },
    handleChangeOption(obj) {
      // 改变信息
      this[TYPES.MUTATIONS_SET_SONG_OPTIONS](obj);
    },
    ...mapMutations([TYPES.MUTATIONS_SET_SONG_OPTIONS]),
    ...mapActions([TYPES.ACTIONS_GET_SONG_LYRICS])
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
        animation: rotate 8s linear infinite;
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