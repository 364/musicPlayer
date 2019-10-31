import * as TYPES from "@/store/types";
import * as API from "@/api";

const category = [
  {
    title: "语种",
    active: "10",
    content: [
      { name: "华语", code: "10" },
      { name: "欧美", code: "20" },
      { name: "日本", code: "60" },
      { name: "韩国", code: "70" },
      { name: "其他", code: "40" }
    ]
  },
  {
    title: "分类",
    active: "01",
    content: [
      { name: "男歌手", code: "01" },
      { name: "女歌手", code: "02" },
      { name: "组合/乐队", code: "03" }
    ]
  },
  {
    title: "筛选",
    active: "",
    content: getLetter()
  }
];

const navigation = {
  page: 1,
  pageSize: 50
};

const load = {
  showLoad: true,
  finish: false,
  loading: false
};

const singer = {
  state: {
    load,
    category,
    navigation,
    singerList: []
  },
  getters: {
    [TYPES.GETTERS_GET_SINGER_PARAM](state) {
      // 获取请求参数
      const { category, navigation } = state;
      let str = "";
      for (let i in category) {
        str += category[i]["active"];
      }
      return {
        limit: navigation.pageSize,
        offset: (navigation.page - 1) * navigation.pageSize,
        cat: str.match(/\d+/g) ? str.match(/\d+/g)[0] : 1001,
        initial: str.match(/[a-zA-Z#]+/g) ? str.match(/[a-zA-Z#]+/g)[0] : ""
      };
    }
  },
  mutations: {
    [TYPES.MUTATIONS_GET_SINGER_LIST](state, data) {
      // 歌手列表
      let list = [].concat(state.singerList);
      list.push(...data);
      state.singerList = list;
    },
    [TYPES.MUTATIONS_SET_SINGER_LOAD](state, data = {}) {
      state.load = Object.assign({}, state.load, data);
    },
    [TYPES.MUTATIONS_CHANGE_SINGER_PAGE](state) {
      state.navigation.page++;
    },
    [TYPES.MUTATIONS_CHANGE_SINGER_LIST](state, data) {
      // 改变筛选条件
      const { code, idx } = data;
      const index = idx.split("-");
      if (index.length) {
        state.category[index[0]]["active"] = code;
      }
    },
    [TYPES.MUTATIONS_SET_SINGER_INIT](state) {
      // 初始化
      state.singerList = [];
      state.navigation = navigation
      state.load = load
    }
  },
  actions: {
    [TYPES.ACTIONS_GET_SINGER_LIST]({ commit, getters }) {
      const param = getters[TYPES.GETTERS_GET_SINGER_PARAM];
      // console.log(param);
      API.singerList(param).then(res => {
        if (res.more) {
          commit(TYPES.MUTATIONS_GET_SINGER_LIST, res.artists);
          commit(TYPES.MUTATIONS_SET_SINGER_LOAD, { loading: false });
        } else {
          commit(TYPES.MUTATIONS_SET_SINGER_LOAD, {
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
