<script setup lang="ts">
  import { createOptions } from '@/stores/menuOptions'
  import { MenuOption } from 'naive-ui'

  const options: MenuOption[] = createOptions()
</script>

<template>
  <NLayout position="absolute">
    <SiteHeader />
    <NLayout position="absolute" has-sider style="top: var(--header-height)">
      <NLayoutSider
        :native-scrollbar="false"
        :collapsed-width="0"
        collapse-mode="transform"
        trigger-style="top: 240px;"
        collapsed-trigger-style="top: 240px; right: -20px;"
        bordered
        show-trigger="arrow-circle"
      >
        <NMenu :options="options" />
      </NLayoutSider>
      <NLayout
        content-style="min-height: calc(100vh - var(--header-height)); display: flex; flex-direction: column;"
      >
        <ApplicationTransition />
        <SiteFooter />
      </NLayout>
    </NLayout>
  </NLayout>
</template>

<style scoped></style>
