<!-- 全部歌手 -->
<template>
  <div class="singer">
    <!-- 筛选条件 -->
    <div v-for="(item,index) in category" :key="item.title" class="filter">
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
    <!-- 筛选结果 -->
    <div class="list">
      <ul>
        <li v-for="item in singerList" :key="item.id">
          <img v-lazy="item.picUrl" />
          <div>{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import * as TYPES from "@/store/types";
export default {
  name: "singer",
  components: {},
  data() {
    return {};
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
    handleChange(e) {
      // 改变筛选条件
      const { dataset } = e.target;
      this[TYPES.MUTATIONS_CHANGE_SINGER_LIST](dataset);
      this[TYPES.ACTIONS_GET_SINGER_LIST]();
    },
    ...mapMutations([TYPES.MUTATIONS_CHANGE_SINGER_LIST]),
    ...mapActions([TYPES.ACTIONS_GET_SINGER_LIST])
  }
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.singer {
  overflow-y: auto;
  height: @auto-height;
  .filter {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
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
    margin-top: 30px;
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 18%;
        margin:5px;
        display: flex;
        align-items: center;
        overflow: hidden;
        border-radius: 10px;
        box-shadow: 0 0 15px fade(#000, 5%);
        img {
          margin: 10px;
          width: 40%;
        }
      }
    }
  }
}
</style>