import * as TYPES from "@/store/types";
import * as API from "@/api";

const navigation = {
  page: 1,
  pageSize: 30
};

const search = {
  state: {
    searchHot: [],
    searchKey: "",
    searchList: [],
    navigation
  },
  getters: {},
  mutations: {
    [TYPES.MUTATIONS_GET_SEARCH_KEY](state, data) {
      const { realkeyword } = data;
      state.searchKey = realkeyword || "";
    },
    [TYPES.MUTATIONS_GET_SEARCH_HOT](state, data) {
      state.searchHot = data;
    },
    [TYPES.MUTATIONS_GET_SEARCH_LIST](state, data) {
      const { songs } = data;
      state.searchList = songs;
    }
  },
  actions: {
    [TYPES.ACTIONS_GET_SEARCH_DEFAULT]({ commit }) {
      Promise.all([API.searchKey(), API.searchHot()]).then(res => {
        // console.log(res)
        if (res.length) {
          commit(TYPES.MUTATIONS_GET_SEARCH_KEY, res[0].data);
          commit(TYPES.MUTATIONS_GET_SEARCH_HOT, res[1].data);
        }
      });
    },
    [TYPES.ACTIONS_GET_SEARCH_LIST]({ commit }, param) {
      API.search(param).then(res => {
        commit(TYPES.MUTATIONS_GET_SEARCH_LIST, res.result);
      });
    }
  }
};

export default search;
