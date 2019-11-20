<!-- 歌单详情页 -->
<template>
  <div class="playlist_detail" v-if="Object.keys(playDetail).length">
    <!-- 歌单介绍 -->
    <div class="des">
      <div class="coverImg" v-lazy:background-image="playDetail.coverImgUrl"></div>
      <div class="info">
        <h2>{{ playDetail.name }}</h2>
        <h4>
          <img :src="playDetail.creator.avatarUrl" class="avatar" />
          <span>{{ playDetail.creator.nickname }}</span>
          <span class="tags">{{ playDetail.tags | getTags }}</span>
        </h4>
        <div
          class="count"
        >播放量：{{ playDetail.playCount | playCount }} 创建时间：{{ playDetail.createTime | formatTime }}</div>
        <div>
          <el-button size="mini" type="primary" @click="handleSong(playDetail.trackIds)">
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
        <el-tab-pane :label="`歌曲(${playDetail.trackCount})`" name="songlist">
          <song-list :tableData="playDetail.tracks" />
        </el-tab-pane>
        <el-tab-pane :label="`评论(${playDetail.commentCount})`" name="second">
          <comment type="playlist" @handleScrollTop="handleScrollTop" :id="$route.params.id"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
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
      playDetail: state => state.detail.playDetail
    })
  },
  created() {
    this.handleGetData();
  },
  watch: {},
  methods: {
    handleSong(ids) {
      const id = ids.map(item => item.id);
      this[TYPES.MUTATIONS_SET_SONG_OPTIONS]({ play: false });
      this[TYPES.MUTATIONS_INIT_SONG_LIST]();
      this[TYPES.ACTIONS_GET_SONG_DETAIL]({ id }).then(res => {
        this[TYPES.MUTATIONS_GET_SONG_DETAIL](res);
        this[TYPES.MUTATIONS_SET_SONG_ORDER]()
        setTimeout(() => {
          this[TYPES.MUTATIONS_SET_SONG_OPTIONS]({ play: true });
        }, 200);
      });
    },
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
    ...mapMutations([
      TYPES.MUTATIONS_INIT_SONG_LIST,
      TYPES.MUTATIONS_GET_SONG_DETAIL,
      TYPES.MUTATIONS_SET_SONG_OPTIONS,
      TYPES.MUTATIONS_SET_SONG_ORDER,
    ]),
    ...mapActions([
      TYPES.ACTIONS_GET_PLAYLIST_DETAIL,
      TYPES.ACTIONS_GET_SONG_DETAIL
    ])
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
    padding: 20px;
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