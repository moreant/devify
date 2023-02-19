<script setup lang="ts">
  import { createDiscreteApi, NButton } from 'naive-ui'
  import { useRegisterSW } from 'virtual:pwa-register/vue'

  const { notification } = createDiscreteApi(['notification'], {
    notificationProviderProps: {
      placement: 'bottom'
    }
  })

  const intervalMS = 5 * 60 * 1000

  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      console.log(`Service Worker at: ${swUrl}`)

      r &&
        setInterval(async () => {
          console.log('Checking for sw update')

          if (!(!r.installing && navigator)) return

          if ('connection' in navigator && !navigator.onLine) return

          const resp = await fetch(swUrl, {
            cache: 'no-store',
            headers: {
              cache: 'no-store',
              'cache-control': 'no-cache'
            }
          })

          if (resp?.status === 200) {
            await r.update()
          }
        }, intervalMS)
    },
    onOfflineReady() {
      console.log('已离线缓存完毕')
    }
  })

  watch(needRefresh, (val) => {
    if (val) {
      notification.create({
        type: 'info',
        title: '刷新应用',
        content: '更新已完成，请刷新页面以使用新版本',
        meta: '刷新应用将丢失当前内容，请注意保存',
        action: () =>
          h(
            NButton,
            {
              text: true,
              type: 'info',
              onClick: () => {
                updateServiceWorker()
              }
            },
            { default: () => '刷新' }
          )
      })
    }
  })
</script>

<template>
  <div></div>
</template>

<style scoped></style>
