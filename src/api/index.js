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
// 歌单
export const playlist = (params = {}) => api("/top/playlist", params);
