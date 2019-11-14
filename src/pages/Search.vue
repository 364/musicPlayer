<!-- search -->
<template>
  <div class="search">
    <div v-if="key">
      <div class="title">
        <span>搜索到</span>
        <b>{{ searchKey }}</b>
        <span>{{ searchList[getCountKey] }}首{{ searchType[key]['name'] }}</span>
      </div>
      <!-- 歌曲列表 -->
      <song-list :tableData="searchList[key]" class="songlist" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { searchType } from "@/utils/enum";
import SongList from "@/components/SongList";

export default {
  name: "search",
  components: {
    SongList
  },
  data() {
    return {
      searchType,
      key: null,
      activeName: "songlist"
    };
  },
  computed: {
    getCountKey() {
      let str = this.key;
      return str.slice(0, -1) + "Count";
    },
    ...mapState({
      searchKey: state => state.search.searchKey,
      searchList: state => state.search.searchList
    })
  },
  created() {},
  watch: {
    searchList(val){
      if(Object.keys(val).length){
        this.getKey();
      }
    }
  },
  methods: {
    getKey() {
      const keys = Object.keys(this.searchType);
      for (let i in keys) {
        if (this.searchList[keys[i]]) {
          this.key = keys[i];
        }
      }
    }
  },
  filters: {},
  mounted() {
  },
  activated() {
    this.getKey();
    // console.log(this.searchList);
  } //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.search {
  height: calc(100% - @footer-height - @avator-size);
  > div {
    height: 100%;
  }
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