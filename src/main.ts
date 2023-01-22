import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const intervalMS = 5 * 60 * 1000

const { updateServiceWorker } = useRegisterSW({
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

        if (resp?.status === 200) await r.update()
      }, intervalMS)
  },
  onNeedRefresh() {
    const result = window.confirm('检测到有更新，是否更新 APP')
    if (result) {
      updateServiceWorker()
    }
  },
  onOfflineReady() {
    console.log('已离线缓存完毕')
  }
})

createApp(App).mount('#app')
