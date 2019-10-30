<!--  -->
<template>
  <div class="load-more">
    <slot></slot>
    <div class="load-state" v-if="load.showLoad">
      <div class="finish" v-if="load.finish">加载完成</div>
      <div class="loading" v-else>
        <img src="@/assets/images/loading.gif" alt="loading" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["load"],
};
</script>
<style lang='less' scoped>
.load-state {
  & > div {
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #999;
    img{
      height: 100%;
    }
  }
}
</style>