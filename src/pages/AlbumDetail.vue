<!-- 专辑详情 -->
<template>
  <div class="album_detail" v-if="Object.keys(albumDetail).length">
    <!-- 专辑介绍 -->
    <div class="des">
      <div class="coverImg" v-lazy:background-image="albumDetail.album.picUrl"></div>
      <div class="info">
        <h2>{{ albumDetail.album.name }}</h2>
        <h4>
          <img :src="albumDetail.album.artist.picUrl" class="avatar" />
          <span>{{ albumDetail.album.artist.name }}</span>
        </h4>
        <div class="count">创建时间：{{ albumDetail.publishTime | formatTime }}</div>
        <div>
          <el-button size="mini" type="primary" @click="handleSong(albumDetail.songs)">
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
        <el-tab-pane :label="`歌曲(${albumDetail.songs.length})`" name="songlist">
          <song-list :tableData="albumDetail.songs" />
        </el-tab-pane>
        <el-tab-pane :label="`评论(${albumDetail.album.info.commentCount})`" name="comment">
          <comment :comment="comment" @handleChangePage="handleChangePage" />
        </el-tab-pane>
        <el-tab-pane label="专辑介绍" name="desc">
          <div class="desc">
            <h3 v-html="`专辑介绍 - ${ albumDetail.album.name}`"></h3>
            <pre v-html="albumDetail.album.description"></pre>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import * as TYPES from "@/store/types";
import SongList from "@/components/SongList";
import Comment from "@/components/Comment";
import { albumComment } from "@/api";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "album_detail",
  components: { Comment, SongList },
  data() {
    return {
      comment: {
        type: 3,
        page: 1,
        pageSize: 20
      },
      id: this.$route.params.id,
      activeName: "songlist"
    };
  },
  computed: {
    ...mapState({
      albumDetail: state => state.detail.albumDetail
    })
  },
  created() {
    this.handleGetData();
    this.handleGetComment();
  },
  watch: {},
  methods: {
    handleGetData() {
      // 获取歌单数据
      const id = this.id;
      if (!id) {
        this.$router.go(-1);
        return;
      }
      this[TYPES.ACTIONS_GET_ALBUM_DETAIL]({ id });
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
      albumComment(params).then(res => {
        this.comment = Object.assign({}, res, {
          type,
          page,
          pageSize
        });
      });
    },
    handleChangePage(obj) {
      // 评论改变
      this.comment = Object.assign({}, this.comment, obj);
      this.handleGetComment();
      this.handleScrollTop();
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
      TYPES.MUTATIONS_SET_SONG_OPTIONS,
      TYPES.MUTATIONS_INIT_SONG_LIST,
      TYPES.MUTATIONS_GET_SONG_DETAIL,
      TYPES.MUTATIONS_SET_SONG_ORDER
    ]),
    ...mapActions([
      TYPES.ACTIONS_GET_ALBUM_DETAIL,
      TYPES.ACTIONS_GET_SONG_DETAIL
    ])
  },
  beforeRouteUpdate(to, from, next) {
    this.id = to.params.id;
    this.handleGetData();
    this.handleGetComment();
    next();
  },
  activated() {
    this.activeName = "songlist";
    this.id = this.$route.params.id;
    this.handleGetData();
    this.handleGetComment();
  }
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.album_detail {
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
        height: 20px;
        object-fit: cover;
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
    pre {
      padding-left: 15px;
      font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
      word-wrap: break-word;
      white-space: pre-wrap;
    }
  }
}
</style>