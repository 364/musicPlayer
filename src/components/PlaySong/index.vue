<!-- 播放歌曲 -->
<template>
  <div class="play-song">
    <!-- 播放列表 -->
    <player-bar />
    <Lyrics />
    <music-list />
    <audio :src="url" ref="audio"></audio>
  </div>
</template>

<script>
import PlayerBar from "@/components/PlaySong/PlayerBar";
import MusicList from "@/components/PlaySong/MusicList";
import Lyrics from "@/components/PlaySong/Lyrics";

export default {
  name: "playsong",
  components: {
    Lyrics,
    PlayerBar,
    MusicList
  },
  data() {
    return {
      url: ""
    };
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
.playsong {
  position: relative;
}
</style>