<script setup lang="ts">
  import { loadingBarApiRef } from '@/routers'
  import { themeSetting } from '@/settings/theme'
  const loadingBar = useLoadingBar()
  onMounted(() => {
    loadingBarApiRef.value = loadingBar
    loadingBar.finish()
  })

  const name = themeSetting.page.animateMode
</script>

<template>
  <PwaUpdateNotification />
  <RouterView v-slot="{ Component }">
    <Transition :name="name" mode="out-in" :appear="true">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style scoped></style>
