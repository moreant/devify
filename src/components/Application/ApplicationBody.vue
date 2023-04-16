<script setup lang="ts">
  import { loadingBarApiRef } from '@/routers'
  const loadingBar = useLoadingBar()
  onMounted(() => {
    loadingBarApiRef.value = loadingBar
    loadingBar.finish()
  })
</script>

<template>
  <PwaUpdateNotification />
  <RouterView />
</template>

<style scoped></style>
