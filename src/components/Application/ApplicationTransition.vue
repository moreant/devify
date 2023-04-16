<script setup lang="ts">
  import { themeSetting } from '@/settings/theme'
  const name = themeSetting.page.animateMode
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Transition :name="name" mode="out-in" :appear="true">
      <Component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style scoped></style>
