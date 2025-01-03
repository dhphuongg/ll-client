<script setup lang="ts">
import { Icon } from '@iconify/vue';

const emits = defineEmits<{ (event: 'login'): void }>();
</script>

<template>
  <n-button @click="emits('login')">
    Login
    <Icon icon="material-symbols:login" width="24" height="24" />
  </n-button>
</template>
