<!-- 排行榜详情 -->
<template>
  <div class="rank_detail" v-if="Object.keys(rankDetail).length">
    <!-- 歌单介绍 -->
    <div class="des">
      <div class="coverImg" v-lazy:background-image="rankDetail.coverImgUrl"></div>
      <div class="info">
        <h2>{{ rankDetail.name }}</h2>
        <h4>
          <img :src="rankDetail.creator.avatarUrl" class="avatar" />
          <span>{{ rankDetail.creator.nickname }}</span>
          <span class="tags">{{ rankDetail.tags | getTags }}</span>
        </h4>
        <div
          class="count"
        >播放量：{{ rankDetail.playCount | playCount(-1) }} 最新更新：{{ rankDetail.updateTime | formatTime('MM月DD日') }}</div>
        <div>
          <el-button size="mini" type="primary" @click="handleSong(rankDetail.trackIds)">
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
      <el-tabs v-model="activeName" @tab-click="handleScrollTop">
        <el-tab-pane :label="`歌曲(${rankDetail.trackCount})`" name="songlist">
          <song-list :tableData="rankDetail.tracks" />
        </el-tab-pane>
        <el-tab-pane :label="`评论(${rankDetail.commentCount})`" name="second">
          <comment :comment="comment" @handleChangePage="handleChangePage" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { toplist } from "@/api";
import { mapActions, mapState, mapMutations } from "vuex";
import * as TYPES from "@/store/types";
import SongList from "@/components/SongList";
import Comment from "@/components/Comment";
import { playListComment } from "@/api";

export default {
  name: "",
  components: { SongList, Comment },
  data() {
    return {
      comment: {
        type: 2,
        page: 1,
        pageSize: 20
      },
      activeName: "songlist",
      rankDetail: {},
      idx: this.$route.params.idx,
      id: this.$route.params.id
    };
  },
  computed: {},
  created() {
    this.handleGetData();
    this.handleGetComment();
  },
  watch: {},
  methods: {
    async handleGetData() {
      const res = await toplist({ idx: this.idx });
      if (res.code == 200) {
        this.rankDetail = res.playlist;
      }
    },
    handleChangePage(obj) {
      // 评论改变
      this.comment = Object.assign({}, this.comment, obj);
      this.handleGetComment();
      this.handleScrollTop();
    },
    handleGetComment() {
      // 获取评论
      const id = this.id;
      const { type, page, pageSize } = this.comment;
      const params = {
        id,
        limit: pageSize,
        offset: (page - 1) * pageSize
      };
      playListComment(params).then(res => {
        this.comment = Object.assign({}, res, {
          type,
          page,
          pageSize
        });
      });
    },
    handleScrollTop() {
      // 滚动到顶部
      const el = this.$el.querySelector(".el-tabs__content");
      this.$root.scrollTop(el, 0);
    },
    handleSong(ids) {
      // 播放全部
      const id = ids.map(item => item.id);
      this[TYPES.MUTATIONS_SET_SONG_OPTIONS]({ play: false });
      this[TYPES.MUTATIONS_INIT_SONG_LIST]();
      this[TYPES.ACTIONS_GET_SONG_DETAIL]({ id }).then(res => {
        this[TYPES.MUTATIONS_GET_SONG_DETAIL](res);
        this[TYPES.MUTATIONS_SET_SONG_ORDER]();
        setTimeout(() => {
          this[TYPES.MUTATIONS_SET_SONG_OPTIONS]({ play: true });
        }, 200);
      });
    },
    ...mapMutations([
      TYPES.MUTATIONS_INIT_SONG_LIST,
      TYPES.MUTATIONS_GET_SONG_DETAIL,
      TYPES.MUTATIONS_SET_SONG_OPTIONS,
      TYPES.MUTATIONS_SET_SONG_ORDER
    ]),
    ...mapActions([TYPES.ACTIONS_GET_SONG_DETAIL])
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

.rank_detail {
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