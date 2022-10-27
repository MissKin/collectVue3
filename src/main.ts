import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './fonts/fonts.css'
import "ant-design-vue/dist/antd.css";
import router from './router'
import { createPinia } from 'pinia'
const pinia = createPinia();
// 百度地图
import BaiduMap from 'vue-baidu-map-3x'
// 高德地图
import VueAMap, { initAMapApiLoader } from '@vuemap/vue-amap'
import '@vuemap/vue-amap/dist/style.css'

initAMapApiLoader({
  key: '77a0fe6bf8788f6b839a3d0201d2fa89', // 金莉卷的高德
  securityJsCode: 'c1e538a261b40d472dc6df75ad364411', // 加密
  plugins: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.Geocoder'
  ]
})

createApp(App).use(router).use(pinia).use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'IayHFtG6Sw8oDtPEVIFDG8ODUII17t0l',
  v:'3.0',  // 默认使用3.0
  type: 'API' // ||API 默认API  (使用此模式 BMap=BMapGL)
}).use(VueAMap).mount('#app')
