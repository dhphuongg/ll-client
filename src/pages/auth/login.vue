<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui';

import type { LoginRequest } from '@/types';
import { AuthService } from './services';

const router = useRouter();
const route = useRoute();
const message = useMessage();

const formRef = useTemplateRef<FormInst>('login-form-ref');
const account = reactive<LoginRequest>({ email: '', password: '' });

const rules: FormRules = {
  email: [
    {
      required: true,
      validator(_, value: string) {
        if (!value) {
          return new Error('Email is required');
        } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) {
          return new Error('Email not valid');
        }
        return true;
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      message: 'Password is required',
      trigger: ['input', 'blur']
    }
  ]
};

function loginHandler() {
  if (!formRef.value) return;
  formRef.value.validate(async (errors) => {
    if (!errors || errors.length === 0) {
      try {
        await AuthService.login(account);
        message.success('Login successfully');
        router.push((route.query.redirect as string) || '/');
      } catch (error: any) {
        message.error(error.message || 'Login failed');
      }
    }
  });
}
</script>

<template>
  <div class="login">
    <n-h1 class="title">Login</n-h1>
    <n-form ref="login-form-ref" class="login-form" :rules="rules" :model="account" @submit.prevent>
      <n-form-item path="email" required label="Email">
        <n-input type="text" placeholder="Email" v-model:value="account.email" />
      </n-form-item>
      <n-form-item path="password" required label="Password">
        <n-input
          type="password"
          placeholder="Password"
          show-password-on="click"
          v-model:value="account.password"
        />
      </n-form-item>

      <n-form-item class="login-button" :show-label="false" :show-feedback="false">
        <login-button @login="loginHandler" />
      </n-form-item>
    </n-form>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 680px;
  margin: 0 auto;
  padding: 0 20px;
  .title {
    text-align: center;
    color: $primary;
  }
  .login-button {
    display: flex;
    justify-content: center;
  }
}
</style>

<route lang="yaml">
name: Login
meta:
  layout: auth
</route>
