<script setup lang="ts">
  import { useICP } from '@/hooks/useICP'

  const router = useRouter()

  const icp = useICP()
</script>

<template>
  <SiteHeader />
  <div class="flex" style="height: calc(100vh - var(--header-height))">
    <div class="flex flex-col w-full items-center justify-center">
      <NH1>{{ icp.ICPName }}</NH1>
      <NSpace>
        <NButton @click="router.push('about')">ToAbout</NButton>
        <NButton @click="router.push({ name: 'base64' })">ToTools</NButton>
      </NSpace>
    </div>
  </div>
  <SiteFooter center />
</template>

<style scoped></style>
