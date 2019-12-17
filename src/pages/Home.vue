<!-- 首页 -->
<template>
  <div class="home">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {
  },
  created(){
    this.handleNotSelected()
  },
  methods:{
    handleNotSelected(){
      // 双击不选中文本
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    }
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