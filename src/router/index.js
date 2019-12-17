import Vue from "vue";
import Router from "vue-router";
import Layout from "@/pages/Layout";
import Home from "@/pages/Home";
import Recommend from "@/pages/Recommend";
import Singer from "@/pages/Singer";
import PlayList from "@/pages/PlayList";
import PlayListDetail from "@/pages/PlayListDetail";
import SingerDetail from "@/pages/SingerDetail";
import SearchDetail from "@/pages/SearchDetail";
import MvDetail from "@/pages/MvDetail";
import AlbumDetail from "@/pages/AlbumDetail";
import Fm from "@/pages/Fm";
import Rank from "@/pages/Rank";
import RankDetail from "@/pages/RankDetail";

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
        },
        {
          path: "/playlist/:id",
          name: "PlayListDetail",
          component: PlayListDetail
        },
        {
          path: "/singer/:id",
          name: "SingerDetail",
          component: SingerDetail
        },
        {
          path: "/mv/:id",
          name: "MvDetail",
          component: MvDetail
        },
        {
          path: "/search",
          name: "SearchDetail",
          component: SearchDetail
        },
        {
          path: "/fm",
          name: "Fm",
          component: Fm
        },
        {
          path: "/rank",
          name: "Rank",
          component: Rank
        },
        {
          path: "/rank/:id/:idx",
          name: "RankDetail",
          component: RankDetail
        },
        {
          path: "/album/:id",
          name: "AlbumDetail",
          component: AlbumDetail
        },
        {
          path: "/local-list",
          name: "/home",
          component: Home
        },
        {
          path: "/love-list",
          name: "/home",
          component: Home
        },
        {
          path: "/listen-list",
          name: "/home",
          component: Home
        },
        {
          path: "/song-list",
          name: "/home",
          component: Home
        },
      ]
    }
  ]
});
