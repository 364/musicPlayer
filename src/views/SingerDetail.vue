<!-- 歌单详情页 -->
<template>
  <div class="playlist_detail" v-if="Object.keys(singerList).length">
    <!-- 歌单介绍 -->
    <div class="des">
      <div class="coverImg" v-lazy:background-image="singerList.artist.picUrl"></div>
      <div class="info">
        <h2>
          <div>
            {{ singerList.artist.name }}
            <span
              class="alias"
              v-if="singerList.artist.alias.length"
            >({{ singerList.artist.alias | getAlias }})</span>
          </div>
          <div class="count">
            <span>歌曲数：{{ singerList.artist.musicSize }}</span>
            <span>专辑数：{{ singerList.artist.albumSize }}</span>
            <span>MV数：{{ singerList.artist.mvSize }}</span>
          </div>
        </h2>
        <div class="briefDes">{{ singerList.artist.briefDesc }}</div>
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
        <el-tab-pane :label="`热门歌曲(${singerList.hotSongs.length})`" name="songlist">
          <song-list :tableData="singerList.hotSongs" :showCell="showCell" />
        </el-tab-pane>
        <el-tab-pane :label="`热门专辑(${singerList.hotAlbums.length})`" name="albumlist">
          <album-list :data="singerList.hotAlbums" />
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
  components: { SongList,AlbumList },
  data() {
    return {
      showCell: ["song", "ablum", "time"],
      activeName: "songlist"
    };
  },
  computed: {
    ...mapState({
      singerList: state => state.detail.singerList
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
    padding: 0 20px;
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
        height: calc(100% - 60px);
      }
    }
  }
}
</style>
