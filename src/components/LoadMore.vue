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
  components: {},
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