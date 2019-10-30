<!-- 全部歌手 -->
<template>
  <div class="singer">
    <!-- 筛选条件 -->
    <filter-cat :category="category" @handleChange="handleChange" />
    <!-- 筛选结果 -->
    <div class="list" ref="scroll">
      <load-more :load="load">
        <ul ref="list">
          <li v-for="item in singerList" :key="item.id">
            <img v-lazy="item.picUrl" />
            <div>{{ item.name }}</div>
          </li>
        </ul>
      </load-more>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import * as TYPES from "@/store/types";
import LoadMore from "@/components/LoadMore";
import FilterCat from "@/components/FilterCat";

export default {
  name: "singer",
  components: {
    LoadMore,
    FilterCat
  },
  data() {
    return {
      box: null,
      scroll: null
    };
  },
  computed: {
    ...mapState({
      load: state => state.singer.load,
      category: state => state.singer.category,
      singerList: state => state.singer.singerList
    })
  },
  created() {
    this[TYPES.ACTIONS_GET_SINGER_LIST]();
  },
  mounted() {
    this.box = this.$refs.list;
    this.scroll = this.$refs.scroll;
    this.scroll.addEventListener("scroll", this.handleScroll);
    this.handleBottom();
  },
  methods: {
    handleBottom() {
      // 是否满一屏
      this.$nextTick(() => {
        const clientH = this.box.clientHeight;
        const scrollH = this.scroll.scrollTop + this.scroll.clientHeight;
        if (scrollH > clientH) {
          this[TYPES.MUTATIONS_GET_SINGER_LOAD]({ showLoad: true });
        } else {
          if (!this.finish) {
            this[TYPES.MUTATIONS_GET_SINGER_LOAD]({ showLoad: true });
            this.handleMore();
          } else {
            this[TYPES.MUTATIONS_GET_SINGER_LOAD]({ showLoad: false });
          }
        }
      });
    },
    handleScroll() {
      // 滚动
      const { finish, loading } = this.load;
      const clientH = this.box.clientHeight;
      const scrollH = this.scroll.scrollTop + this.scroll.clientHeight;
      if (scrollH - clientH > 50 && !finish && !loading) {
        // 加载中
        this[TYPES.MUTATIONS_GET_SINGER_LOAD]({ loading: true });
        this.handleMore();
      }
    },
    handleMore() {
      // 加载下一页
      this[TYPES.MUTATIONS_CHANGE_SINGER_PAGE]();
      this[TYPES.ACTIONS_GET_SINGER_LIST]();
    },
    handleChange(e) {
      // 改变筛选条件
      const { dataset } = e.target;
      this[TYPES.MUTATIONS_CHANGE_SINGER_LIST](dataset);
      this[TYPES.ACTIONS_GET_SINGER_LIST]();
    },
    ...mapActions([TYPES.ACTIONS_GET_SINGER_LIST]),
    ...mapMutations([
      TYPES.MUTATIONS_GET_SINGER_LOAD,
      TYPES.MUTATIONS_CHANGE_SINGER_LIST,
      TYPES.MUTATIONS_CHANGE_SINGER_PAGE
    ])
  },
  beforeDestroy() {
    this.scroll.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.singer {
  height: @auto-height;
  & > div {
    padding: 0 20px;
  }
  .list {
    height: 82%;
    overflow-y: auto;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 18%;
        margin: 5px;
        padding: 10px;
        display: flex;
        cursor: pointer;
        align-items: center;
        overflow: hidden;
        border-radius: 10px;
        box-sizing: border-box;
        box-shadow: 0 0 15px fade(#000, 5%);
        &:hover{
          box-shadow: 0 0 15px fade(#000, 12%);
        }
        img {
          width: 40%;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>