import { createPinia } from "pinia";
import { createSSRApp } from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createHead } from "@vueuse/head";
import "tdesign-vue-next/dist/reset.css";
import "tdesign-vue-next/es/style/index.css";
import tdesign from "tdesign-vue-next";

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  const store = createPinia();
  const head = createHead();
  app.use(store).use(router).use(head).use(tdesign);

  return { app, store, router, head };
}
