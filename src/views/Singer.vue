<!-- 全部歌手 -->
<template>
  <div class="singer">
    <!-- 筛选条件 -->
    <div class="filter">
      <div v-for="(item,index) in category" :key="item.title">
        <div class="title">{{ item.title + '：'}}</div>
        <ul>
          <li
            v-for="(cItem,cIndex) in item.content"
            :key="cItem.code"
            :data-idx="index+'-'+cIndex"
            :class="{'active':cItem.active}"
            @click="handleChange"
          >{{ cItem.name }}</li>
        </ul>
      </div>
    </div>
    <!-- 筛选结果 -->
    <div class="list" ref="list">
      <LoadMore :load="load">
        <ul ref="scroll">
          <li v-for="item in singerList" :key="item.id">
            <img v-lazy="item.picUrl" />
            <div>{{ item.name }}</div>
          </li>
        </ul>
      </LoadMore>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import * as TYPES from "@/store/types";
import LoadMore from "@/components/LoadMore";
export default {
  name: "singer",
  components: {
    LoadMore
  },
  data() {
    return {
      load: {
        showLoad: true,
        finish: false,
        clientH: 0,
      }
    };
  },
  mounted() {
    this.clientH = this.$refs.list.clientHeight
    this.$refs.scroll.addEventListener('scroll', this.handleScroll)
    console.log('可视区域',this.$refs.list.clientHeight)
    console.log('滚动的元素',this.$refs.scroll)
  },
  computed: {
    ...mapState({
      category: state => state.singer.category,
      singerList: state => state.singer.singerList
    })
  },
  created() {
    this[TYPES.ACTIONS_GET_SINGER_LIST]();
  },
  methods: {
    handleScroll(){
      // 滚动
      console.log('滚动距离',this.$refs.scroll.scrollTop)
    },
    handleChange(e) {
      // 改变筛选条件
      const { dataset } = e.target;
      this[TYPES.MUTATIONS_CHANGE_SINGER_LIST](dataset);
      this[TYPES.ACTIONS_GET_SINGER_LIST]();
    },
    ...mapActions([TYPES.ACTIONS_GET_SINGER_LIST]),
    ...mapMutations([TYPES.MUTATIONS_CHANGE_SINGER_LIST])
  },
  beforeDestroy(){
    this.$refs.scroll.removeEventListener('scroll', this.handleScroll)
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
  .filter {
    margin-bottom: 30px;
    & > div {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }
    li {
      display: inline-block;
      cursor: pointer;
      padding: 5px;
      margin: 0 8px;
      position: relative;
      font-size: 12px;
      &.active {
        background: #f1f1f1;
      }
      &:not(:last-child) {
        &::after {
          content: "|";
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          color: #aaa;
        }
      }
      &:not(.active):hover {
        color: @theme-color;
      }
    }
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
        align-items: center;
        overflow: hidden;
        border-radius: 10px;
        box-sizing: border-box;
        box-shadow: 0 0 15px fade(#000, 5%);
        img {
          width: 40%;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>