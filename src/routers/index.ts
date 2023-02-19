import { LoadingBarApi } from 'naive-ui'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const loadingBarApiRef: Ref<LoadingBarApi | null> = ref(null)

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('@/views/Index/IndexHome.vue') },
  { path: '/about', component: () => import('@/views/Index/IndexAbout.vue') }
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

export default router
