import Vue from "vue";
import Router from "vue-router";
import Layout from "@/views/Layout";
import Home from "@/views/Home";
import Recommend from "@/views/Recommend";
import Singer from "@/views/Singer";
import PlayList from "@/views/PlayList";
import PlayListDetail from "@/views/PlayListDetail";
import SingerDetail from "@/views/SingerDetail";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Layout",
      component: Layout,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "Home",
          component: Home,
          redirect: "/home/recommend",
          children: [
            {
              path: "/home/recommend",
              name: "Recommend",
              component: Recommend
            },
            {
              path: "/home/singer",
              name: "Singer",
              component: Singer
            },
            {
              path: "/home/playlist",
              name: "PlayList",
              component: PlayList
            },
            {
              path: "/playlist/detail/:id",
              name: "PlayListDetail",
              component: PlayListDetail,
            },
            {
              path: "/singer/detail/:id",
              name: "SingerDetail",
              component: SingerDetail,
            }
          ]
        }
      ]
    },
    {
      path: "/fm",
      name: "Layout",
      component: Layout,
    },
    {
      path: "/mv",
      name: "Layout",
      component: Layout,
    },
  ]
});
