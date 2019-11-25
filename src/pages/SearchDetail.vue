<!-- 搜索结果页 -->
<template>
  <div class="search_detail" v-if="key">
    <div class="title">
      <span>搜索到</span>
      <b>{{ keywords }}</b>
      <span>{{ searchCount }}首{{ searchType[key]['name'] }}</span>
    </div>
    <!-- 歌曲列表 -->
    <song-list :tableData="searchList" class="songlist" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { searchType } from "@/utils/enum";
import SongList from "@/components/SongList";
import { search, songDetail } from "@/api";

export default {
  name: "search_detail",
  components: { SongList },
  data() {
    return {
      type: 1,
      searchType,
      key: "",
      searchCount: 0,
      searchList: [],
      keywords: this.$route.query.key
    };
  },
  computed: {},
  created() {
    this.handleGetData();
  },
  watch: {},
  methods: {
    async handleGetData() {
      // 获取搜索结果
      const params = {
        type: this.type,
        keywords: this.keywords
      };
      const res = await search(params);
      const { result } = res;
      let key = this.getKey(result);
      this.searchCount = result[key.slice(0, -1) + "Count"];
      const ids = result[key].map(item => item.id).join();
      const list = await songDetail({ ids });
      this.searchList = list.songs;
    },
    getKey(res) {
      // 获取搜索类型
      const keys = Object.keys(this.searchType);
      for (let i in keys) {
        if (res[keys[i]]) {
          this.key = keys[i];
          return keys[i];
        }
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.keywords = to.query.key;
    this.handleGetData();
    next();
  },
  activated() {
    this.keywords = this.$route.query.key;
    this.handleGetData();
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.search_detail {
  height: calc(100% - @footer-height - @avator-size);
  box-sizing: border-box;
  overflow: hidden;
  .title {
    margin-bottom: 10px;
    padding: 20px 20px 0;
    b {
      color: @theme-color;
    }
  }
  .songlist {
    padding: 0 20px;
    height: 100%;
    overflow-y: auto;
  }
}
</style>