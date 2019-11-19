<!--  -->
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
            <span>
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
                  <i class="el-icon-delete"></i>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="empty" v-else>
        <img src="@/assets/images/empty.jpg" alt="empty" />
        <span>去添加些歌曲吧~</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "",
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
    },
    songList: {
      type: Array
    }
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    window.addEventListener("click", this.handleClose);
  },
  watch: {
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
      const name = "current" + this.current;
      if (this.$refs[name]) {
        if (!this.$refs[name].length) return;
        const listRef = this.$refs.list;
        const liRef = this.$refs[name][0];
        listRef.scrollTop = liRef.offsetTop - listRef.clientHeight / 2;
      }
    },
    handleClose(e) {
      if (this.isShow) {
        const isInclude = e.path.some(item => item.className == "music-list");
        const isLayout = e.path.some(item => item.className == "layout");
        const isPlayBar = e.path.some(item => item.className == "player-bar");
        if (!isInclude && !isPlayBar && isLayout) {
          this.$emit("handleToggleShow", "showList");
        }
      }
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
    width: 60%;
    text-align: center;
    margin: 50% auto;
    color: #999;
    img {
      width: 100%;
    }
  }
}
</style>