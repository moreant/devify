<script setup lang="ts">
  import { toolRoutes } from '@/routers'
  import { renderMenuLabel } from '@/stores/menuOptions'
  import { useICP } from '@/hooks/useICP'

  const route = useRoute()
  const router = useRouter()
  const toHome = () => {
    router.push('/')
  }

  const menuOptions = computed(() => {
    return [
      {
        key: 'home',
        label: '首页',
        path: '/'
      },
      {
        key: 'tool',
        label: '工具',
        path: toolRoutes[0].path
      },
      {
        key: 'about',
        label: '关于',
        path: '/about'
      }
    ]
  })

  const menuValue = computed(() => {
    if (route.path === '/') {
      return 'home'
    }
    if (route.path === '/about') {
      return 'about'
    }
    if (toolRoutes.findIndex((i) => i.path === route.path) > -1) {
      return 'tool'
    }
    return null
  })

  const icp = useICP()
</script>

<template>
  <NLayoutHeader bordered class="nav">
    <NText tag="div" :depth="1" class="text-2xl cursor-pointer" @click="toHome">
      {{ icp.name }}
    </NText>
    <div>
      <NMenu
        mode="horizontal"
        :value="menuValue"
        :options="menuOptions"
        :render-label="renderMenuLabel"
      />
    </div>
    <div></div>
  </NLayoutHeader>
</template>

<style scoped>
  .nav {
    --side-padding: 32px;
    display: grid;
    grid-template-rows: calc(var(--header-height) - 1px);
    grid-template-columns: calc(272px - var(--side-padding)) 1fr auto;
    align-items: center;
    padding: 0 var(--side-padding);
  }
</style>
