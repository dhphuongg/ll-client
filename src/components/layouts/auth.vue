<script setup lang="ts">
import Logo from '@/assets/LittleLives.png';
import BellIcon from '@/assets/icons/bell.png';
</script>

<template>
  <header class="auth-header">
    <router-link to="/"> <img :src="Logo" alt="" /> </router-link>
  </header>
  <div class="auth-layout">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.auth-header {
  height: $header-height;
  padding: 20px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}
.auth-layout {
  height: calc(100vh - #{$header-height} - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
