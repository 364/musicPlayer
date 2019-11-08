import * as TYPES from "@/store/types";
import * as API from "@/api";

const navigation = {
  page: 1,
  pageSize: 30
};

const search = {
  state: {
    searchHot: [],
    searchDefKey: "",
    searchKey: "",
    searchList: {},
    searchMatch: {},
    navigation
  },
  getters: {},
  mutations: {
    [TYPES.MUTATIONS_GET_SEARCH_DEFAULT_KEY](state, data) {
      const { realkeyword } = data;
      state.searchDefKey = realkeyword || "";
    },
    [TYPES.MUTATIONS_GET_SEARCH_HOT](state, data) {
      state.searchHot = data;
    },
    [TYPES.MUTATIONS_GET_SEARCH_LIST](state, { data, type }) {
      state.searchList = Object.assign({}, data, { type });
    },
    [TYPES.MUTATIONS_GET_SEARCH_SUGGEST](state, data) {
      state.searchMatch = data;
    },
    [TYPES.MUTATIONS_SET_SEARCH_KEY](state, data) {
      state.searchKey = data;
    }
  },
  actions: {
    [TYPES.ACTIONS_GET_SEARCH_DEFAULT]({ commit }) {
      Promise.all([API.searchKey(), API.searchHot()]).then(res => {
        // console.log(res)
        if (res.length) {
          commit(TYPES.MUTATIONS_GET_SEARCH_DEFAULT_KEY, res[0].data);
          commit(TYPES.MUTATIONS_GET_SEARCH_HOT, res[1].data);
        }
      });
    },
    [TYPES.ACTIONS_GET_SEARCH_LIST]({ commit }, param) {
      // console.log(param)
      if (param.isMatch) {
        API.searchSuggest(param).then(res => {
          commit(TYPES.MUTATIONS_GET_SEARCH_SUGGEST, res.result);
        });
      } else {
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
