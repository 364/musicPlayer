import Axios from "axios";
// import store from "@/store";
import { Message } from "element-ui";

const baseURL = "http://localhost:5000";
const config = {
  baseURL,
  timeout: 1000 * 6,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  }
};

const axios = Axios.create(config);
const tip = (code, msg) => {
  if (code >= 400) {
    Message.error(msg);
  } else if (code >= 300) {
    Message.warning(msg);
  } else {
    Message.success(msg);
  }
};

// 请求拦截器 token
axios.interceptors.request.use(
  config => {
    // console.log('interceptors config',config);
    return config;
  },
  error => Promise.error(error)
);

axios.interceptors.response.use(
  res => {
    return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res);
  },
  err => {
    const { response } = err;
    if (response) {
      const { code, msg } = response.data;
      tip(code, msg);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      if (!window.navigator.onLine) {
        // store.commit("changeNetwork", false);
      } else {
        const { code, message } = err;
        var originalRequest = err.config;
        if (
          (code === "ECONNABORTED" || message.includes("timeout")) &&
          !originalRequest._retry &&
          message != window.err
        ) {
          // 请求超时
          originalRequest._retry = true;
          Message.error("请求超时，重新请求");
          window.err = message;
          return axios.request(originalRequest);
        }
        if (message != window.err) {
          Message.error(message);
          window.err = message;
        }
        return Promise.reject(err);
      }
    }
  }
);

export default axios;
