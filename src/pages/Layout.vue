<!-- 布局 -->
<template>
  <div class="layout">
    <div class="content">
      <!-- 侧边栏 -->
      <sidebar />
      <div class="detail">
        <!-- 导航 / 搜索 -->
        <nav-bar class="nav" />
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </div>
    <!-- 播放条 -->
    <play-song />
    <!-- 登陆 -->
    <Login />
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";
import Login from "@/components/Login";
import PlaySong from "@/components/PlaySong/index";

export default {
  name: "layout",
  components: {
    NavBar,
    Sidebar,
    PlaySong,
    Login
  },
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
.layout {
  width: @box-width;
  height: @box-height;
  border-radius: @box-radius;
  position: relative;
  background: fade(#fff, 40%);
  box-shadow: 0 0 15px fade(#000, 10%);
  overflow: hidden;
  @media screen and (max-width: 1200px) {
    width: @box-small-width;
  }
  .content {
    display: flex;
    height: 100%;
    .detail {
      flex: 10;
      overflow: hidden;
      background: fade(#fff, 90%);
      border-radius: 0 @box-radius @box-radius 0;
      .nav {
        padding: 20px 20px 0;
      }
      > div:not(.nav) {
        padding-bottom: @footer-height;
        box-sizing: border-box;
      }
    }
  }
}
</style>