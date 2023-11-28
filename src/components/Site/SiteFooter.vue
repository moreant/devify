<script setup lang="ts">
  import { useICP } from '@/hooks/useICP'

  withDefaults(
    defineProps<{
      center?: boolean
    }>(),
    {
      center: false
    }
  )

  const icp = useICP()

  document.title = icp.name + ' - next'

  const DATE = '__DATA__'
</script>

<template>
  <NLayoutFooter bordered style="margin-top: auto">
    <div class="p-4 text-gray-400" :class="{ 'text-center': center }">
      <div> Build on: {{ DATE }} </div>
      <div>
        <a class="text-gray-400" href="https://beian.miit.gov.cn">{{ icp.ICP }}</a>
      </div>
    </div>
  </NLayoutFooter>
</template>

<style scoped></style>
