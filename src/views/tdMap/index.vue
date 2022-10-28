<template>
  <div id="mapContainerTD" class="map-box">

  </div>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, onMounted, onUnmounted} from 'vue'

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
 * 初始化地图
 */
const map = ref()
const init = () => {
 map.value = new T.Map('mapContainerTD')
 map.value.centerAndZoom(new T.LngLat(120.681255, 28.006125), 10);
  addCtrlMapType()
  createCloudMarkerCollection()
  map.value.addEventListener("moveend", MapMoveend);
}
/**
 * 添加切换地图图层的组件
 */
function addCtrlMapType() {
  const ctrl = new T.Control.MapType([
    {
      title: "地图", //地图控件上所要显示的图层名称
      icon: "http://api.tianditu.gov.cn/v4.0/image/map/maptype/vector.png", //地图控件上所要显示的图层图标（默认图标大小80x80）
      layer: TMAP_NORMAL_MAP, //地图类型对象，即MapType。
    },
    {
      title: "卫星",
      icon: "http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellite.png",
      layer: TMAP_SATELLITE_MAP,
    },
    {
      title: "卫星混合",
      http: "http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellitepoi.png",
      layer: TMAP_HYBRID_MAP,
    },
    {
      title: "地形",
      icon: " http://api.tianditu.gov.cn/v4.0/image/map/maptype/terrain.png",
      layer: TMAP_TERRAIN_MAP,
    },
    {
      title: "地形混合",
      icon: " http://api.tianditu.gov.cn/v4.0/image/map/maptype/terrainpoi.png",
      layer: TMAP_TERRAIN_HYBRID_MAP,
    },
  ]);
  map.value.addControl(ctrl)
}

/**
 * 添加海量图，并可以点击
 */
/**
 * 增加点位
 */
const points = ref<{list:number[], name: string}[]>([]);
const addPoints = () => {
  const pointAll = [];
  for (var i = 0; i < 1000; i++) {
    const position = [Math.random() * 40 + 80, Math.random() * 8 + 20 ]
    pointAll.push({list:position, name: '哈哈'});
  }
  points.value = pointAll;
};
// 造数据
addPoints()
function createCloudMarkerCollection() {
  const cloudCollectionList = []
  let lnglats = [];
  for (var i = 0; i < points.value.length; i++) {

    let data = points.value[i]
    let dataItemList = points.value[i].list

    // dataItemList = dataItemList.split(',')
    let ll = new T.LngLat(dataItemList[0], dataItemList[1])
    ll.content = data
    ll.id = dataItemList[2]
    lnglats.push(ll)

  }
  // @ts-ignore
  if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
    let _CloudCollection = new T.CloudMarkerCollection(lnglats, {
      color: 'red',
      SizeType: TDT_POINT_SIZE_BIG,
    });

    // let oldOnAdd = _CloudCollection.addLayer;// 取出图层的addLayer方法
    //重置添加每个点的 方法
    // _CloudCollection.addLayer = function (t) {
    //   // 修改颜色
    //   // t.options.color = t.or.content.color
    //   //
    //   // if (t.or.content.name == '已确认') {
    //   //   //修改图标形状，具体形状值可以自己尝试打印一下t，在设置图层时设置想要的形状，看下形状对应的shape 值
    //   //   t.options.shape = 3
    //   // }
    //   oldOnAdd.call(this, t);
    // }
    //图层 点绑定点击方法
    _CloudCollection.addEventListener("click", function (e) {
      addClickHandler(e)
    });

    cloudCollectionList.push(_CloudCollection)

  } else {
    alert('此示例目前只有在IE9及以上浏览器打开');
  }
  //之前是多个图层的所以 用了图层容器，后来需要每一层都加点击事件，图层太多就只能点上边的
  let LayerGroup = new T.LayerGroup(cloudCollectionList)
  map.value.addOverLay(LayerGroup);
}

const addClickHandler = (e) => {
  const info = e.layer.or
  console.log('点击点位', info.content.name)
}
/**
 *
 */
const center = ref({
  lng: 120.681255,
  lat: 28.006125
})
const zoom = ref(5)
function MapMoveend(e) {
  // alert(e.target.getCenter().getLng() + "," + e.target.getCenter().getLat());
  const center = map.value.getCenter()
  zoom.value = map.value.getZoom()
  console.log(center, zoom.value)
}
onMounted(() => {
  init()

})
onUnmounted(() => {
  map.value.removeEventListener('moveend', MapMoveend)
})
</script>

<style scoped>
.map-box{
  width: 100%;
  height: 100%;
}

</style>
