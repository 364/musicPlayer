<!-- 播放歌曲 -->
<template>
  <div class="play-song">
    <!-- 播放列表 -->
    <player-bar
      :info="getInfo"
      :playState="songOptions.play"
      :songTime="songTime"
      :volume="volume"
      :order="songOptions.order"
      :songList="songList"
      :orderInfo="orderInfo"
      @handleChangeOption="handleChangeOption"
      @handleChangeSong="handleChangeSong"
      @handleChange="handleChange"
      @handleToggleShow="handleToggleShow"
      @handleChangeVol="handleChangeVol"
    />
    <Lyrics
      ref="lyricPage"
      :info="getInfo"
      :isShow="showLyrics"
      :showComment="showComment"
      :lyrics="lyrics"
      :playState="songOptions.play"
      :songTime="songTime"
      :volume="volume"
      :order="songOptions.order"
      :songList="songList"
      :orderInfo="orderInfo"
      :comment="comment"
      @handleToggleShow="handleToggleShow"
      @handleChangeOption="handleChangeOption"
      @handleChangeSong="handleChangeSong"
      @handleChange="handleChange"
      @handleChangeVol="handleChangeVol"
      @handleChangeComment="handleChangeComment"
    />
    <music-list
      :isShow="showList"
      :current="songOptions.current"
      :playState="songOptions.play"
      @handleToggleShow="handleToggleShow"
    />
    <!-- @canplay="handlePlaying" -->
    <audio :src="url" crossorigin="anonymous" preload="auto" ref="audio" @ended="handleEnded"></audio>
  </div>
</template>

<script>
import PlayerBar from "@/components/PlaySong/PlayerBar";
import MusicList from "@/components/PlaySong/MusicList";
import Lyrics from "@/components/PlaySong/Lyrics";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import * as TYPES from "@/store/types";
import moment from "moment";
import { Message } from "element-ui";
import { checkUrl, songUrl, songLyrics, musicComment } from "@/api";

