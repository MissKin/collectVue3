<template>
  <input v-model.number="center.lng">
  <input v-model.number="center.lat">
  <input v-model.number="zoom">
  <baidu-map
      class="bm-view"
      ref="mapRef"
      :center="center"
      :zoom="zoom"
      @ready="ready"
      @init="init"
      :scroll-wheel-zoom="true"
      @moving="syncCenterAndZoom"
      @moveend="syncCenterAndZoom"
      @zoomend="syncCenterAndZoom"
  >
    <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_SMALL" @click="clickHandler"></bm-point-collection>
  </baidu-map>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, nextTick} from 'vue'

interface Props {
  count: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 1
})
const emit = defineEmits<{
  (e: 'pageSizeChange', val: number): void;
}>()

defineExpose({})

/***
 * 地图的ready事件来执行地图APi加载完毕才能执行的代码
 */
const mapRef = ref()
const mapInstance = ref()
const ready = ({ BMap, map}) => {
  console.log('ready加载完成')
  mapInstance.value = map
  map.setMapStyleV2({
    styleId: 'dcb13449103a67c5b4629681e9882b68'
  });
}
const init = (e) => {
  console.log('init加载完成', e)
  addPoints()
}
const points = ref<{lng: number, lat: number}[]>([]);
const center = ref({
  lng: 120.681255,
  lat: 28.006125
})
const zoom = ref(5)
const clickHandler = (e) => {
  alert(`单击点的坐标为：${e.point.lng}，${e.point.lat}`);
};
/**
 * 增加点位
 */
const addPoints = () => {
  const pointAll = [];
  for (var i = 0; i < 1000; i++) {
    const position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 };
    pointAll.push(position);
  }
  points.value = pointAll;
};
/**
 * 中点移动和缩放方法
 */
const syncCenterAndZoom = (e) => {
  const { lat, lng } = e.target.getCenter()
  zoom.value = e.target.getZoom()
  nextTick(() => {
    center.value.lat = lat
    center.value.lng = lng
  })

}

</script>

<style scoped>
.bm-view {
  width: 100%;
  height: 100%;
}
</style>
