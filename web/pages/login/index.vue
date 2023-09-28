<template>
  <div class="ry-login">
    <t-form
      class="ry-login-form"
      ref="form"
      :data="formData"
      :rules="FORM_RULES"
      :colon="true"
      :label-width="0"
      @submit="onSubmit"
    >
      <div class="ry-login-form_logo">LOGIN MIAOMIAO</div>
      <t-form-item name="email">
        <t-input v-model="formData.email" placeholder="邮箱">
          <template #prefix-icon>
            <mail-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item name="password">
        <t-input v-model="formData.password" type="password" placeholder="密码">
          <template #prefix-icon>
            <lock-on-icon />
          </template>
        </t-input>
      </t-form-item>

      <t-form-item>
        <t-button theme="primary" type="submit" block>登录</t-button>
      </t-form-item>
    </t-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";

import { MailIcon, LockOnIcon } from "tdesign-icons-vue-next";
import { Data, FormRules, MessagePlugin } from "tdesign-vue-next";

const formData = reactive({
  email: "",
  password: "",
});
const FORM_RULES: FormRules<Data> = {
  email: [
    { required: true, message: "请输入邮箱" },
    { email: true, message: "格式必须为邮箱", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码" }],
};

const onSubmit = ({ validateResult }) => {
  if (validateResult === true) {
    MessagePlugin.success("开发中~");
  }
};
</script>
<style lang="scss">
.ry-login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ry-login-form {
  width: 80%;
  max-width: 350px;
  padding-bottom: 200px;
}
.ry-login-form_logo {
  text-align: center;
  line-height: var(--td-size-10);
  font-size: var(--td-size-7);
  margin-bottom: var(--td-size-10);
}
</style>
