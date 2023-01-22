<script setup lang="ts">
  import { ref } from 'vue'

  defineProps<{ msg: string }>()

  const count = ref(0)
  count.value = 0

  const reloadSW = '__DATA__'
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>Use PWA</p>
    <p>Build at: {{ reloadSW }}</p>
  </div>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
