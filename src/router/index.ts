import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../components/HelloWorld.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HelloWorld',
    component:()=>import('@/components/HelloWorld.vue'),
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
