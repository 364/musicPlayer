<!-- 歌曲列表 -->
<template>
  <div class="songlist">
    <el-table
      :data="tableData"
      size="small"
      row-key="id"
      v-if="showCell.includes('song')"
      @cell-dblclick="handleSong"
      :row-class-name="handleRowClass"
    >
      <!-- 歌曲 -->
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
              <span v-if="currentSong&&currentSong.id==scope.row.id">
                <i :class="['iconfont','play',playIcon]"></i>
              </span>
              <i class="el-icon-video-play" v-else></i>
              <i class="el-icon-circle-plus-outline"></i>
              <i class="el-icon-download"></i>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- 歌手 -->
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
      <!-- 专辑 -->
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
      <!-- 时长 -->
      <el-table-column label="时长" width="100" v-if="showCell.includes('time')">
        <template slot-scope="scope">
          <span>{{ (scope.row.dt||scope.row.duration) | formatTime('mm:ss') }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import * as TYPES from "@/store/types";

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
  computed: {
    ...mapState({
      songList: state => state.detail.songList,
      songOptions: state => state.detail.songOptions
    }),
    ...mapGetters({
      currentSong: TYPES.GETTERS_GET_CURRENT_SONG
    }),
    playIcon() {
      // 暂停播放按钮
      return this.songOptions.play ? "icon-pause" : "icon-bofanganniu";
    }
  },
  created() {},
  watch: {},
  methods: {
    ...mapMutations([
      TYPES.MUTATIONS_GET_SONG_DETAIL,
      TYPES.MUTATIONS_SET_SONG_OPTIONS,
      TYPES.MUTATIONS_SET_SONG_ORDER
    ]),
    handleSong(row, column, cell, event) {
      // 播放某一首
      let num = -1;
      for (let i = 0; i < this.songList.length; i++) {
        if (this.songList[i].id == row.id) {
          num = i;
          break;
        }
      }
      this[TYPES.MUTATIONS_SET_SONG_OPTIONS]({ play: false });
      // console.log(num);
      if (num < 0) {
        // 不在歌单内
        let res = this.songList;
        res.splice(this.songOptions.current + 1, 0, row);
        this[TYPES.MUTATIONS_GET_SONG_DETAIL](res);
        this[TYPES.MUTATIONS_SET_SONG_OPTIONS]({
          current: this.songOptions.current + 1
        });
      } else {
        // 在歌单内 更改当前index
        this[TYPES.MUTATIONS_SET_SONG_OPTIONS]({ current: num });
      }
      setTimeout(() => {
        this[TYPES.MUTATIONS_SET_SONG_OPTIONS]({ play: true });
      }, 200);
    },
    handleRowClass({ row, column, rowIndex, columnIndex }) {
      // 当前播放那一行样式
      if (this.currentSong) {
        if (row.id == this.currentSong.id) {
          return "table-row-active";
        }
      }
      return "";
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
    .table-row-active {
      color: @theme-color;
      background: @theme-color-1;
    }
  }
}
</style>