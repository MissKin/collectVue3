<template>
  <div class="map" style="width: 100%; height: 100%;">
    <div>
      <input v-model.number="center.lng">
      <input v-model.number="center.lat">
      <input v-model.number="zoom">
    </div>
    <div class="flex-1">
      <el-amap ref="mapRef" :center="[center.lng, center.lat]" :events="mapEvents" :zoom="zoom" @init="init">
        <el-amap-layer-labels>
          <el-amap-label-marker
              v-for="(point, index) in points" :key="index"
              :visible="true"
              :position="point"
              :text="labelOptions.text"
              :icon="labelOptions.icon"
              @click="clickMarker"
          />
        </el-amap-layer-labels>
      </el-amap>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, shallowRef, toRefs, computed, onMounted, watchEffect } from 'vue'
const map = ref()

const center = ref({
  lng: 120.681255,
  lat: 28.006125
})
const zoom = ref(5)
/** 地图实例    （shallowRef：如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换） */
const myMap = shallowRef(null)
const mapEvents = ref({
})
 const labelOptions = ref({
   visible: true,
   position: [121.5495395, 31.21515044],
   text: {
     content: '测试content',
     direction: 'right',
     style: {
       fontSize: 15,
       fillColor: '#fff',
       strokeColor: 'rgba(255,0,0,0.5)',
       strokeWidth: 2,
       padding: [3, 10],
       backgroundColor: 'yellow',
       borderColor: '#ccc',
       borderWidth: 3,
     }
   },
   icon: {
     image: 'https://a.amap.com/jsapi_demos/static/images/poi-marker.png',
     anchor: 'bottom-center',
     size: [25, 34],
     clipOrigin: [459, 92],
     clipSize: [50, 68]
   }
 })
const clickMarker = (e) => {
  alert('click marker');
}
const mapRef = ref()
const init = (map: any) => {
  myMap.value = map
  // init后地图样式更改，获取到map实例
  map.setMapStyle('amap://styles/eeaa712ca7357c39193fc1ebbb3889f3');//自定义的高德地图的样式，我选的是马卡龙
  addPoints()
}



/**
 * 增加点位
 */
const points = ref<number[][]>([]);
const addPoints = () => {
  const pointAll = [];
  for (var i = 0; i < 1000; i++) {
    const position = [Math.random() * 40 + 85, Math.random() * 30 + 21 ]
    pointAll.push(position);
  }
  points.value = pointAll;
};

onMounted(() => {

})
</script>

<style lang="scss" scoped>
.map {
  display: flex;
  flex-direction: column;
}
.flex-1{
  flex: 1;
}
.map-info-box{
  .title{
    width: 50px;
  }
}

</style>
<style lang="scss">
.amap-sug-result{
  z-index: 9999;
}
</style>

