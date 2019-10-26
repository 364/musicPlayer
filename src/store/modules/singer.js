import * as TYPES from "@/store/types";
import * as API from "@/api";

const category = [
  {
    title: "语种",
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
    content: [
      { name: "男歌手", code: "01" },
      { name: "女歌手", code: "02" },
      { name: "组合/乐队", code: "03" }
    ]
  },
  {
    title: "筛选",
    content: new Array(25)
      .fill()
      .map((item, index) => String.fromCharCode(65 + index))
  }
];
const singer = {
  state: {
    category
  },
  getters: {},
  mutations: {
    [TYPES.MUTATIONS_GET_BANNER](state, data) {
      state.banners = data;
    }
  },
  actions: {
    [TYPES.ACTIONS_GET_BANNER]({ commit }) {
      API.banner().then(res => {
        commit(TYPES.MUTATIONS_GET_BANNER, res.banners);
      });
    }
  }
};

export default singer;
