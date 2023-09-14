import axios from "axios";
import qs from "qs";
import { NotifyPlugin } from "tdesign-vue-next";
const instance = axios.create({
  baseURL: import.meta.env.SSR
    ? `http://127.0.0.1:${process.env.NODE_PORT || 3500}/api`
    : "/api",
  timeout: 1000 * 10,
  withCredentials: true,
});
// 请求拦截器
instance.interceptors.request.use(async (config) => {
  if (config.headers["Content-Type"] !== "multipart/form-data") {
    config.data = config.data && qs.stringify(config.data);
  }
  return config;
});

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (data.code === 0) {
      return response;
    } else if ([-3, -4].includes(data.code) && !import.meta.env.SSR) {
      NotifyPlugin.error({
        title: data.title || data.msg,
        content: data.describe,
        closeBtn: true,
      });
    }
    return Promise.reject(data);
  },
  async (err) => {
    const { config } = err;
    if (!config || !config.retry) {
      return Promise.reject(err);
    }
    config.retryCount = config.retryCount || 0;
    if (config.retryCount >= config.retry) {
      return Promise.reject(err);
    }

    config.retryCount += 1;

    const backoff = new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, config.retryDelay || 1);
    });

    await backoff;
    return await instance(config);
  }
);
export default instance;
