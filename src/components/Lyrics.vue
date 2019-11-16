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
          <div class="disc">
            <img :src="getPicUrl" alt />
            <span class="mask"></span>
          </div>
          <div class="info">
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
              <div class="center" v-if="!getCurrent">{{ songOptions.default.artists }} 享受生活，享受音乐</div>
              <ul v-else>
                <li v-for="item in songOptions.lyricsList" :key="item"></li>
              </ul>
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
    songOptions(newVal){
      if(newVal.play){
        this.handleGetLyrics()
      }
    }
  },
  methods: {
    handleGetLyrics(){
      
    },
    handleChangeOption(obj) {
      // 改变信息
      this[TYPES.MUTATIONS_SET_SONG_OPTIONS](obj);
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
          h3 {
            font-weight: 400;
            font-size: 20px;
          }
          .artists {
            span {
              color: #999;
              &:last-child {
                margin-left: 10px;
              }
            }
          }
        }
        .text {
          height: 85%;
          font-size: 16px;
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