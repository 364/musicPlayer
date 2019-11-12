<!-- 滑动条 -->
<template>
  <div class="progress-bar-bg" ref="progressBarBg">
    <span class="progress-dot" ref="progressDot" :style="{ 'left':width }"></span>
    <div class="progress-bar" ref="progressBar" :style="{ 'width':width }"></div>
  </div>
</template>

<script>
export default {
  name: "slider",
  props: {
    width: {
      type: [String, Number],
      default: "0%"
    }
  },
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
@import "~@/assets/style/variable.less";

.progress-bar-bg {
  margin: 0 20px;
  background: #f1f1f1;
  height: 3px;
  border-radius: 10px;
  width: 100%;
  position: relative;
  cursor: pointer;
  .progress-dot {
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    transform: translate(-50%, -45%);
    background: #fff;
    z-index: 3;
    &:hover {
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.35);
    }
    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      transform: translate(-50%, -50%);
      background: @theme-color;
    }
  }
  .progress-bar {
    position: absolute;
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    background: @theme-color-8;
  }
}
</style>