<script setup lang="ts">
  defineProps<{ comCode: number }>()
</script>

<template>
  <div>
    <X01_ZCL_WRTIE_ATTR_REQ v-if="comCode === 1" />
    <X0F_ZCL_CMD_SEND v-if="comCode === 0x0f" />
  </div>
</template>

<style scoped></style>
