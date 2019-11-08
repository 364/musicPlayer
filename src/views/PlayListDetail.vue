<!-- 歌单详情页 -->
<template>
  <div class="playlist_detail" v-if="Object.keys(playlist).length">
    <!-- 歌单介绍 -->
    <div class="des">
      <div class="coverImg" v-lazy:background-image="playlist.coverImgUrl"></div>
      <div class="info">
        <h2>{{ playlist.name }}</h2>
        <h4>
          <img :src="playlist.creator.avatarUrl" class="avatar" />
          <span>{{ playlist.creator.nickname }}</span>
          <span class="tags">{{ playlist.tags | getTags }}</span>
        </h4>
        <div
          class="count"
        >播放量：{{ playlist.playCount | playCount }} 创建时间：{{ playlist.createTime | formatTime }}</div>
        <div>
          <el-button size="mini" type="primary">
            <i class="el-icon-plus"></i> 播放全部
          </el-button>
          <el-button size="mini">
            <i class="el-icon-star-off"></i> 收藏
          </el-button>
          <el-button size="mini">
            <i class="el-icon-download"></i> 下载
          </el-button>
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="list">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="`歌曲(${playlist.trackCount})`" name="songlist">
          <song-list :tableData="playlist.tracks" />
        </el-tab-pane>
        <el-tab-pane :label="`评论(${playlist.commentCount})`" name="second">
          <comment type="playlist" @handleScrollTop="handleScrollTop" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import * as TYPES from "@/store/types";
import SongList from "@/components/SongList";
import Comment from "@/components/Comment";

export default {
  name: "",
  components: { SongList, Comment },
  data() {
    return {
      activeName: "songlist"
    };
  },
  computed: {
    ...mapState({
      playlist: state => state.detail.playlist
    })
  },
  created() {
    this.handleGetData();
  },
  watch: {},
  methods: {
    handleGetData() {
      const id = this.$route.params.id;
      if (!id) {
        this.$router.go(-1);
      }
      this[TYPES.ACTIONS_GET_PLAYLIST_DETAIL]({ id });
    },
    handleClick(tab) {
      this.handleScrollTop();
    },
    handleScrollTop() {
      const el = this.$el.querySelector(".el-tabs__content");
      setTimeout(function animation() {
        if (el.scrollTop > 0) {
          setTimeout(() => {
            const scrollStep = el.scrollTop - 30;
            el.scrollTop = scrollStep;
            animation();
          }, 1);
        }
      }, 1);
    },
    ...mapActions([TYPES.ACTIONS_GET_PLAYLIST_DETAIL])
  },
  activated() {
    this.activeName = "songlist";
    this.handleGetData();
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.playlist_detail {
  height: calc(100% - @footer-height);
  .des {
    display: flex;
    padding:20px;
    .coverImg {
      width: 150px;
      height: 150px;
      margin-right: 20px;
      background-size: cover;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > * {
        margin: 0;
        font-weight: 400;
      }
      .tags {
        margin-left: 20px;
      }
      .avatar {
        width: 20px;
        border-radius: 50%;
        overflow: hidden;
      }
      .count {
        color: #999;
      }
    }
  }
  .list {
    padding-top: 10px;
    height: calc(100% - 150px);
    overflow: hidden;
    /deep/ .el-tabs {
      height: 100%;
      > div {
        padding: 0 20px;
      }
      .el-tabs__content {
        overflow-y: auto;
        height: calc(100% - 100px);
      }
    }
  }
}
</style>