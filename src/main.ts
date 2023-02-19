import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import '@/utils/serviceWorker'
import '@/utils/disabledTouchZoom'
import router from './routers'

// https://www.naiveui.com/zh-CN/os-theme/docs/style-conflict
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(App)
app.use(router)
app.mount('#app')
