import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../components/HelloWorld.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'BigScreen',
    meta: {title:'大屏', keepAlive: false},
    component:()=>import('@/views/bigScreen/index.vue'),
  },
  {
    path: '/baiduMap',
    name: 'baiduMap',
    meta: {title:'百度地图', keepAlive: false},
    component: () => import('@/views/baiduMap/index.vue')
  },
  {
    path: '/gaodeMap',
    name: 'gaodeMap',
    meta: {title:'高德地图', keepAlive: false},
    component: () => import('@/views/gaodeMap/index.vue')
  },
  {
    path: '/tdMap',
    name: 'tdMap',
    meta: {title:'天地图地图', keepAlive: false},
    component: () => import('@/views/tdMap/index.vue')
  },
  {
    path: '/example',
    name: 'example',
    meta: {title:'例子', keepAlive: false},
    component: () => import('@/views/example/index.vue')
  },
]

// @ts-ignore
const router = createRouter({
  history: createWebHistory(),
  routes
})

// @ts-ignore
export default router
