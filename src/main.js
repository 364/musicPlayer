// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import VueLazyload from "vue-lazyload";
import ElementUI from "element-ui";
import Filter from "@/filter";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/style/normalize.css";
import "@/assets/fonts/iconfont.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueLazyload, {
  error: require("@/assets/images/404.gif"),
  loading: require("@/assets/images/loading.gif")
});
Object.keys(Filter).forEach(key => Vue.filter(key, Filter[key]));

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
