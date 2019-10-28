import * as TYPES from "@/store/types";
import * as API from "@/api";

const category = [
  {
    title: "语种",
    content: [
      { name: "华语", code: "10", active: true },
      { name: "欧美", code: "20", active: false },
      { name: "日本", code: "60", active: false },
      { name: "韩国", code: "70", active: false },
      { name: "其他", code: "40", active: false }
    ]
  },
  {
    title: "分类",
    content: [
      { name: "男歌手", code: "01", active: true },
      { name: "女歌手", code: "02", active: false },
      { name: "组合/乐队", code: "03", active: false }
    ]
  },
  {
    title: "筛选",
    content: getLetter()
  }
];

const singer = {
  state: {
    category,
    singerList: []
  },
  getters: {
    [TYPES.GETTERS_GET_SINGER_PARAM](state) {
      let str = "";
      for (let i in state.category) {
        state.category[i]["content"].forEach(item =>
          item.active ? (str += item.code) : ""
        );
      }
      return {
        cat: str.match(/\d+/g) ? str.match(/\d+/g)[0] : 1001,
        initial: str.match(/[a-zA-Z#]+/g) ? str.match(/[a-zA-Z#]+/g)[0] : ""
      };
    }
  },
  mutations: {
    [TYPES.MUTATIONS_GET_SINGER_LIST](state, data) {
      state.singerList = data;
    },
    [TYPES.MUTATIONS_CHANGE_SINGER_LIST](state, data) {
      const { idx } = data;
      const index = idx.split("-");
      if (index.length) {
        let arr = state.category[index[0]]["content"];
        for (let i = 0; i < arr.length; i++) {
          arr[i].active = false;
          if (i == index[1] * 1) {
            arr[i].active = true;
          }
        }
      }
    }
  },
  actions: {
    [TYPES.ACTIONS_GET_SINGER_LIST]({ commit, getters }) {
      const param = getters[TYPES.GETTERS_GET_SINGER_PARAM];
      API.singerList(param).then(res => {
        commit(TYPES.MUTATIONS_GET_SINGER_LIST, res.artists);
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
