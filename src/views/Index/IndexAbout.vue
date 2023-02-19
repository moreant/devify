<script setup lang="ts">
  const router = useRouter()
  const DATE = '__DATA__'

  const toHome = () => {
    router.push('/')
  }
</script>

<template>
  <div class="center">
    <div style="margin-bottom: 24px">Build on: {{ DATE }}</div>
    <div>
      <NButton @click="toHome"> &lt;- BACK</NButton>
    </div>
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
