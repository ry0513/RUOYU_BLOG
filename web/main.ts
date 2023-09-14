import { createPinia } from "pinia";
import { createSSRApp } from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createHead } from "@vueuse/head";
import "tdesign-vue-next/dist/reset.css";
import "tdesign-vue-next/es/style/index.css";

export function createApp() {
  const app = createSSRApp(App);
  const router = createRouter();
  const store = createPinia();
  const head = createHead();
  app.use(store);
  app.use(router);
  app.use(head);
  return { app, store, router, head };
}
