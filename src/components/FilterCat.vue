<!-- 筛选条件 -->
<template>
  <div class="filter">
    <div v-for="(item,index) in category" :key="item.title">
      <div class="title">{{ item.title + '：'}}</div>
      <ul>
        <li
          v-for="(cItem,cIndex) in item.content"
          :key="cItem.code"
          :data-code="cItem.code"
          :data-idx="index+'-'+cIndex"
          :class="{'active': cItem.code == item.active}"
          @click="handleChange"
        >{{ cItem.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "filter-cat",
  props: {
    category: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {
    handleChange(e) {
      // 改变筛选条件
      this.$emit("handleChange", e);
    }
  }
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.filter {
  margin-bottom: 30px;
  & > div {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  ul {
    flex: 1;
    li {
      display: inline-block;
      cursor: pointer;
      padding:0 3px;
      margin: 0 8px;
      position: relative;
      font-size: 12px;
      &.active {
        color: @theme-color;
        font-weight: 600;
      }
      &:not(:last-child) {
        &::after {
          content: "|";
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          color: #aaa;
        }
      }
      &:not(.active):hover {
        color: @theme-color;
      }
    }
  }
}
</style>