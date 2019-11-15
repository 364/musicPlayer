<!-- 歌词 -->
<template>
  <div class="lyrics" v-show="isShow">
    <div class="blur" :style="{backgroundImage:`url(${getPicUrl})`}"></div>
    <div class="content">歌词页面</div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import * as TYPES from "@/store/types";

export default {
  name: "lyrics",
  components: {},
  data() {
    return {};
  },
  computed: {
    getCurrent() {
      // 获取当前播放的内容
      return this.songList[this.songOptions.current];
    },
    getPicUrl() {
      // 获取歌曲图片
      return this.getCurrent
        ? this.getCurrent.al.picUrl
        : this.songOptions.default.picUrl;
    },
    ...mapState({
      isShow: state => state.detail.songOptions.showLyrics,
      songList: state => state.detail.songList,
      songOptions: state => state.detail.songOptions
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
.lyrics {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 300;
  .lyrics,
  .blur {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .blur {
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    filter: blur(30px);
  }
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    color: #fff;
    padding: 20px;
  }
}
</style>