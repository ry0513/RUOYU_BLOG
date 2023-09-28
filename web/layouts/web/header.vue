<template>
  <t-header class="ry">
    <t-head-menu>
      <template #logo>
        <router-link to="/" custom v-slot="{ navigate, href }">
          <t-link :href="href" @click="navigate">RuoYu</t-link>
        </router-link>
      </template>

      <template #operations>
        <router-link to="/control" custom v-slot="{ navigate, href }">
          <t-link :href="href" @click="navigate">后台管理</t-link>
        </router-link>
      </template>
    </t-head-menu>
  </t-header>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
:deep(.t-head-menu__inner) {
  padding: 0 1.5em;
  border-bottom: 1px solid var(--td-border-level-1-color);
}
</style>
