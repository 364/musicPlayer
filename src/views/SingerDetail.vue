<!-- 歌单详情页 -->
<template>
  <div class="playlist_detail" v-if="Object.keys(singerDetail).length">
    <!-- 歌单介绍 -->
    <div class="des">
      <div class="coverImg" v-lazy:background-image="singerDetail.artist.picUrl"></div>
      <div class="info">
        <h2>
          <div>
            {{ singerDetail.artist.name }}
            <span
              class="alias"
              v-if="singerDetail.artist.alias.length"
            >({{ singerDetail.artist.alias | getAlias }})</span>
          </div>
          <div class="count">
            <span>歌曲数：{{ singerDetail.artist.musicSize }}</span>
            <span>专辑数：{{ singerDetail.artist.albumSize }}</span>
            <span>MV数：{{ singerDetail.artist.mvSize }}</span>
          </div>
        </h2>
        <div class="briefDes">{{ singerDetail.artist.briefDesc }}</div>
        <div>
          <el-button size="mini" type="primary">
            <i class="el-icon-plus"></i> 播放全部
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
        <el-tab-pane :label="`热门歌曲(${singerDetail.hotSongs.length})`" name="songlist">
          <song-list :tableData="singerDetail.hotSongs" :showCell="showCell" />
        </el-tab-pane>
        <el-tab-pane :label="`热门专辑(${singerDetail.hotAlbums.length})`" name="albumlist">
          <album-list :data="singerDetail.hotAlbums" />
        </el-tab-pane>
        <el-tab-pane label="歌手介绍  " name="singerdesc">
          <div class="desc">
            <h3 v-html=" singerDetail.artist.name+'简介'"></h3>
            <div v-html="singerDetail.artist.briefDesc" class="pre"></div>
          </div>
          <div v-for="item in singerDetail.introduction" :key="item.ti" class="desc">
            <h3 v-html="item.ti"></h3>
            <pre v-html="item.txt"></pre>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import * as TYPES from "@/store/types";
import SongList from "@/components/SongList";
import AlbumList from "@/components/AlbumList";

export default {
  name: "",
  components: { SongList, AlbumList },
  data() {
    return {
      showCell: ["song", "ablum", "time"],
      activeName: "songlist"
    };
  },
  computed: {
    ...mapState({
      singerDetail: state => state.detail.singerDetail
    })
  },
  created() {
    this.handleGetData();
  },
  watch: {},
  methods: {
    handleClick() {},
    handleGetData() {
      const id = this.$route.params.id;
      if (!id) {
        this.$router.go(-1);
      }
      this[TYPES.ACTIONS_GET_SINGER_DETAIL]({ id });
    },
    ...mapActions([TYPES.ACTIONS_GET_SINGER_DETAIL])
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
      background-position: center;
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > * {
        margin: 0;
        font-weight: 400;
      }
      h2 {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .count {
          color: #999;
          font-size: 12px;
          > span:not(:last-child)::after {
            content: "|";
            padding: 0 8px;
            color: #ccc;
          }
        }
      }
      .briefDes {
        text-indent: 2em;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        color: #999;
        font-size: 13px;
        line-height: 20px;
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
    .desc {
      .pre{
        text-indent: 2em;
      }
      pre,
      .pre {
        padding-left: 15px;
        line-height: 30px;
        font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
        word-wrap: break-word;
        white-space: pre-wrap;
      }
    }
  }
}
</style>
