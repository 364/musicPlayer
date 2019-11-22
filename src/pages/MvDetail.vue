<!-- mv详情 -->
<template>
  <div class="mv_detail" ref="box">
    <div class="main" v-if="Object.keys(mvDetail).length">
      <!-- mv信息 -->
      <div class="title">
        <h2 class="name">
          {{ mvDetail.name }}
          <span>{{ mvDetail | getArtists }}</span>
        </h2>
        <div class="time">
          <span>发布时间：{{ mvDetail.publishTime }}</span>
          <span>播放次数：{{mvDetail.playCount | playCount }}次</span>
        </div>
      </div>
      <video-player ref="videoPlayer" class="vjs-custom-skin" :options="playerOptions" @play="handlePlay"/>
      <!-- mv详情 -->
      <div v-show="mvDetail.desc">
        <h3>简介：</h3>
        <div class="desc">{{ mvDetail.desc }}</div>
      </div>
      <!-- mv评论 -->
      <comment :comment="comment" @handleChangePage="handleChangePage" ref="comment" />
    </div>
  </div>
  <!--
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @waiting="onPlayerWaiting($event)"
      @playing="onPlayerPlaying($event)"
      @timeupdate="onPlayerTimeupdate($event)"
      @canplay="onPlayerCanplay($event)"
      @canplaythrough="onPlayerCanplaythrough($event)"
      @ready="playerReadied"
      @statechanged="playerStateChanged($event)"
  -->
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import { mapActions, mapState, mapMutations } from "vuex";
import * as TYPES from "@/store/types";
import Comment from "@/components/Comment";
import { mvComment } from "@/api";

export default {
  name: "mv-detail",
  components: { videoPlayer, Comment },
  data() {
    return {
      activeName: "comment",
      comment: {
        type: 1,
        page: 1,
        pageSize: 20
      },
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        autoplay: false,
        controls: true,
        sourceOrder: true,
        muted: false,
        loop: false,
        preload: "auto", //页面加载后载入视频 auto自动寻找时机
        language: "zh-CN",
        aspectRatio: "16:9",
        fluid: true, //将按比例缩放以适应
        // techOrder: ["flash", "html5"],
        // flash: { hls: { withCredentials: true } },
        // html5: { hls: { withCredentials: true } },
        sources: [
          {
            type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "" //url地址
          }
        ],
        poster: "",
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          // timeDivider: true, //时间分割线
          currentTimeDisplay: true,
          durationDisplay: true, //总时间
          remainingTimeDisplay: false, //进度条
          fullscreenToggle: true, //全屏按钮
          volumePanel: {
            inline: false,
            vertical: true, //竖着的音量条
            volume: 0.7
          }
        }
      }
    };
  },
  computed: {
    player() {
      // 初始化播放
      return this.$refs.videoPlayer.player;
    },
    ...mapState({
      mvDetail: state => state.detail.mvDetail
    })
  },
  created() {
    this.handleGetData();
    this.handleGetComment();
  },
  watch: {
    mvDetail(newVal) {
      if (Object.keys(newVal).length) {
        this.playerOptions.sources[0].src = newVal.brs["720"];
        this.playerOptions.poster = newVal.cover;
      }
    }
  },
  methods: {
    handlePlay(e){
      this[TYPES.MUTATIONS_SET_SONG_OPTIONS]({ play:false });
    },
    handleChangePage(obj) {
      // 评论改变
      this.comment = Object.assign({}, this.comment, obj);
      this.handleGetComment();
      this.handleScrollTop();
    },
    handleScrollTop() {
      // 评论翻页滚动
      const el = this.$refs.box;
      const pos = this.$refs.comment.$el.offsetTop;
      this.$root.scrollTop(el, pos);
    },
    handleGetComment() {
      // 获取评论
      const id = this.$route.params.id;
      const { type, page, pageSize } = this.comment;
      const params = {
        id,
        limit: pageSize,
        offset: (page - 1) * pageSize
      };
      mvComment(params).then(res => {
        this.comment = Object.assign({}, res, {
          type,
          page,
          pageSize
        });
      });
    },
    handleGetData() {
      // 获取mv数据
      const id = this.$route.params.id;
      if (!id) {
        this.$router.go(-1);
        return;
      }
      this[TYPES.ACTIONS_GET_MV_DETAIL]({ mvid: id }).then(() => {
        this.player;
      });
    },
    ...mapMutations([TYPES.MUTATIONS_SET_SONG_OPTIONS]),
    ...mapActions([TYPES.ACTIONS_GET_MV_DETAIL])
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {
    this.handleGetData();
    this.handleGetComment();
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.mv_detail {
  padding: 20px;
  height: calc(100% - @footer-height - @avator-size);
  overflow-y: auto;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      span {
        font-size: 14px;
        color: #999;
        margin-left: 10px;
      }
    }
    .time {
      span {
        margin-left: 10px;
        color: #999;
      }
    }
  }
  .desc {
    color: #999;
    font-size: 12px;
    line-height: 22px;
  }
}
</style>