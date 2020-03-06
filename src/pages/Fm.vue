<!-- 私人fm -->
<template>
  <div class="fm">
    <div v-if="!isLogin" class="empty">
      <img v-lazy="require('@/assets/images/lock.gif')" alt />
      <div>
        <h3>登录解锁更多功能</h3>
        <el-button type="primary" plain @click="handleShowLogin">立即登录</el-button>
      </div>
    </div>
    <div v-else class="main">
      <div class="song">
        <div class="disc" :class="{'paused':!playState}">
          <img :src="getPicUrl" alt />
          <span class="mask"></span>
        </div>
        <!-- 歌曲信息 -->
        <div class="name">
          <h3>{{ getName }}</h3>
          <div class="artists">
            <span>歌手：</span>
            {{ getArtists }}
            <span>专辑：</span>
            {{ getAlbum }}
          </div>
        </div>
        <!-- 歌词 -->
        <!-- <div class="text">
          <div class="center" v-if="lyrics.noLyric">{{ lyrics.noLyricText }}</div>
          <ul ref="list" v-if="lyrics.list.length" @mousedown="handleStart" @mouseup="handleEnd" @mousemove="handleMove">
            <li v-for="(item,index) in lyrics.list" :key="index" :class="{ 'active': index === lyrics.index }" :ref="`current${index}`">
              {{ item.words }}
            </li>
          </ul>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import * as TYPES from "@/store/types";
import { fm } from "@/api";

export default {
  name: "fm",
  components: {},
  data() {
    return {
      playState: false,
      currentSong: {}
    };
  },
  computed: {
    getName() {
      // 获取歌曲名
      return this.currentSong && this.currentSong.name;
    },
    getArtists() {
      // 获取歌手
      return this.currentSong && this.$root.getArtists(this.currentSong);
    },
    getPicUrl() {
      // 获取歌曲图片
      return this.currentSong && this.currentSong.album.picUrl;
    },
    getAlbum() {
      // 获取专辑
      return this.currentSong && this.currentSong.album.name;
    },
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },
  created() {
  },
  watch: {
    isLogin(val) {
      if (val) {
        this.getData();
      }
    }
  },
  methods: {
    async getData() {
      let { data } = await fm();
      if (data && data.length) {
        this.currentSong = data.shift();
      }
    },
    handleShowLogin() {
      this[TYPES.MUTATIONS_SET_SHOW_LOGIN](true);
    },
    ...mapMutations([TYPES.MUTATIONS_SET_SHOW_LOGIN])
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
.fm {
  height: calc(100% - @footer-height);
  > div {
    padding: 20px;
  }
  .empty {
    text-align: center;
    height: 90%;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 30%;
    }
  }
  .main {
    .song {
      display: flex;
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
              color: gray;
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
        animation: rotate 20s linear infinite;
        animation-play-state: running;
        &.paused {
          animation-play-state: paused;
        }
        img {
          width: 80%;
        }
      }
    }
  }
}
</style>