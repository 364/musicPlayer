<!-- 分页 -->
<template>
  <div class="pagination">
    <!-- :hide-on-single-page="true" -->
    <el-pagination
      background
      layout="sizes, prev, pager, next, jumper"
      popper-class="select-page"
      :small="true"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="comment.pageSize"
      :current-page="comment.page"
      :total="comment.total"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    comment: {
      type: Object
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  watch: {},
  methods: {
    handleSizeChange(pageSize) {
      // 改变一页多少条
      this.$emit("handleChange", { pageSize, page: 1 });
    },
    handleCurrentChange(page) {
      // 改变页数
      this.$emit("handleChange", { page });
    },
  }
};
</script>
<style lang='less' scoped>
.pagination {
  margin-bottom: 20px;
  /deep/ .el-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /deep/ .el-pagination--small span:not([class*="suffix"]) {
    height: auto;
    line-height: 1;
  }
}
</style>