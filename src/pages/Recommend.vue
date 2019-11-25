<!-- 推荐 -->
<template>
  <div class="recommend">
    <!-- banner -->
    <banner :carousel="carousel" :banners="banners" v-show="banners.length" />
    <!-- 推荐歌单 -->
    <div class="songList playList" v-show="playlist.length">
      <div class="title">
        <div>
          <h2>推荐歌单</h2>
          <h3>RECOMMEND THE PLAYLIST</h3>
        </div>
        <router-link to="/home/playlist" class="more">
          更多
          <i class="el-icon-d-arrow-right"></i>
        </router-link>
      </div>
      <ul>
        <li
          v-for="(item,index) in playlist"
          :key="item.id"
          @mouseover="isHover = 'playlist'+index"
          @mouseleave="isHover = null"
          @click="$router.push(`/playlist/${item.id}`)"
        >
          <div class="img">
            <img v-lazy="item.picUrl" />
            <span class="count">
              <i class="el-icon-headset"></i>
              {{ item.playCount | playCount}}
            </span>
            <transition name="fade">
              <div class="mask" v-show="isHover == 'playlist'+index">
                <i class="el-icon-video-play"></i>
              </div>
            </transition>
          </div>
          <div class="name">{{ item.name }}</div>
        </li>
      </ul>
    </div>
    <!-- 推荐mv -->
    <div class="songList mvList" v-show="mvList.length">
      <div class="title">
        <div>
          <h2>推荐MV</h2>
          <h3>RECOMMEND THE MV</h3>
        </div>
      </div>
      <ul>
        <li
          v-for="(item,index) in mvList"
          :key="item.id"
          @mouseover="isHover = 'mv'+index"
          @mouseleave="isHover = null"
          @click="$router.push(`/mv/${item.id}`)"
        >
          <div class="img">
            <img v-lazy="item.picUrl" />
            <span class="count">
              <i class="el-icon-video-camera"></i>
              {{ item.playCount | playCount}}
            </span>
            <transition name="fade">
              <div class="mask" v-show="isHover == 'mv'+index">
                <i class="el-icon-video-play"></i>
              </div>
            </transition>
          </div>
          <div class="name">{{ item.name }}</div>
        </li>
      </ul>
    </div>
    <!-- 最新音乐 -->
    <div class="musicList" v-show="songList.length">
      <div class="title">
        <div>
          <h2>最新音乐</h2>
          <h3>THE LATEST MUSIC</h3>
        </div>
      </div>
      <ul>
        <li
          v-for="(item,index) in songList"
          :key="item.id"
          @dblclick="handleSong(index)"
          @mouseover="isHover = 'music'+index"
          @mouseleave="isHover = null"
        >
          <div class="img">
            <img v-lazy="item.song.album.picUrl" />
            <transition name="fade">
              <div class="mask" v-show="isHover == 'music'+index">
                <i class="el-icon-video-play"></i>
              </div>
            </transition>
          </div>
          <div class="album">
            <h5>{{ getSongName(item.name,item.song.album.alias) }}</h5>
            <div class="artists">{{ item.song.album | getArtists }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import * as TYPES from "@/store/types";
import Banner from "@/components/Banner";
export default {
  name: "recommend",
  components: {
    Banner
  },
  data() {
    return {
      isHover: null,
      carousel: {
        height: "200px",
        interval: 5000,
        arrow: "hover",
        loop: true,
        type: "card"
      },
      param: {
        playList: { limit: 6 },
        songList: { limit: 3 },
        mvList: { limit: 2 }
      }
    };
  },
  computed: {
    ...mapState({
      banners: state => state.home.banners,
      playlist: state => state.home.playlist,
      songList: state => state.home.songList,
      mvList: state => state.home.mvList,
      musicList: state => state.detail.songList,
      songOptions: state => state.detail.songOptions
    })
  },
  created() {
    // banner
    this[TYPES.ACTIONS_GET_BANNER]();
    // 推荐歌单
    this[TYPES.ACTIONS_GET_PLAYLIST](this.param.playList);
    // 推荐mv
    this[TYPES.ACTIONS_GET_MV]();
    // 最新音乐
    this[TYPES.ACTIONS_GET_NEWSONG]();
  },
  methods: {
    handleSong(idx) {
      // 最新音乐播放 
      const id = this.songList.map(item => item.id);
      this[TYPES.MUTATIONS_SET_SONG_OPTIONS]({ play: false, current: idx });
      this[TYPES.ACTIONS_GET_SONG_DETAIL]({ id }).then(res => {
        this[TYPES.MUTATIONS_GET_SONG_DETAIL](res);
        setTimeout(() => {
          this[TYPES.MUTATIONS_SET_SONG_OPTIONS]({ play: true });
        }, 200);
      });
    },
    getSongName(name, alias) {
      // 获取歌曲名
      return name + alias.join("");
    },
    ...mapMutations([
      TYPES.MUTATIONS_SET_SONG_OPTIONS,
      TYPES.MUTATIONS_GET_SONG_DETAIL
    ]),
    ...mapActions([
      TYPES.ACTIONS_GET_BANNER,
      TYPES.ACTIONS_GET_PLAYLIST,
      TYPES.ACTIONS_GET_NEWSONG,
      TYPES.ACTIONS_GET_MV,
      TYPES.ACTIONS_GET_SONG_DETAIL
    ])
  }
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.playIcon {
  position: absolute;
  width: 100%;
  height: 100%;
  background: fade(#000, 50%);
  top: 0;
  left: 0;
  color: fade(#fff, 70%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
}
.recommend {
  padding: 0 20px;
  overflow-y: auto;
  height: @auto-height;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .more {
      color: #999;
      &:hover {
        color: #888;
      }
    }
    h3 {
      font-weight: 400;
      margin: 10px 0;
    }
    h2 {
      margin: 0;
    }
  }
  .songList {
    margin-bottom: 30px;
    overflow: hidden;
    ul {
      display: flex;
      li {
        flex: 1;
        margin: 0 1%;
        cursor: pointer;
        font-size: 13px;
        &:first-child {
          margin-left: 0;
        }
        .img {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          width: 100%;
          box-shadow: 0 0 15px fade(#000, 10%);
          .count {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 5px 10px;
            box-sizing: border-box;
            color: #fff;
            font-size: 12px;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
          }
          img {
            width: 100%;
          }
          .mask {
            &:extend(.playIcon);
          }
        }
        &:last-child {
          margin-right: 0;
        }
        .name {
          margin-top: 10px;
          line-height: 20px;
        }
      }
    }
  }
  .musicList {
    ul {
      display: grid;
      justify-content: space-between;
      grid-template-columns: repeat(3, 32%);
      li {
        display: inline-block;
        box-shadow: 0 0 15px fade(#000, 5%);
        display: flex;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 5px;
        margin-bottom: 20px;
        overflow: hidden;
        background: fade(#fff, 90%);
        &:hover {
          box-shadow: 0 0 15px fade(#000, 12%);
        }
        .img {
          position: relative;
          width: 20%;
          img {
            width: 100%;
          }
          .mask {
            &:extend(.playIcon);
            color: fade(#fff, 80%);
            font-size: 30px;
          }
        }
        .album {
          display: flex;
          justify-content: center;
          flex-direction: column;
          margin-left: 10px;
          flex: 1;
          @media screen and (max-width: 1500px) {
            > * {
              overflow: hidden;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              display: -webkit-box;
            }
          }
          h5 {
            margin: 0;
          }
          .artists {
            margin-top: 10px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>