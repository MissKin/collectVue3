import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './fonts/fonts.css'
import "ant-design-vue/dist/antd.css";
import router from './router/index.js'
import BaiduMap from 'vue-baidu-map-3x'

createApp(App)
    .use(BaiduMap, {
      // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
      ak: 'IayHFtG6Sw8oDtPEVIFDG8ODUII17t0l',
      // v:'2.0',  // 默认使用3.0
      // type: 'WebGL' // ||API 默认API  (使用此模式 BMap=BMapGL)
    }).use(router).mount('#app')
