import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

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

export default router
