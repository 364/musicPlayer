<!-- 歌单详情页 -->
<template>
  <div class="playlist_detail">
    <!-- 歌单介绍 -->
    <div v-if="Object.keys(playlist).length" class="des">
      <div class="coverImg" v-lazy:background-image="playlist.coverImgUrl"></div>
      <div class="info">
        <h2>{{ playlist.name }}</h2>
        <h4>
          <img :src="playlist.creator.avatarUrl" class="avatar" />
          <span>{{ playlist.creator.nickname }}</span>
          <span>{{ playlist.tags | getTags }}</span>
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
          <SongList :tableData="playlist.tracks" />
        </el-tab-pane>
        <el-tab-pane :label="`评论(${playlist.trackCount})`" name="second">评论</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import * as TYPES from "@/store/types";
import SongList from "@/components/SongList";

export default {
  name: "",
  components: { SongList },
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
    const id = this.$route.params.id;
    if (!id) {
      this.$router.go(-1);
    }
    this[TYPES.ACTIONS_GET_PLAYLIST_DETAIL]({ id });
  },
  watch: {},
  methods: {
    handleClick() {},
    ...mapActions([TYPES.ACTIONS_GET_PLAYLIST_DETAIL])
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
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > * {
        margin: 0;
        font-weight: 400;
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
        height:calc(100% - 60px);
      }
    }
  }
}
</style>