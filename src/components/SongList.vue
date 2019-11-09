<!-- 歌曲列表 -->
<template>
  <div class="songlist">
    <el-table :data="tableData" size="small" row-key="id" v-if="showCell.includes('song')">
      <el-table-column label="歌曲" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <div class="song">
            <div class="left">
              <i class="iconfont icon-heart1"></i>
              <div class="name">
                <span>{{ scope.row.name }}</span>
                <span
                  class="alias"
                  v-if="(scope.row.alia||scope.row.alias).length"
                >({{ (scope.row.alia||scope.row.alias) | getAlias }})</span>
              </div>
            </div>
            <div class="right">
              <i class="el-icon-video-play"></i>
              <i class="el-icon-circle-plus-outline"></i>
              <i class="el-icon-download"></i>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="歌手"
        width="200"
        :show-overflow-tooltip="true"
        v-if="showCell.includes('singer')"
      >
        <template slot-scope="scope">
          <span class="artists">{{ scope.row | getArtists }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="专辑"
        width="180"
        :show-overflow-tooltip="true"
        v-if="showCell.includes('ablum')"
      >
        <template slot-scope="scope">
          <span class="album">{{ scope.row.al?scope.row.al.name:scope.row.album.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时长" width="100" v-if="showCell.includes('time')">
        <template slot-scope="scope">
          <span>{{ (scope.row.dt||scope.row.duration) | formatTime('mm:ss') }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "songlist",
  props: {
    tableData: {
      type: Array,
      required: true
    },
    showCell: {
      type: Array,
      default: () => ["song", "singer", "ablum", "time"]
    }
  },
  components: {},
  data() {
    return {
      w: {
        song: 0,
        singer: 0,
        ablum: 0,
        time: 0
      }
    };
  },
  computed: {},
  created() {
  },
  watch: {},
  methods: {},
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
.songlist {
  height: 100%;
  i {
    color: @theme-color;
  }
  /deep/ * {
    background: transparent;
    .song {
      display: flex;
      justify-content: space-between;
      flex: 1;
      cursor: pointer;
      i {
        cursor: pointer;
        font-size: 16px;
      }
      .left {
        display: flex;
        flex: 1;
        overflow: hidden;
        > * {
          margin-right: 10px;
        }
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .alias {
            color: #999;
          }
        }
      }
      .right {
        flex-wrap: nowrap;
      }
    }
    .artists,
    .album {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>