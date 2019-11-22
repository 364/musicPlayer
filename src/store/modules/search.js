import * as TYPES from "@/store/types";
import * as API from "@/api";

const navigation = {
  page: 1,
  pageSize: 30
};

const search = {
  state: {
    searchHot: [],
    searchDefKey: null,
    searchKey: "",
    searchList: {},
    searchMatch: {},
    navigation
  },
  getters: {},
  mutations: {
    [TYPES.MUTATIONS_GET_SEARCH_DEFAULT_KEY](state, data) {
      // 默认搜索词
      const { realkeyword } = data;
      state.searchDefKey = realkeyword || "";
    },
    [TYPES.MUTATIONS_GET_SEARCH_HOT](state, data) {
      // 热搜榜
      state.searchHot = data;
    },
    [TYPES.MUTATIONS_GET_SEARCH_LIST](state, { data, type }) {
      // 搜索列表
      state.searchList = Object.assign({}, data, { type });
    },
    [TYPES.MUTATIONS_GET_SEARCH_SUGGEST](state, data) {
      // 搜索建议
      state.searchMatch = data;
    },
    [TYPES.MUTATIONS_SET_SEARCH_KEY](state, data) {
      // 搜索词
      state.searchKey = data;
    }
  },
  actions: {
    [TYPES.ACTIONS_GET_SEARCH_DEFAULT]({ commit }) {
      // 默认搜索词 / 热搜榜
      Promise.all([API.searchKey(), API.searchHot()]).then(res => {
        // console.log(res)
        if (res.length) {
          commit(TYPES.MUTATIONS_GET_SEARCH_DEFAULT_KEY, res[0].data);
          commit(TYPES.MUTATIONS_GET_SEARCH_HOT, res[1].data);
        }
      });
    },
    [TYPES.ACTIONS_GET_SEARCH_LIST]({ commit }, param) {
      if (param.isMatch) {
        // 搜索建议
        API.searchSuggest(param).then(res => {
          commit(TYPES.MUTATIONS_GET_SEARCH_SUGGEST, res.result);
        });
      } else {
        // 搜索结果
        const { keywords } = param;
        commit(TYPES.MUTATIONS_SET_SEARCH_KEY, keywords);
        API.search(param).then(res => {
          commit(TYPES.MUTATIONS_GET_SEARCH_LIST, {
            data: res.result,
            type: param.type || 1
          });
        });
      }
    }
  }
};

export default search;
