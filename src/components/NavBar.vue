<!-- 搜索条 -->
<template>
  <div class="nav">
    <search-box />
    <ul class="navlist" v-show="$route.path.includes('home')">
      <router-link
        tag="li"
        v-for="item in navList"
        :key="item.title"
        :to="item.route"
      >{{ item.title }}</router-link>
    </ul>
    <div class="history">
      <i class="el-icon-arrow-left" @click="$router.back(-1)"></i>
      <i class="el-icon-arrow-right" @click="$router.back(1)"></i>
    </div>
  </div>
</template>

<script>
import * as TYPES from "@/store/types";
import { mapState } from "vuex";
import SearchBox from "@/components/SearchBox";

export default {
  name: "nav-bar",
  components: {
    SearchBox
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      navList: state => state.home.navList
    })
  },
  created() {
  },
  methods: {}
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
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
      &:hover {
        color: @theme-color;
      }
      &.router-link-active {
        font-weight: bold;
        color: @theme-color;
        border-bottom: 2px solid @theme-color;
      }
    }
  }
  .history {
    i {
      color: #999;
      border: 1px solid #ccc;
      margin-left: 10px;
      cursor: pointer;
      padding: 2px;
      &:hover {
        color: @theme-color;
        border: 1px solid @theme-color;
      }
    }
  }
}
</style>