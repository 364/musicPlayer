// import * as TYPES from "@/store/types";
// import * as API from "@/api";

const menu = {
  state: {
    recommend: {
      title: "推荐",
      content: [
        {
          text: "音乐馆",
          icon: "icon-music1",
          route: "/home"
        },
        {
          text: "私人FM",
          icon: "icon-ios-radio",
          route: "/fm"
        },
        {
          text: "排行榜",
          icon: "icon-ranking",
          route: "/rank"
        }
      ]
    },
    myMusic: {
      title: "我的音乐",
      content: [
        {
          text: "本地音乐",
          icon: "icon-Music",
          route: "/local-list"
        },
        {
          text: "我喜欢",
          icon: "icon-heart1",
          route: "/love-list"
        },
        {
          text: "试听列表",
          icon: "icon-play-list-line",
          route: "/listen-list"
        }
      ]
    },
    songList: {
      title: "创建歌单",
      content: [
        {
          text: "默认列表",
          icon: "icon-music-note",
          route: "/song-list"
        }
      ]
    }
  },
  getters: {
    menuList(state){
      // 菜单列表
      return [].concat(state.recommend, state.myMusic, state.songList);
    }
  },
  mutations: {},
  actions: {}
};

export default menu;
