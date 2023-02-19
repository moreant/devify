<script setup lang="ts">
  import { zhCN, dateZhCN, darkTheme, useOsTheme } from 'naive-ui'

  const osThemeRef = useOsTheme()
  const theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : null))
</script>

<template>
  <NConfigProvider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <NLoadingBarProvider>
      <NDialogProvider>
        <NNotificationProvider>
          <NMessageProvider>
            <ApplicationBody />
          </NMessageProvider>
        </NNotificationProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<style>
  :root {
    color-scheme: light dark;
  }
</style>
