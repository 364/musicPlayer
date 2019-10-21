<template>
  <div id="app" :style="{ backgroundImage: 'url( '+ bg +')' }">
    <div class="main">
      <div class="content">
        <Sidebar class="sidebar" />
        <div class="detail">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </div>
      <Footer class="footer" />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Sidebar,
    Footer
  },
  data() {
    return {
      bg: ""
    };
  },
  created() {
    // 随机背景图
    const arr = require
      .context("images/bg", false, /.(png|jpg|jpeg|gif|bmp|webp)$/)
      .keys();
    const num = Math.floor(Math.random() * (arr.length - 1));
    this.bg = require("images/bg" + arr[num].slice(1));
  }
};
</script>

<style lang="less" scoped>
  #app {
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
    .main{
      background:rgba(255,255,255,0.5);
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      width: 80%;
      height: 90%;
      position: relative;
      .content{
        display: flex;
        height: 100%;
        .sidebar{
          flex:2;
        }
        .detail{
          flex:10;
          background: rgba(255,255,255,0.9);
          border-radius:0 10px 10px 0;
          padding-bottom: 70px;
        }  
      }
      .footer{
        width: 100%;
        height: 70px;
        position: absolute;
        bottom: 0;
        border-radius:0 0 10px 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        background: rgba(255,255,255,0.9);
      }
    }
  }
</style>
<style>
  @import "./assets/style/normalize.css";
  @import "./assets/style/common.css";
</style>