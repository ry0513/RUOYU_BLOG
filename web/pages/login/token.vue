<template>
  <div>{{ msg }}</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/store";
import { useRouter, useRoute } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const msg = ref("跳转中...");
onMounted(async () => {
  const status = await userStore.login(route.query as loginData);
  if (status) {
    await userStore.getUserInfo(router);
    userStore.cancelRegisterRoute({ resetRoute: true });
    router.replace((route.query.path as string) || "/");
  } else {
    msg.value = "登录认证失败，3 秒后返回首页";
    setTimeout(() => {
      router.replace("/");
    }, 3000);
  }
});
</script>
