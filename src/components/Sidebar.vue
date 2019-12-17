<template>
  <div class="sidebar">
    <!-- 头像 -->
    <div class="user" @click="toLogin">
      <div class="avatar">
        <div></div>
        <span class="nickName">{{ getName }}</span>
      </div>
      <el-tooltip class="item" v-show="isLogin" content="退出登录" placement="bottom">
        <i class="iconfont icon-logout logout" @click="logout"></i>
      </el-tooltip>
    </div>
    <!-- 导航 -->
    <ul class="menu">
      <li v-for="item in menuList" :key="item.title">
        <div class="title">{{ item.title }}</div>
        <ul v-if="item.content&&item.content.length" class="submenu">
          <router-link tag="li" v-for="cItem in item.content" :key="cItem.route" :to="cItem.route">
            <div>
              <i :class="['iconfont',cItem.icon]"></i>
              <span>{{ cItem.text }}</span>
            </div>
          </router-link>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import Login from "./Login";
import { mapState,mapGetters, mapMutations } from "vuex";
import * as TYPES from "@/store/types";
import { logout } from '@/api'
import { Message } from "element-ui";

export default {
  name: "sidebar",
  components: {
    Login
  },
  data() {
    return {
    };
  },
  computed: {
    getName(){
      if(this.isLogin&&Object.keys(this.loginInfo).length){
        return this.loginInfo.account.userName
      }
      return '未登录'
    },
    ...mapGetters(["menuList"]),
    ...mapState({
      isLogin: state => state.user.isLogin,
      loginInfo: state => state.user.loginInfo,
    })
  },
  methods: {
    toLogin() {
      // 显示登录框
      if(!this.isLogin){
        this[TYPES.MUTATIONS_SET_SHOW_LOGIN](true);
      }
    },
    async logout(){
      // 退出登录
      let res = await logout()
      console.log(res)
      Message.success('已退出登录')
      this[TYPES.MUTATIONS_SET_LOGIN_STATE]()
      this[TYPES.MUTATIONS_SET_LOGIN_INFO]({})
    },
    ...mapMutations([
      TYPES.MUTATIONS_SET_SHOW_LOGIN,
      TYPES.MUTATIONS_SET_LOGIN_STATE,
      TYPES.MUTATIONS_SET_LOGIN_INFO])
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/variable.less";
.sidebar {
  overflow: hidden;
  box-sizing: border-box;
  width: @sidebar-width;
  padding-bottom: @footer-height;
  @media screen and (max-width: 1200px) {
    width: @sidebar-small-width;
  }
  .user {
    font-size: @small-size;
    cursor: pointer;
    margin: @margin-t @margin-lr;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: @base-weight;
      width: 85%;
      margin-right: 10px;
      &:hover {
        text-decoration: underline;
      }
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        background: fade(#000, 5%);
        width: @avator-size;
        height: @avator-size;
        border-radius: 50%;
        margin-right: 15px;
      }
      .nickName{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        flex: 1;
      }
    }
    .logout {
      color: @theme-color;
    }
  }
  .menu {
    overflow: auto;
    height: calc(100% - @footer-height - @avator-size);
    color: @base-color;
    > li {
      padding: 25px;
      padding-right: 0;
      &:first-child {
        padding-top: 0;
      }
      &:not(:last-child) {
        // border-bottom: 1px solid rgba(255, 255, 255, 0.6);
      }
      > .title {
        font-size: 15px;
        font-weight: @base-weight;
        padding-bottom: 15px;
      }
      .submenu {
        li {
          cursor: pointer;
          height: @submenu-height;
          line-height: @submenu-height;
          transition: all 0.5s;
          position: relative;
          i {
            width: 30px;
            margin-right: 20px;
          }
          &::before,&::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            transition: 0.3s;
            transform-origin: left;
            transform: scaleX(0);
          }
          &::before{
            left: 0;
            bottom: 0;
            background: linear-gradient(
              to right,
              transparent,
              @theme-color-1,
              @theme-color-5
            );
          }
          &::after{
            width: 3px;
            height: 100%;
            background: @theme-color;
          }
          &.router-link-active {
            &::before {
              transform: scaleX(1);
            }
            &::after {
              
              transform: scaleX(1);
            }
          }
        }
      }
    }
  }
}
</style>
