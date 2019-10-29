<!-- 首页 -->
<template>
  <div class="home">
    <!-- 导航 -->
    <Nav class="nav" />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  name: "home",
  components: {
    Nav,
  }
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.home {
  height: 100%;
  overflow: hidden;
  background-image: url("~@/assets/images/taylor.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top right;
  box-shadow: 0 0 50px 30px #ffffff inset;
  padding-top: @margin-t;
  .nav{
    padding: 0 20px;
  }
}
</style>