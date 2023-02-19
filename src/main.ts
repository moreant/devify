import { createApp } from 'vue'
import App from './App.vue'

import { setupAssets } from './plugins'
import { setupRouter } from './routers'

async function setupApp() {
  // import assets: js、css
  setupAssets()

  const app = createApp(App)

  // store plugin: pinia
  // setupStore(app)

  // vue custom directives
  // setupDirectives(app)

  // vue router
  await setupRouter(app)

  // mount app
  app.mount('#app')
}

setupApp()