export default {
  name: "play-song",
  components: {
    Lyrics,
    PlayerBar,
    MusicList
  },
  data() {
    return {
      url: "",
      showList: false,
      showComment: false,
      showLyrics: false,
      isEnd: false,
      lyrics: {
        list: [],
        index: 0,
        noLyric: true,
        noLyricText: "享受音乐，享受生活"
      },
      default: {
        name: "DO RE MI FA SO LA XI",
        artists: "享受音乐，享受生活",
        picUrl: require("@/assets/images/artists.jpg"),
        alName: "未知"
      },
      songTime: {
        currentTime: "00:00",
        totalTime: "00:00",
        width: "0%"
      },
      volume: {
        default: "75%",
        width: "75%",
        muted: false
      },
      orderInfo: [
        { class: "icon-unorderedlist", name: "顺序播放" },
        { class: "icon-xunhuanbofang", name: "列表循环" },
        { class: "icon-danquxunhuan", name: "单曲循环" },
        { class: "icon-suijibofang", name: "随机播放" }
      ],
      comment: {
        type: 0,
        page: 1,
        pageSize: 20
      }
    };
  },
  computed: {
    ...mapState({
      songList: state => state.detail.songList,
      songOptions: state => state.detail.songOptions
    }),
    ...mapGetters({
      currentSong: TYPES.GETTERS_GET_CURRENT_SONG
    }),
    getInfo() {
      return {
        name: this.getName,
        artists: this.getArtists,
        picUrl: this.getPicUrl,
        album: this.getAlbum,
        current: this.currentSong || {}
      };
    },
    getName() {
      // 获取歌曲名
      return this.currentSong ? this.currentSong.name : this.default.name;
    },
    getArtists() {
      // 获取歌手
      return this.currentSong
        ? this.$root.getArtists(this.currentSong)
        : this.default.artists;
    },
    getPicUrl() {
      // 获取歌曲图片
      return this.currentSong
        ? this.currentSong.al.picUrl
        : this.default.picUrl;
    },
    getAlbum() {
      // 获取歌曲图片
      return this.currentSong ? this.currentSong.al.name : this.default.alName;
    }
  },
  watch: {
    currentSong(val, oldVal = {}) {
      if (val) {
        if (val.id == oldVal.id) {
          if (this.isEnd && !this.songOptions.songEnd) {
            this.$refs.audio.currentTime = 0;
            setTimeout(() => {
              this.handleChangeOption({ play: true });
            }, 200);
          }
        } else {
          // 检查歌曲
          this.comment.page = 1
          this.handleCheckSong(val.id);
        }
      }
    },
    songOptions(val) {
      if (this.$refs.audio) {
        val.play ? this.handlePlay() : this.handlePause();
      }
    }
  },
  created() {},
  methods: {
    ...mapMutations([
      TYPES.MUTATIONS_SET_SONG_OPTIONS,
      TYPES.MUTATIONS_GET_SONG_DETAIL,
      TYPES.MUTATIONS_SET_SONG_ORDER
    ]),
    handleCheckSong(id) {
      // 检查歌曲是否可以播放
      checkUrl({ id })
        .then(res => {
          if (res.success) {
            this.handleTotalTime();
            this.handleGetSongUrl(id);
            this.handleGetComment(id);
          } else {
            // 下一首歌曲
            this.handleNotUrl(id, res.message);
          }
        })
        .catch(err => {
          console.log("checkUrl err", err);
        });
    },
    handleChangeComment(obj) {
      // 评论改变
      this.comment = Object.assign({}, this.comment, obj);
      this.handleGetComment(this.currentSong.id);
    },
    handleGetComment(id) {
      // 获取评论
      const { type, page, pageSize } = this.comment;
      const params = {
        id,
        limit: pageSize,
        offset: (page - 1) * pageSize
      };
      musicComment(params).then(res => {
        this.comment = Object.assign({}, res, {
          type,
          page,
          pageSize
        });
      });
    },
    handleTotalTime() {
      // 总时长
      this.songTime.totalTime = this.$root.formatTime(
        this.currentSong.dt,
        "mm:ss"
      );
    },
    handleGetSongUrl(id) {
      // 获取歌曲url
      songUrl({ id }).then(res => {
        const { data } = res;
        if (data.length) {
          if (data[0].code == 200) {
            this.url = data[0]["url"];
            this.$refs.audio.addEventListener("timeupdate", this.handlePlaying);
            this.handleLyrics(id);
            setTimeout(() => {
              this.handlePlay();
              this.handleChangeOption({ play: true });
            }, 0);
          } else {
            // 下一首歌曲
            this.handleNotUrl(id, "该歌曲不能播放，自动播放下一首");
          }
        }
      });
    },
    handleNotUrl(id, msg) {
      // 没有版权
      let list = [].concat(this.songList);
      for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
          list.splice(i, 1);
          break;
        }
      }
      Message.error(msg);
      this[TYPES.MUTATIONS_GET_SONG_DETAIL](list);
      this.handleChangeSong(1);
    },
    handlePlaying() {
      // 播放中
      const { currentTime, duration } = this.$refs.audio;
      let value = currentTime / duration;
      this.songTime = Object.assign({}, this.songTime, {
        currentTime: this.$root.formatTime(currentTime * 1000, "mm:ss"),
        width: value * 100 + "%"
      });
      for (let i = this.lyrics.list.length - 1; i >= 0; i--) {
        if (currentTime > this.lyrics.list[i].time) {
          this.lyrics.index = i;
          this.$refs.lyricPage.handleScroll(i);
          break;
        }
      }
      if (this.isEnd) {
        this.isEnd = false;
      }
    },
    handleLyrics(id) {
      // 获取歌词
      songLyrics({ id }).then(res => {
        const lrc = res.lrc.lyric;
        if (res.nolyric) {
          // 当前歌曲没有歌词
          this.lyrics = Object.assign({}, this.lyrics, {
            list: [],
            noLyric: true,
            noLyricText: "纯音乐，请欣赏"
          });
          return;
        }
        if (!lrc.trim()) {
          // 歌词为空
          this.lyrics = Object.assign({}, this.lyrics, {
            list: [],
            noLyric: true,
            noLyricText: "暂时没有歌词"
          });
          return;
        }
        this.lyrics.noLyric = false;
        this.lyrics.list = this.$root.getLyrics(lrc);
      });
    },
    handleEnded(e) {
      // 播放结束
      this.isEnd = true;
      this.handleChangeOption({ play: false });
      this.handleChangeSong(1);
    },
    handlePlay() {
      // 播放
      this.$refs.audio.play();
    },
    handlePause() {
      // 暂停
      this.$refs.audio.pause();
    },
    handleChangeOption(obj) {
      // 改变信息
      this[TYPES.MUTATIONS_SET_SONG_OPTIONS](obj);
    },
    handleChangeSong(num) {
      // 改变歌曲
      this.isEnd = true;
      this.handleChangeOption({ play: false });
      this[TYPES.MUTATIONS_SET_SONG_ORDER](num);
    },
    handleChangeVol(rate) {
      // 改变音量
      this.volume.width = parseInt(rate * 100) + "%";
      this.volume.muted = !rate;
      if (this.$refs.audio) {
        this.$refs.audio.volume = rate;
      }
    },
    handleChange(rate, tag) {
      // 改变进度条
      if (tag === "volume") {
        this.handleChangeVol(rate);
        this.volume.default = !rate ? "75%" : parseInt(rate * 100) + "%";
      } else {
        if (this.$refs.audio) {
          const { duration } = this.$refs.audio;
          this.$refs.audio.currentTime = duration * rate;
          this.handlePlaying();
        }
      }
    },
    handleToggleShow(key) {
      this[key] = !this[key];
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
.playsong {
  position: relative;
}
</style>