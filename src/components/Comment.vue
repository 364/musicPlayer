<!-- 评论 -->
<template>
  <div :class="['comment',{'dark':method=='dark'}]" v-if="Object.keys(comment).length">
    <!-- 写评论 -->
    <div class="send">
      <el-input
        type="textarea"
        placeholder="请输入评论"
        v-model="content"
        maxlength="50"
        show-word-limit
      ></el-input>
      <el-button type="primary" size="mini" class="btn" @click="handleComment">提交</el-button>
    </div>
    <!-- 精彩评论  -->
    <div v-if="comment.hotComments&&comment.hotComments.length">
      <h5>精彩评论</h5>
      <ul>
        <li v-for="item in comment.hotComments" :key="item.commentId">
          <img :src="item.user.avatarUrl" alt="avatarUrl" class="avatar" />
          <div>
            <div class="nickname">{{ item.user.nickname }}</div>
            <div class="content">{{ item.content }}</div>
            <div class="time">
              <span>{{ item.time | formatTime('YYYY-MM-DD HH:mm') }}</span>
              <span class="like" @click="handleLike">
                <i class="iconfont icon-good"></i>
                ({{ item.likedCount }})
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 最新评论 -->
    <div v-if="comment.comments">
      <h5>最新评论</h5>
      <ul>
        <li v-for="item in comment.comments" :key="item.commentId">
          <img :src="item.user.avatarUrl" alt="avatarUrl" class="avatar" />
          <div>
            <div class="nickname">{{ item.user.nickname }}</div>
            <div class="content">{{ item.content }}</div>
            <div class="time">
              <span>{{ item.time | formatTime('YYYY-MM-DD HH:mm') }}</span>
              <span class="like">
                <i class="iconfont icon-good"></i>
                ({{ item.likedCount }})
              </span>
            </div>
          </div>
        </li>
      </ul>
      <pagination :comment="comment" @handleChange="handleChange" />
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { mapState, mapMutations } from "vuex";
import * as TYPES from "@/store/types";

export default {
  name: "comment",
  components: {
    Pagination
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    method: {
      type: String,
      default: "light"
    }
  },
  data() {
    return {
      content: ""
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  },
  created() {},
  watch: {},
  methods: {
    handleIsLogin(callback){
      // 是否登陆
      if(this.isLogin){
        callback()
      }else{
        this[TYPES.MUTATIONS_SET_SHOW_LOGIN](true);
      }
    },
    handleComment(){
      // 提交评论
      this.handleIsLogin(()=>{

      })
    },
    handleLike(){
      // 点赞/取消
      this.handleIsLogin(()=>{

      })
    },
    handleChange(obj) {
      // 改变评论页数
      this.$emit("handleChangePage", obj);
    },
    ...mapMutations([TYPES.MUTATIONS_SET_SHOW_LOGIN])
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {

  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {
    //如果页面有keep-alive缓存功能，这个函数会触发
  },
  deactivated() {
  }
};
</script>
<style lang='less' scoped>
@import "~@/assets/style/variable.less";
.comment {
  &.dark {
    color: #fff;
    &::-webkit-scrollbar {
      display: none;
    }
    .nickname {
      color: #fff;
    }
    li {
      border-top: 0px;
    }
    /deep/ .el-pagination__jump {
      color: #fff;
    }
  }
  .send {
    padding-top: 10px;
    text-align: right;
    .btn {
      margin-top: 10px;
    }
  }
  li {
    display: flex;
    border-top: 1px solid #f1f1f1;
    padding: 10px;
    align-items: center;
    font-size: 12px;
    flex: 1;
    > div {
      width: 100%;
    }
    .nickname {
      color: #555;
    }
    .avatar {
      width: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .content {
      padding: 10px 0 5px;
    }
    .time {
      display: flex;
      justify-content: space-between;
      color: #aaa;
      .like {
        cursor: pointer;
        &:hover {
          color: @theme-color;
        }
      }
    }
  }
}
</style>