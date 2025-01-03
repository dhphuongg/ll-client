<script setup lang="ts">
import Logo from '@/assets/LittleLives.png';
import BellIcon from '@/assets/icons/bell.png';
import { useAuthStore } from '@/stores';

const router = useRouter();
const message = useMessage();
const authStore = useAuthStore();

function logout() {
  authStore.logOut();
  router.push('/auth/login');
  message.success('Logout successfully');
}
</script>

<template>
  <header class="app-header">
    <n-flex justify="space-between" align="center">
      <router-link to="/" class="logo">
        <img :src="Logo" alt="" />
      </router-link>
      <n-flex gap="20" align="center">
        <img :src="BellIcon" alt="" />
        <n-button tertiary type="success" :theme-overrides="{ borderRadiusMedium: '10px' }">
          Centre Admin
        </n-button>
        <n-button
          strong
          secondary
          type="error"
          :theme-overrides="{ borderRadiusMedium: '10px' }"
          @click="logout"
        >
          Logout
        </n-button>
      </n-flex>
    </n-flex>
  </header>
</template>

<style scoped lang="scss" src="./style.scss"></style>
