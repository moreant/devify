<script setup lang="ts">
  const router = useRouter()
  const toHome = () => {
    router.push('/')
  }
</script>

<template>
  <NLayoutHeader bordered class="nav" @click="toHome">
    <span class="text-2xl"> Devify </span>
  </NLayoutHeader>
</template>

<style scoped>
  .nav {
    --side-padding: 32px;
    display: grid;
    grid-template-rows: calc(var(--header-height) - 1px);
    align-items: center;
    padding: 0 var(--side-padding);
  }
</style>
