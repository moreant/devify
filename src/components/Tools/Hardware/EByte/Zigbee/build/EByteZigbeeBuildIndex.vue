<script setup lang="ts">
  import X02_ZclSendIndex from './X02_ZclSendIndex.vue'
  defineProps<{ comType: number; comCode: number }>()
</script>

<template>
  <div>
    <X02_ZclSendIndex v-if="comType === 2" :com-code="comCode" />
  </div>
</template>

<style scoped></style>
