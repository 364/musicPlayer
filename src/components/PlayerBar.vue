<!-- 底部 -->
<template>
  <div class='player-bar'>
  底部
  </div>
</template>

<script>
export default {
 name:'player-bar',
  components: {},
  data() {
    return {
    
    };
  },
  computed: {},
  created() {
  
  },
  watch: {},
  methods: {
  
  },
  mounted() {
  
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.player-bar{
  width: 100%;
  height: @footer-height;
  position: absolute;
  bottom: 0;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background: fade(#fff,90%);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}
</style>      