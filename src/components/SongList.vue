<!-- 歌曲列表 -->
<template>
  <div class="songlist">
    <el-table :data="tableData">
      <el-table-column label="歌曲">
        <template slot-scope="scope" class="song">
          <i class="iconfont icon-heart1"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手">
        <template slot-scope="scope">
          <span>{{ scope.row | getArtists }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专辑" prop="al.name"></el-table-column>
      <el-table-column label="时长">
        <template slot-scope="scope">
          <span>{{ scope.dt| formatTime('mm:ss') }}</span>
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
      type: Array
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
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
    }
  }
}
</style>