<!-- 天地图的API：http://lbs.tianditu.gov.cn/api/js4.0/class.html -->
<template>
  <div class="tdwrapper">
    <!-- 搜索菜单 -->
    <div class="search-box">
      <div class="input_box">
        <input class="input_inner" placeholder="输入关键字" v-model="search_word" @keydown.enter="localsearch.search(search_word,7)"/>
        <el-icon class="serach_icon" size="18px" @click="localsearch.search(search_word,7)">
          <Search/>
        </el-icon>
      </div>
      <div v-if="suggests.length" class="search_wrapper">
        <div class="suggest_item" v-for="(item, TIndex) in suggests" :key="TIndex" @click="handlePois(item)">
          <div class="suggest_item_name">{{item.name}}</div>
          <div class="suggest_item_address ellipsis">{{item.address}}</div>
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="btns-box">
      <el-button type="primary" @click="handleContentMenu">鼠标右击添加菜单</el-button>
      <el-button type="primary" @click="handleAddBrushTool">{{brushObj.flag ? '关闭' : '开启'}}画笔</el-button>
      <el-button v-show="brushObj.flag" type="primary" @click="clearBrush">清除画笔痕迹</el-button>
      <el-button type="primary" @click="drawGeojson()">绘制geojson</el-button>
      <el-form inline>
        <el-form-item label="经度">
          <el-input v-model="markpoint.lng"/>
        </el-form-item>
        <el-form-item label="纬度">
          <el-input v-model="markpoint.lat"/>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="handleLngLatMarker">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="warning" @click="clearAll">一键清除</el-button>
    </div>
    <!-- 数据类型 -->
    <div class="data-box">
      <el-checkbox v-model="dotCheck" label="花朵点位" size="large" @change="handleAddMarker"/>
    </div>
    <div id="mapContainerTD" class="map-box"></div>
  </div>
  
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, onMounted, onUnmounted} from 'vue'
import {getIcon} from '@/utils/index'
import {SuggestProps} from './type'
import { Search } from '@element-plus/icons-vue'
import tdtUtils from '../js/tdt_utils'
import wenzhouJson from '@/assets/json/wenzhou.json'

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
  map.value = new T.Map('mapContainerTD', {
    // 地图的投影方式 EPSG:900913(墨卡托投影)，EPSG:4326(大地平面投影)
    projection: "EPSG:4326",
    // min 0 max 18
    minZoom: 5,
    maxZoom: 18,
 })
 //centerAndZoom 是显示该地图的中心点
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
      icon: "http://api.tianditu.gov.cn/v4.0/image/map/maptype/satellitepoi.png",
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
 * 中心点和缩放
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
/**
 * 右键菜单
 */
const handleContentMenu = () => {
  // 菜单列表
  const txtMenuItem = [
      {
        text: '放大',
        callback: function () {
          map.value.zoomIn()
        }
      },
      {
        text: '缩小',
        callback: function () {
            map.value.zoomOut()
        }
      },
      {
        text: '放置到最大级',
        callback: function () {
            map.value.setZoom(18)
        }
      },
      {
        text: '查看全国',
        callback: function () {
            map.value.setZoom(4)
        }
      }
  ];
  const menu = tdtUtils.createContextMenu(txtMenuItem, {})


  //添加右键菜单
  map.value.addContextMenu(menu);
}
/**
 * 自定义标注:图标和点击事件
 */
