<template>
  <div id="app" :style="{ backgroundImage: 'url( '+ bg +')' }">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      bg: ""
    };
  },
  created() {
    // 随机背景图
    const arr = require.context("@/assets/images/bg", false, /.(png|jpg|jpeg|gif|bmp|webp)$/).keys();
    const num = Math.floor(Math.random() * (arr.length - 1));
    this.bg = require("@/assets/images/bg" + arr[num].slice(1));
  }
}
</script>

<style lang="less">
@import '~@/assets/style/variable.less';
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  font-size: @base-size;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
