import * as TYPES from "@/store/types";
import * as API from "@/api";

const title = {
  filter: {
    title: "歌单分类",
    active: "hot",
    content: [{ name: "热门", tag: "hot" }, { name: "全部", tag: "all" }]
  },
  list: {
    title: "精选歌单",
    active: "hot",
    content: [{ name: "最热", tag: "hot" }, { name: "最新", tag: "new" }]
  }
};

const navigation = {
  page: 1,
  pageSize: 40
};

const load = {
  showLoad: true,
  finish: false,
  loading: false
};

const singer = {
  state: {
    load,
    title,
    navigation,
    category: {
      tag: title.filter.active,
      active: "",
      content: {
        hot: [],
        all: []
      }
    },
    playList: []
  },
  getters: {
    [TYPES.GETTERS_GET_PLAYLIST_PARAM](state) {
      // 获取请求参数
      const { navigation, category, title } = state;
      return {
        limit: navigation.pageSize,
        offset: (navigation.page - 1) * navigation.pageSize,
        cat: category.active,
        order: title.list.active
      };
    }
  },
  mutations: {
    [TYPES.MUTATIONS_GET_PLAYLIST_CATEGORY_ALL](state, data) {
      // 处理全部分类
      const { sub, categories } = data;
      let arr = [];
      for (let i in categories) {
        arr.push({
          title: categories[i],
          content: []
        });
      }
      for (let j = 0; j < sub.length; j++) {
        const name = sub[j]["name"];
        arr[sub[j]["category"]]["content"].push({ name, code: name });
      }
      state.category.content.all = arr;
    },
    [TYPES.MUTATIONS_GET_PLAYLIST_CATEGORY_HOT](state, data) {
      // 处理热门分类
      const { tags } = data;
      let arr = [
        { title: "热门", active: "", content: [{ name: "全部", code: "" }] }
      ];
      tags.forEach(item => {
        const name = item["name"];
        arr[0]["content"].push({ name, code: name });
      });
      state.category.content.hot = arr;
    },
    [TYPES.MUTATIONS_CHANGE_PALYLIST_TITLE](state, data) {
      // 标题条件改变
      const key = Object.keys(data)[0];
      state.title[key]["active"] = data[key];
      if (key === "filter") {
        state.category.tag = data[key];
      }
    },
    [TYPES.MUTATIONS_CHANGE_PALYLIST_TAG](state, data) {
      // 分类标签改变
      const { code } = data;
      let obj = Object.assign(state.category.content);
      for (let i in obj) {
        obj[i] = obj[i].map(item => {
          item.active = code;
          return item;
        });
      }
      state.category.active = code;
      state.category.content = obj;
    },
    // 歌单列表
    [TYPES.MUTATIONS_GET_PLAY_LIST](state, data) {
      let list = [].concat(state.playList);
      list.push(...data);
      state.playList = list;
    },
    [TYPES.MUTATIONS_SET_PLAYLIST_INIT](state) {
      // 初始化
      state.playList = [];
      state.navigation = navigation;
      state.load = load;
    },
    [TYPES.MUTATIONS_SET_PLAYLIST_LOAD](state, data = {}) {
      state.load = Object.assign({}, state.load, data);
    },
    [TYPES.MUTATIONS_CHANGE_PLAYLIST_PAGE](state) {
      state.navigation.page++;
    }
  },
  actions: {
    [TYPES.ACTIONS_GET_PLAYLIST_CATEGORY]({ commit }) {
      // 获取歌单分类标签
      Promise.all([API.playListCat(), API.playListHot()]).then(res => {
        if (res.length) {
          commit(TYPES.MUTATIONS_GET_PLAYLIST_CATEGORY_ALL, res[0]);
          commit(TYPES.MUTATIONS_GET_PLAYLIST_CATEGORY_HOT, res[1]);
        }
      });
    },
    [TYPES.ACTIONS_GET_PLAY_LIST]({ commit, getters }) {
      const param = getters[TYPES.GETTERS_GET_PLAYLIST_PARAM];

      API.playlistAll(param).then(res => {
        if (res.more) {
          commit(TYPES.MUTATIONS_GET_PLAY_LIST, res.playlists);
          commit(TYPES.MUTATIONS_SET_PLAYLIST_LOAD, { loading: false });
        } else {
          commit(TYPES.MUTATIONS_SET_PLAYLIST_LOAD, {
            finish: true
          });
        }
      });
    }
  }
};

function getLetter() {
  const arr = new Array(25).fill().map((item, index) => ({
    name: String.fromCharCode(65 + index),
    code: String.fromCharCode(65 + index),
    active: false
  }));
  arr.unshift({ name: "热门", code: "", active: true });
  arr.push({ name: "#", code: "#", active: false });
  return arr;
}

export default singer;
