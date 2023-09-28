<template>
  <t-layout>
    <Header />
    <t-content class="ry-content"><router-view /></t-content>
  </t-layout>
</template>
<script lang="ts" setup>
import Header from "./header.vue";
</script>
<style scoped lang="scss">
.t-layout {
  background: #fff;
}
</style>
