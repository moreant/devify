<script setup lang="ts">
  const router = useRouter()
</script>

<template>
  <SiteHeader />
  <div class="flex" style="height: calc(100vh - var(--header-height))">
    <div class="flex flex-col w-full items-center justify-center">
      <NH1>Devify</NH1>
      <NSpace>
        <NButton @click="router.push('about')">ToAbout</NButton>
        <NButton @click="router.push({ name: 'base64' })">ToTools</NButton>
      </NSpace>
    </div>
  </div>
  <SiteFooter />
</template>

<style scoped></style>
