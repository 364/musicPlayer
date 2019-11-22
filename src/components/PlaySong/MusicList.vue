<!-- 播放列表 -->
<template>
  <transition name="slide">
    <div class="music-list" v-show="isShow">
      <div v-if="songList.length" class="main">
        <h3 class="title">播放列表</h3>
        <div class="operation">
          <span>{{ songList.length }}首歌曲</span>
          <div>
            <span>
              <i class="el-icon-star-off"></i>收藏
            </span>
            <span @click="handleClear">
              <i class="el-icon-delete"></i>清空
            </span>
          </div>
        </div>
        <ul class="list" ref="list">
          <li
            v-for="(item,index) in songList"
            :key="item.id"
            :class="[{'active':index === current}]"
            :ref="`current${index}`"
          >
            <i class="el-icon-caret-right" v-if="index === current"></i>
            <img :src="item.al.picUrl" :class="{ 'paused': !playState }" />
            <div class="song">
              <div class="name">
                <span>{{ item.name }}</span>
                <span class="time">{{ item.dt | formatTime('mm:ss') }}</span>
              </div>
              <div class="info">
                <span class="artists">{{ item | getArtists }}</span>
                <div class="icon">
                  <i class="iconfont icon-heart2"></i>
                  <i class="el-icon-delete" @click="handleDelete(item.id)"></i>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 空列表 -->
      <div class="empty" v-else>
        <img src="@/assets/images/empty.jpg" alt="empty" />
        <span>去添加些歌曲吧~</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import * as TYPES from "@/store/types";

export default {
  name: "music-list",
  components: {},
  props: {
    current: {
      type: Number
    },
    isShow: {
      type: Boolean
    },
    playState: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      songOptions: state => state.detail.songOptions,
      songList: state => state.detail.songList,
    })
  },
  created() {
    window.addEventListener("click", this.handleClose);
  },
  watch: {
    isShow(val) {
      if (val) {
        this.handleScroll();
      }
    },
    current(val, newVal) {
      if (val != newVal) {
        this.$nextTick(() => {
          this.handleScroll();
        });
      }
    }
  },
  methods: {
    handleScroll() {
      // 滚动到当前播放的歌曲
      const name = "current" + this.current;
      if (this.$refs[name]) {
        if (!this.$refs[name].length) return;
        const listRef = this.$refs.list;
        const liRef = this.$refs[name][0];
        // console.log(this.$refs[name][0].offsetTop)
        listRef.scrollTop = liRef.offsetTop - listRef.clientHeight / 2;
      }
    },
    handleClose(e) {
      // 点击遮罩关闭
      if (this.isShow) {
        const isInclude = e.path.some(item => item.className == "music-list");
        const isLayout = e.path.some(item => item.className == "layout");
        const isPlayBar = e.path.some(item => item.className == "player-bar");
        if (!isInclude && !isPlayBar && isLayout) {
          this.$emit("handleToggleShow", "showList");
        }
      }
    },
    handleClear() {
      // 清空
      this[TYPES.MUTATIONS_INIT_SONG_LIST]();
    },
    handleDelete(id) {
      // 删除一首歌曲
      let num = -1;
      for (let i = 0; i < this.songList.length; i++) {
        if (this.songList[i].id == id) {
          num = i;
          break;
        }
      }
      let res = this.songList;
      res.splice(num, 1);
      this[TYPES.MUTATIONS_GET_SONG_DETAIL](res);
      // 改变当前歌曲索引
      if (num == this.songOptions.current) {
        this.handleChangeOption({ play: false });
        this[TYPES.MUTATIONS_SET_SONG_ORDER](num);
      }
      if (num < this.songOptions.current) {
        let current = this.songOptions.current - 1;
        this.handleChangeOption({ current });
      }
    },
    handleChangeOption(obj) {
      // 改变信息
      this[TYPES.MUTATIONS_SET_SONG_OPTIONS](obj);
    },
    ...mapMutations([
      TYPES.MUTATIONS_INIT_SONG_LIST,
      TYPES.MUTATIONS_SET_SONG_OPTIONS,
      TYPES.MUTATIONS_GET_SONG_DETAIL,
      TYPES.MUTATIONS_SET_SONG_ORDER
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
.music-list {
  background: #fff;
  height: calc(100% - @footer-height);
  position: absolute;
  right: 0;
  top: 0;
  width: @music-list-width;
  border-radius: 0 10px 0 0;
  z-index: 100;
  box-shadow: -2px 0px 12px 0px rgba(0, 0, 0, 0.2);
  .main {
    height: 100%;
    overflow: hidden;
    .title,
    .operation {
      margin: 0;
      background: #fcfcfc;
      padding: 15px 20px 15px;
    }
    .operation {
      padding-top: 0px;
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f6f6f6;
      > div {
        span {
          cursor: pointer;
          padding-left: 10px;
        }
      }
    }
    .list {
      height: calc(100% - 80px);
      overflow-y: auto;
      transition: all 0.3s;
      li {
        padding: 10px 20px;
        display: flex;
        align-items: center;
        position: relative;
        > i {
          position: absolute;
          left: 3px;
        }
        &.active {
          background: @theme-color-1!important;
          span,
          i {
            color: @theme-color!important;
          }
          img {
            animation: rotate 8s linear infinite;
            animation-play-state: running;
            &.paused {
              animation-play-state: paused;
            }
          }
        }
        &:nth-child(even) {
          background: #fcfcfc;
          // border-bottom: 1px solid #f1f1f1;
        }
        &:hover {
          background: #fcfcfc;
          cursor: pointer;
        }
        img {
          width: 30px;
          height: 30px;
          border-radius: 50px;
        }
        .song {
          padding-left: 10px;
          font-size: 12px;
          width: 100%;
          .name {
            font-size: 14px;
            margin-bottom: 5px;
            .time {
              font-size: 12px;
              color: #999;
            }
          }
          .name,
          .info {
            display: flex;
            justify-content: space-between;
          }
          .info {
            color: #777;
            .icon {
              font-size: 13px;
            }
          }
        }
      }
    }
  }
  .empty {
    width: 80%;
    text-align: center;
    margin: 0 auto;
    color: #999;
    height: 100%;
    padding-top: 50%;
    box-sizing: border-box;
    img {
      width: 100%;
    }
  }
}
</style>