<script setup lang="ts">
  import X02_ZclSendIndex from './X02_ZclSendIndex.vue'
  defineProps<{ comType: number; comCode: number }>()
</script>

<template>
  <div>
    <X02_ZclSendIndex v-if="comType === 2" :com-code="comCode" />
    <X0F_ZCL_CMD_SEND v-if="comType === 0xf" />
  </div>
</template>

<style scoped></style>
