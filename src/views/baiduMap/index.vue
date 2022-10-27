<template>
  <baidu-map class="bm-view" :center="{lng: 116.404, lat: 39.915}" @ready="init">
    <bm-point-collection :points="points" shape="BMAP_POINT_SHAPE_STAR" color="red" size="BMAP_POINT_SIZE_SMALL" @click="clickHandler"></bm-point-collection>
  </baidu-map>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs} from 'vue'

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

// 地图的ready事件来执行地图APi加载完毕才能执行的代码
const init = (e) => {
  console.log('加载完成', e)
}
const points = ref<{lng: number, lat: number}[]>([]);

const clickHandler = (e) => {
  alert(`单击点的坐标为：${e.point.lng}，${e.point.lat}`);
};

const addPoints = () => {
  const pointAll = [];
  for (var i = 0; i < 1000; i++) {
    const position = { lng: Math.random() * 40 + 85, lat: Math.random() * 30 + 21 };
    pointAll.push(position);
  }
  points.value = pointAll;
};
</script>

<style scoped>
.bm-view {
  width: 100%;
  height: 300px;
}
</style>
