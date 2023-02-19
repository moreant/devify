<script setup lang="ts">
  const router = useRouter()
  const DATE = '__DATA__'

  const toAbout = () => {
    router.push('/about')
  }
</script>

<template>
  <div class="center">
    <div style="margin-bottom: 24px; visibility: hidden">Build on: {{ DATE }}</div>
    <NButton type="primary" @click="toAbout()"> ABOUT -&gt;</NButton>
  </div>
</template>

<style scoped>
  .center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
