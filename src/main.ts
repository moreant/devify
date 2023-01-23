import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import '@/utils/serviceWorker'
import '@/utils/disabledTouchZoom'

createApp(App).mount('#app')
