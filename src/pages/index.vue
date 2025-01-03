<script setup lang="ts">
import HttpRequest from '@/core/http';
import type { ApiResponse } from '@/types';

const message = useMessage();

const staffId = ref<number>(6);
const loading = ref<boolean>(false);

const staff = reactive<any>({});

async function getStaff() {
  console.log(staffId.value);
  loading.value = true;
  try {
    const response = await HttpRequest.get<ApiResponse>(`/accounts/staff/${staffId.value}`);
    message.success('Get staff successfully');
    Object.assign(staff, response.data.result);
  } catch (error: any) {
    message.error(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="home">
    <n-h1>Try get staff by id</n-h1>
    <n-input-number v-model:value="staffId" clearable />
    <n-button :loading="loading" @click="getStaff">Get Staff</n-button>

    <div v-if="staff.name" class="staff">
      <n-grid x-gap="20" :cols="2">
        <n-gi>Name: {{ staff.name }}</n-gi>
        <n-gi>Phone: {{ staff.phoneNumber }}</n-gi>
        <n-gi>Email: {{ staff.email }}</n-gi>
        <n-gi>Gender: {{ staff.gender === 1 ? 'Nam' : 'Nữ' }}</n-gi>
        <n-gi>Address: {{ staff.address }}</n-gi>
      </n-grid>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  padding: 2rem;
}
</style>

<route lang="yaml">
name: Home
meta:
  requiresAuth: true
</route>