const dotCheck = ref<boolean>(false)
const markers = []
const handleAddMarker = (val) => {
  if(val) {
    removeMarker()
    // 随机向地图添加25个标注
    var bounds = map.value.getBounds(); // 地图的范围内
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var lngSpan = Math.abs(sw.lng - ne.lng);
    var latSpan = Math.abs(ne.lat - sw.lat);
    
    const icon = new T.Icon({
      iconUrl: getIcon('td/icon_flower.png'),
      iconSize: new T.Point(32,32),
      iconAnchor: new T.Point(10,25)
    })
    for (var i = 0; i < 25; i++) {
      var point = new T.LngLat(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
      var marker = new T.Marker(point, {
        icon: icon
      });// 创建标注
      markers.push(marker)
      map.value.addOverLay(marker);
      marker.addEventListener('click', function(o) {
        console.log(o, '7777');
      })
    }
  } else {
    removeMarker()
  }
}
// 清除点位
const removeMarker = () => {
  const mLen = markers.length
  for (let i = 0; i < mLen; i++) {
    map.value.removeOverLay(markers[i]);
  }
}
/**
 * 添加画笔工具
 */
const brushObj = reactive({
  flag: false,
  handle: null
})
const brushLayer = ref()
const handleAddBrushTool = () => {
  if(!brushObj.handle) {
    brushObj.handle = new T.PaintBrushTool(map.value, { // 在地图容器中，创建一个可以随意画线的画笔工具。
      keepdrawing: true, // 保持工具的连续可用性。
      style: { // 画笔留下笔迹的样式。
        color:"blue",weight:3,opacity:0.5
      }
    })
  } 
  brushObj.flag = !brushObj.flag
  if(brushObj.flag) {
    // @ts-ignore
    brushObj.handle?.open()
  } else {
    // @ts-ignore
    brushObj.handle?.close()
  }
}

const clearBrush = () => {
  // @ts-ignore
  brushObj.handle?.clear()
}
/**
 * 天地图上的搜索框
 */
const search = reactive<{suggests: SuggestProps[], keyword:String}>({
  keyword: '',
  suggests: []
})
const { keyword, suggests} = toRefs(search)
const localsearch = ref()
const infoWin = ref()
// 清除搜索列表
function clearAll() {
  map.value.clearOverLays()
  search.keyword = ''
  search.suggests = []
    // map.clearOverLays();
    // document.getElementById("suggestsDiv").innerHTML = "";
    // document.getElementById("suggestsDiv").style.display = "none";
}
const handleSearch = () => {

  //解析建议词信息
  function suggests(obj) {
    if (obj) {
      search.suggests = obj
      //建议词提示，如果搜索类型为公交规划建议词或公交站搜索时，返回结果为公交信息的建议词。
      // var suggestsHtml = "<div style='margin-left:8px;'>建议词提示</div><ul>";
      // for (var i = 0; i < obj.length; i++) {
      //     suggestsHtml += "<li>" + obj[i].name + "&nbsp;&nbsp;<font style='color:#666666'>" + obj[i].address + "</font></li>";
      // }
      // suggestsHtml += "</ul>";
      // document.getElementById("suggestsDiv").style.display = "block";
      // document.getElementById("suggestsDiv").innerHTML = suggestsHtml;
    }
  }
  
  const localSearchResult = (result) => {
    console.log('result', result.getPois());
    
    //清空地图及搜索列表
    clearAll();
    //根据返回类型解析搜索结果
    switch (parseInt(result.getResultType())) {
      case 1:
        //解析点数据结果
        search.suggests = result.getPois()
        break;
      // case 2:
      //     //解析推荐城市
      //     statistics(result.getStatistics());
      //     break;
      // case 3:
      //     //解析行政区划边界
      //     area(result.getArea());
      //     break;
    }
    //解析建议词信息
    // suggests(result.getSuggests());
  }
  const config = {
    pageCapacity: 10,	//每页显示的数量
    onSearchComplete: localSearchResult	//接收数据的回调函数
  }
   //创建搜索对象
   localsearch.value = new T.LocalSearch(map.value, config);
}
//解析点数据结果
function handlePois(item) {
  var name = item.name;
  //地址
  var address = item.address;
  //坐标
  var lnglatArr = item.lonlat.split(" ");
  var lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);

  var winHtml = "地址:" + address;

  //创建标注对象
  var marker = new T.Marker(lnglat);
  //地图上添加标注点
  map.value.addOverLay(marker);
  //注册标注点的点击事件
  marker.addEventListener("click", function () {
    showPosition(marker, name, winHtml);
  });
}
//显示信息框
function showPosition(marker, name, html) {
  if (infoWin.value) {
      map.value.removeOverLay(infoWin).value;
      infoWin.value = null;
  }
  infoWin.value = new T.InfoWindow("<h5>" + html + "</h5>", new T.Point([0, 0]));
  marker.openInfoWindow(infoWin.value);
}
/**
 * 添加点位
 */
const markpoint = reactive({
  lng: '',
  lat: '',
})
const handleLngLatMarker = () => {
  const marker = tdtUtils.createMarker([markpoint.lng, markpoint.lat], '')
  map.value.addOverLay(marker);
}
/**
 * 显示geojson地图
 */
function drawGeojson() {
  const styleOption = {
    lineWidth:3,
    fillColor: "#167FFD",
    fillOpacity:0.3
  }
  const lines = tdtUtils.getLinesFromGeojson(wenzhouJson)
  lines.forEach((coors)=>{
    let polygon=tdtUtils.createPolygon(coors[0],styleOption);
    map.value.addOverLay(polygon);
  })
}
onMounted(() => {
  init()
  // 搜索
  handleSearch()  
})
onUnmounted(() => {
  map.value.removeEventListener('moveend', MapMoveend)
})
</script>

<style lang="scss" scoped>
.tdwrapper{
  position: relative;
  width: 100%;
  height: 100%;
}
.search-box{
  width: 195px;
  position: absolute;
  top: 50px;
  left: 10px;
  z-index: 999;
  .input_box{
    display: flex;
    align-items: center;
    border: 1px solid #409eff;
    border-radius: 5px;
    background: #409eff;
    color: #fff;
    padding: 4px 2px 4px 5px;
  }
  .input_inner{
    flex: 1;
  }
  input{
    border: none;
    background: none;
    outline: none;
  }
  ::-webkit-input-placeholder{
    color: #fff;
  }
  .serach_icon {
    width: 20px;
    cursor: pointer;
  }
}
.btns-box{
  width: 100%;
  display: flex;
  gap: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 999;
}
.data-box{
  position: absolute;
  min-width: 120px;
  top: 120px;
  right: 10px;
  z-index: 999;
  border:1px solid rgb(8, 42, 117);
  border-radius: 4px;
  padding: 5px;;
  background: rgba(8,42,117,0.8);
  color: rgb(24, 166, 231);
}
.map-box{
  width: 100%;
  height: 100%;
}
.search_wrapper{
  background: #FFF;
  height: 450px;
  overflow-y: auto;
  .suggest_item{
    cursor: pointer;
    padding: 5px 15px 2px;
    border-bottom: 1px dashed #ddd;
  }
  .suggest_item_name{
    font-size: 16px;
    font-weight: bold;
  }
}

</style>
