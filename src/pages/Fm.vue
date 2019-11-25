<!-- 私人fm -->
<template>
  <div class="fm">
    <div v-if="!isLogin" class="empty">
      <img v-lazy="require('@/assets/images/lock.gif')" alt />
      <div>
        <h3>登录解锁更多功能</h3>
        <el-button type="primary" plain>立即登录</el-button>
      </div>
    </div>
    <div v-else>私人fm</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "fm",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },
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
.fm {
  height: calc(100% - @footer-height);
  > div {
    padding: 20px;
  }
  .empty {
    text-align: center;
    height: 90%;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 30%;
    }
  }
}
</style>