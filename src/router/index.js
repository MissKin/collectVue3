import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// import { beforeEach, afterEach } from './permission'
// import layout from '@/layout/index.vue'
// import store from '@/store'


export const constantRouterMap = [

  {
    path: '/baiduMap',
    component: () => import('src/views/baiduMap/index.vue'),

  },

]


/**
 * createWebHistory 不带#号
 * createWebHashHistory
 */
const router = createRouter({
  routes: constantRouterMap
})
// router.beforeEach(beforeEach)
// router.afterEach(afterEach)
export default router
