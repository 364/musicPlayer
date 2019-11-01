import Vue from "vue";
import Router from "vue-router";
import Layout from "@/views/Layout";
import Home from "@/views/Home";
import Recommend from "@/views/Recommend";
import Singer from "@/views/Singer";
import PlayList from "@/views/PlayList";

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
    }
  ]
});
