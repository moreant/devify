<script setup lang="ts">
  const router = useRouter()

  const toHome = () => {
    router.push('/')
  }
</script>

<template>
  <NResult
    status="404"
    title="404 资源不存在"
    description="生活总归带点荒谬"
    style="margin-top: 48px"
  >
    <template #footer>
      <NButton @click="toHome">找点乐子吧</NButton>
    </template>
  </NResult>
</template>

<style scoped></style>
