import axios from "./axios";

function api(url = "", data = {}, method = "GET", ...options) {
  method = method.toUpperCase();
  switch (method) {
    case "GET":
      return axios({ url, method, params: data, ...options });
    default:
      return axios({ url, method, data });
  }
}

// 登录
export const login = (params = {}) => api("/login", params, "post", { withCredentials: true });
// banner
export const banner = (params = {}) => api("/banner", params);
// 推荐歌单
export const playlist = (params = {}) => api("/personalized", params);
// 推荐音乐
export const newsong = (params = {}) => api("/personalized/newsong", params);
// 推荐mv
export const mv = (params = {}) => api("/personalized/mv", params);