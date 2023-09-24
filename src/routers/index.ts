import { LoadingBarApi } from 'naive-ui'
import { App } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const loadingBarApiRef: Ref<LoadingBarApi | null> = ref(null)

export const toolRoutes: RouteRecordRaw[] = [
  { path: '/uuid', name: 'uuid', component: () => import('@/views/Tools/ToolUuid.vue') },
  {
    path: '/text/base64',
    name: 'base64',
    component: () => import('@/views/Tools/Text/TextBase64.vue')
  },
  {
    path: '/text/radix',
    name: 'TextRadix',
    component: () => import('@/views/Tools/Text/TextRadix.vue')
  },
  {
    path: '/hardware/EByte-Zigbee',
    name: 'EByteZigbee',
    component: () => import('@/views/Tools/Hardware/EByteZigbee.vue')
  }
]

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('@/views/Index/IndexHome.vue') },

  {
    path: '/*',
    component: () => import('@/layout/BaseLayout.vue'),
    children: [
      { path: '/about', component: () => import('@/views/Index/IndexAbout.vue') },
      ...toolRoutes
    ]
  }
]

const bottomRouter: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    alias: '/404',
    component: () => import('@/views/Index/IndexError404.vue')
  }
]

routes.push(...bottomRouter)

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (!from || to.path !== from.path) {
    if (loadingBarApiRef.value) {
      loadingBarApiRef.value.start()
    }
  }
  next()
})

router.afterEach(function (to, from) {
  if (!from || to.path !== from.path) {
    if (loadingBarApiRef.value) {
      loadingBarApiRef.value.finish()
    }
    if (to.hash && to.hash !== from.hash) {
      nextTick(() => {
        const el = document.querySelector(to.hash)
        if (el) el.scrollIntoView()
      })
    }
  }
})

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
