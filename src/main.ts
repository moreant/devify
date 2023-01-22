import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onRegisteredSW() {
    console.log('更新中')
  },
  onNeedRefresh() {
    console.log('onNeedRefresh')
    const result = window.confirm('onNeedRefresh')
    if (result) {
      updateSW()
    }
  },
  onOfflineReady() {
    console.log('onOfflineReady')
  }
})

createApp(App).mount('#app')
