<script setup lang="ts">
  import { zhCN, dateZhCN, darkTheme, useOsTheme } from 'naive-ui'
  import PwaUpdateNotification from '@/components/Pwa/PwaUpdateNotification.vue'

  const osThemeRef = useOsTheme()
  const theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : null))
</script>

<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <PwaUpdateNotification />
            <slot></slot>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style>
  :root {
    color-scheme: light dark;
  }
</style>
