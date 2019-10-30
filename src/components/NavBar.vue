<!-- 固定头 -->
<template>
  <div class="nav">
    <div :class="['searchBox',{'focus':isFocus}]">
      <i class="el-icon-search"></i>
      <input
        placeholder="请搜索"
        v-model="keywords"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleSearch"
      />
      <i class="el-icon-circle-close" v-show="keywords.length" @click="handleClear"></i>
    </div>
    <ul class="navlist">
      <router-link
        tag="li"
        v-for="item in navList"
        :key="item.title"
        :to="item.route"
      >{{ item.title }}</router-link>
    </ul>
    <div class="history">
      <i class="el-icon-arrow-left"></i>
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      isFocus: false,
      keywords: ""
    };
  },
  computed: {
    ...mapState({
      navList: state => state.home.navList
    })
  },
  created() {},
  watch: {},
  methods: {
    handleFocus() {
      // 输入
      this.isFocus = true;
    },
    handleBlur() {
      // 失去焦点
      if (this.keywords == "") {
        this.isFocus = false;
      }
    },
    handleClear() {
      // 清空输入框
      this.keywords = "";
      this.isFocus = false;
    },
    handleSearch() {
      // 搜索
    }
  }
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: @margin-lr;
  .navlist {
    position: absolute;
    left: 50%;
    transform: translateX(-52%);
    li {
      display: inline-block;
      margin: 0 10px;
      padding: 0 10px;
      cursor: pointer;
      line-height: @avator-size;
      &:hover{
        color: @theme-color;
      }
      &.router-link-active{
        font-weight: bold;
        color: @theme-color;
        border-bottom: 2px solid @theme-color;
      }
    }
  }
  .searchBox {
    height: @avator-size;
    position: relative;
    color: #999;
    width: @search-width;
    transition: width 0.3s;
    &.focus {
      width: @search-focus-width;
    }
    i {
      height: 100%;
      display: flex;
      align-items: center;
      position: absolute;
      margin: 0 10px;
      top: 0;
      &.el-icon-circle-close {
        cursor: pointer;
        right: 10px;
      }
    }
    input {
      width: 100%;
      background: #f5f5f5;
      outline: none;
      border: 0;
      padding: 10px 20px;
      text-indent: 20px;
      border-radius: 50px;
      box-sizing: border-box;
    }
  }
  .history{
    i{
      color:#999;
      border:1px solid #ccc;
      margin-left:10px;
      cursor: pointer;
      padding: 2px;
      &:hover{
        color:@theme-color;
        border:1px solid @theme-color;
      }
    }
  }
}
</style>