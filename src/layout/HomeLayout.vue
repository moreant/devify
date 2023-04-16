<script setup lang="ts">
  const router = useRouter()
  const toAbout = () => {
    router.push('/about')
  }
</script>

<template>
  <NLayout position="absolute">
    <SiteHeader />
    <NButton @click="toAbout">ToAbout</NButton>
    <NButton @click="router.push({ name: 'base64' })">ToTools</NButton>
  </NLayout>
</template>

<style scoped></style>
