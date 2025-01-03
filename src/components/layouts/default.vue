<template>
  <div class="main-layout">
    <app-header />
    <router-view v-slot="{ Component, route }">
      <transition name="slide">
        <div>
          <component :is="Component" :key="route" />
        </div>
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.main-layout {
  width: 100%;
}
</style>
