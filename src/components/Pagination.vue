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
import { mapMutations } from "vuex";
import * as TYPES from "@/store/types";

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
      this[TYPES.MUTATIONS_SET_COMMENT_PAGE]({ pageSize, page: 1 });
      this.$emit("handleGetData", true);
    },
    handleCurrentChange(page) {
      this[TYPES.MUTATIONS_SET_COMMENT_PAGE]({ page });
      this.$emit("handleGetData", true);
    },
    ...mapMutations([TYPES.MUTATIONS_SET_COMMENT_PAGE])
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