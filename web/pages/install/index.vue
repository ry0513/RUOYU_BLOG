<template>
  <div class="ry-install-config-container">
    <t-form
      ref="form"
      :rules="FORM_RULES"
      :data="formData"
      :colon="false"
      resetType="initial"
      @submit="onSubmit"
    >
      <!-- MySQL 配置 -->
      <div class="ry-install-title">MySQL 配置</div>
      <t-form-item label="主机" name="db_host">
        <t-input
          v-model="formData.db_host"
          placeholder="请输入内容"
          @enter="onEnter"
        />
      </t-form-item>
      <t-form-item label="端口" name="db_port">
        <t-input
          v-model="formData.db_port"
          placeholder="请输入内容"
          @enter="onEnter"
        />
      </t-form-item>
      <t-form-item label="名称" name="db_database">
        <t-input
          v-model="formData.db_database"
          placeholder="请输入内容"
          @enter="onEnter"
        />
      </t-form-item>
      <t-form-item label="用户名" name="db_user">
        <t-input
          v-model="formData.db_user"
          placeholder="请输入内容"
          @enter="onEnter"
        />
      </t-form-item>
      <t-form-item label="密码" name="db_passwd">
        <t-input
          v-model="formData.db_passwd"
          placeholder="请输入内容"
          type="password"
          @enter="onEnter"
        />
      </t-form-item>

      <!-- Redis 配置 -->
      <div class="ry-install-title">Redis 配置</div>
      <t-form-item label="主机" name="redis_host">
        <t-input
          v-model="formData.redis_host"
          placeholder="请输入内容"
          @enter="onEnter"
        />
      </t-form-item>
      <t-form-item label="端口" name="redis_port">
        <t-input
          v-model="formData.redis_port"
          placeholder="请输入内容"
          @enter="onEnter"
        />
      </t-form-item>
      <t-form-item label="密码" name="redis_passwd">
        <t-input
          v-model="formData.redis_passwd"
          placeholder="请输入内容"
          type="password"
          @enter="onEnter"
        />
      </t-form-item>
      <t-form-item label="数据库" name="redis_db">
        <t-select v-model="formData.redis_db">
          <t-option
            v-for="(item, i) in 16"
            :key="i"
            :label="i.toString()"
            :value="i"
          />
        </t-select>
      </t-form-item>

      <!-- Account 配置 -->
      <div class="ry-install-title">Account 配置</div>
      <t-form-item label="Api" name="account_api">
        <t-input
          v-model="formData.account_api"
          placeholder="请输入内容"
          @enter="onEnter"
        />
      </t-form-item>
      <t-form-item label="Token" name="account_token">
        <t-input
          v-model="formData.account_token"
          placeholder="请输入内容"
          @enter="onEnter"
        />
      </t-form-item>
      <t-form-item label="AppId" name="account_appId">
        <t-input
          v-model="formData.account_appId"
          placeholder="请输入内容"
          @enter="onEnter"
        />
      </t-form-item>
      <t-form-item label="ServeKey" name="account_serveKey">
        <t-input
          v-model="formData.account_serveKey"
          placeholder="请输入内容"
          @enter="onEnter"
        />
      </t-form-item>
      <t-form-item label="ClientKey" name="account_clientKey">
        <t-input
          v-model="formData.account_clientKey"
          placeholder="请输入内容"
          @enter="onEnter"
        />
      </t-form-item>

      <t-form-item>
        <t-space size="small">
          <t-button theme="primary" type="submit">立即安装</t-button>
        </t-space>
      </t-form-item>
    </t-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { LoadingPlugin, MessagePlugin, SubmitContext } from "tdesign-vue-next";
import { useHead } from "@vueuse/head";
import { _postInitConfig } from "@/api/init";
import { _getPing } from "@/api/system";

useHead({
  title: "安装页面 - RuoYu Blog",
});

const FORM_RULES = {
  db_host: [{ required: true }],
  db_port: [{ required: true }],
  db_database: [{ required: true }],
  db_user: [{ required: true }],
  db_passwd: [{ required: true }],

  redis_host: [{ required: true }],
  redis_port: [{ required: true }],
  redis_passwd: [{ required: true }],
  redis_db: [{ required: true }],

  account_api: [{ required: true }],
  account_token: [{ required: true }],
  account_appId: [{ required: true }],
  account_serveKey: [{ required: true }],
  account_clientKey: [{ required: true }],
};

const formData = reactive({
  db_host: "",
  db_port: "",
  db_database: "",
  db_user: "",
  db_passwd: "",

  redis_host: "",
  redis_port: "",
  redis_passwd: "",
  redis_db: "",

  account_api: "",
  account_token: "",
  account_appId: "",
  account_serveKey: "",
  account_clientKey: "",
});
const form = ref(null);

const onSubmit = ({ validateResult, firstError }: SubmitContext<FormData>) => {
  if (validateResult === true) {
    const loading = LoadingPlugin({
      fullscreen: true,
      attach: "body",
      indicator: false,
      text: "生成配置中...",
    });
    _postInitConfig(formData)
      .then(() => {
        loading.hide();
        LoadingPlugin({
          fullscreen: true,
          attach: "body",
          indicator: false,
          text: "重启服务中...",
        });
        ping();
      })
      .catch(() => {
        loading.hide();
      });
  }
};

const ping = () => {
  setTimeout(() => {
    _getPing()
      .then(() => window.location.replace("/"))
      .catch((err) => ping());
  }, 5000);
};
// 禁用 Input 组件，按下 Enter 键时，触发 submit 事件
const onEnter = (_: any, { e }: any) => {
  e.preventDefault();
};
</script>

<style lang="scss" scoped>
.ry-install-config-container {
  width: 100%;
  max-width: 800px;
  margin: var(--td-size-10) auto;
  border: 1px solid var(--td-gray-color-4);
  padding: var(--td-size-6);
}
.ry-install-title {
  text-align: center;
  line-height: var(--td-size-10);
  font-size: var(--td-size-6);
  margin-bottom: var(--td-size-6);
  border-bottom: 1px solid var(--td-gray-color-4);
}
</style>
