<script setup lang="ts">
  const router = useRouter()
</script>

<template>
  <NLayout position="absolute">
    <SiteHeader />
    <NLayout position="absolute" has-sider style="top: var(--header-height)">
      <NLayoutSider bordered content-style="">
        <div style="padding: 24px" @click="router.push({ name: 'base64' })"> Base64 </div>
        <div style="padding: 24px" @click="router.push({ name: 'uuid' })"> UUID </div>
      </NLayoutSider>
      <NLayout
        content-style="min-height: calc(100vh - var(--header-height)); display: flex; flex-direction: column;"
      >
        <ApplicationTransition />
        <SiteFooter />
      </NLayout>
    </NLayout>
  </NLayout>
</template>

<style scoped></style>
