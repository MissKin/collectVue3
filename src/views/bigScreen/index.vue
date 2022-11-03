<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, reactive } from 'vue'
import { init, EChartsOption } from "echarts";
import { pieOption } from './options'
import modal from "@/views/bigScreen/components/modal.vue"
import moduleBoxBg from "@/views/bigScreen/components/moduleBoxBg.vue"
import divProgress from "@/views/bigScreen/components/divProgress.vue"
import customProgress from "@/views/bigScreen/components/customProgress.vue"

import moment from '@/moment'
import CountUp from 'vue-countup-v3'
import type { ICountUp, CountUpOptions } from 'vue-countup-v3'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

interface Props {
  msg?: any,
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'row-click', row: any, column: any, event: PointerEvent): void,
}>()

const generPieEchart = () => {
  const chartDom = document.getElementById('pieChart1') as HTMLElement
  const chartValue = init(chartDom)
  const list = [
      {
        value: 10,
        name: "IDS",
      },
      {
        value: 5,
        name: "VPN",
      },
      {
        value: 15,
        name: "交换机",
      },
      {
        value: 25,
        name: "防火墙",
      },
      {
        value: 20,
        name: "WAF",
      },
      {
        value: 35,
        name: "堡垒机",
      },
    ]
  const options = pieOption(list)
  chartValue.setOption(options)
}
// 弹窗
const modalVisible = ref<boolean>(false)
function showModal(){
  modalVisible.value = true
}
function hideModal(){
  modalVisible.value = false
}
// 时间
const date = ref('')
const week = ref('')
const time = ref('')
let dateInt: any = 0
const today = ref('')
const dateTimes = reactive([
  {
    id: 1,
    name: '本周',
    start_time: moment().startOf('week').add(1, 'day').format('YYYY-MM-DD'),
    end_time: moment().endOf('week').add(1, 'day').format('YYYY-MM-DD'),
  },
  {
    id: 2,
    name: '上周',
    start_time: moment().add(-1, 'week').startOf('week').add(1, 'day').format('YYYY-MM-DD'),
    end_time: moment().add(-1, 'week').endOf('week').add(1, 'day').format('YYYY-MM-DD'),
  },
  {
    id: 3,
    name: '本月',
    start_time: moment().startOf('month').format('YYYY-MM-DD') ,
    end_time: moment().endOf('month').format('YYYY-MM-DD'),
  },
  {
    id: 4,
    name: '上月',
    start_time: moment().add(-1, 'month').startOf('month').format('YYYY-MM-DD') ,
    end_time: moment().add(-1, 'month').endOf('month').format('YYYY-MM-DD'),
  },
])
const dateOfDayjs = reactive({ weeks:[], lastweek: [], currentmonth:[], lastmonth:[]})
function setDatetime() {
  date.value = moment().format('YYYY-MM-DD')
  week.value = moment.weekdays()[moment().isoWeekday() % 7]
  time.value = moment().format('HH:mm:ss')
  const stamptime = Date.parse(new Date())
  today.value = moment(stamptime).format('YYYY-MM-DD HH:mm:ss')
}
// 表单元素
const selectVal = ref()
const inputVal = ref()
// 数字变化

const count = ref(15889)
const countOptions: CountUpOptions = {
  enableScrollSpy: true
  // ...
}
// Vue3.0 无缝滚动组件
const list = ref([
    {
      title: "Vue3.0 无缝滚动组件展示数据第1条",
      date: Date.now(),
    },
    {
      title: "Vue3.0 无缝滚动组件展示数据第2条",
      date: Date.now(),
    },
    {
      title: "Vue3.0 无缝滚动组件展示数据第3条",
      date: Date.now(),
    },
    {
      title: "Vue3.0 无缝滚动组件展示数据第4条",
      date: Date.now(),
    },
    {
      title: "Vue3.0 无缝滚动组件展示数据第5条",
      date: Date.now(),
    },
    {
      title: "Vue3.0 无缝滚动组件展示数据第6条",
      date: Date.now(),
    },
    {
      title: "Vue3.0 无缝滚动组件展示数据第7条",
      date: Date.now(),
    },
    {
      title: "Vue3.0 无缝滚动组件展示数据第8条",
      date: Date.now(),
    },
    {
      title: "Vue3.0 无缝滚动组件展示数据第9条",
      date: Date.now(),
    },
  ]);
// 获取图片
function getIcon(name: string) {
    return new URL(`../../assets/${name}`, import.meta.url).href;
}
const dropColor = ref('#ffb400')
const dropshow = computed(() => {
  return `drop-shadow(176px 0 0 ${dropColor.value})`
})

onMounted(() => {
  setDatetime()
  dateInt = setInterval(() => {
    setDatetime()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(dateInt)
})
onMounted(() => {
  generPieEchart()
})
</script>

<template>
<section class="flex flex-col">
  <!-- 头部 -->
  <header class="myHeader flex">
    <div class="header_left flex items-center">
<!--      <div class="city flex items-center">-->
<!--        <img style="height: 50px;padding-bottom: 2px" :src="cityIcon" alt=""/>-->
<!--        <span>鹿城区</span>-->
<!--      </div>-->
<!--      <div class="weather flex pl-8">-->
<!--        <div class="pr-1 flex items-center">-->
<!--          <img :src="weatherIcon" alt=""/>-->
<!--          <span class="pl-2 pr-2">小雨</span>-->
<!--        </div>-->
<!--        <div class="temperature">9-12℃</div>-->
<!--      </div>-->
    </div>
    <div class="title header_middle">大屏常用到的元素</div>
    <div class="title_right header_right flex items-center justify-end pr-4">
     <div class="time pr-4">{{ time }}</div>
     <div class="date">
       <div>{{ date }}</div>
       <div>{{ week }}</div>
     </div>
    </div>
  </header>
   <div class="flex gap-4 w-full h-full p-4 flex-auto bigscreen-container">
    <!-- 左侧 -->
    <div class="w-1/3 bg-blue p-4">
      <div id="pieChart1" class="pie-chart"></div>
      <divProgress/>
      <customProgress/>
    </div>
    <!-- 中间 -->
    <div class="flex-1 bg-blue p-4 overflow-auto">
      <a-button type="primary" class="mr-2" @click="showModal">展示弹框</a-button>
      <div class="icon-button mr-2">内发光</div>
      <span class="font-grad mr-2">字体渐变</span>
       <!-- 弹窗 -->
      <Teleport to="body">
        <modal v-if="modalVisible" title="哈哈哈哈" @close="hideModal">
          <p>这是弹框内容</p>
        </modal>
      </Teleport>
      <br>
      <a-select v-model="selectVal" class="bigScreen-input mt-4">
        <a-select-option label="藤桥镇">藤桥镇</a-select-option>
        <a-select-option label="南汇街道">南汇街道</a-select-option>
        <a-select-option label="松台街道">松台街道</a-select-option>
      </a-select>
      <br>
      <a-input v-model="inputVal" placeholder="请输入" class="bigScreen-input mt-4"></a-input>
      <p class="sub-title">1. drop-shadow:原图是黑白色，可以任意改变图片颜色</p>
      <div class="flex p-4">
        <div class="flex-1">
          <p>原图</p>
          <img :src="getIcon('md_icon2.png')"/>
        </div>
        <div class="flex-1 relative overflow-hidden">

<!--          <p>变成 <a-color-picker v-model="dropColor"/></p>-->
          <div class="drop-img">
            <img :src="getIcon('md_icon2.png')"/>
          </div>
        </div>
      </div>
      <p class="sub-title">2. {{`<img> 标签获取图片代码` }}</p>
      <pre>
        function getIcon(name: string) {
          return new URL(`../../../assets/${name}`, import.meta.url).href;
        }
      </pre>
      <p class="sub-title">3.模块框的背景是一整个闭合的图片，background contain，cover 不能满足时，需要分段展示</p>
      <div class="module-box">
      <module-box-bg></module-box-bg>
      </div>
      <p class="sub-title">4. {{`时间范围获取` }}</p>
      <div>
        <p v-for="(item, index) in dateTimes" :key="index">
          {{item.name}}: {{item.start_time}} -- {{item.end_time}}
        </p>
      </div>


    </div>
    <div class="w-1/3 bg-blue p-4">
      <p class="big-font">
        <count-up :end-val="count" :options="countOptions">
          <template #suffix>
            <span class="text-lg">人</span>
          </template>
        </count-up>
      </p>
      <!-- https://www.npmjs.com/package/vue3-seamless-scroll -->
      <vue3-seamless-scroll :list="list" class="scroll-box blue" :hover="true" :step="0.5" :wheel="true">
        <div class="flex p-4 justify-between" v-for="(item, index) in list" :key="index">
          <span>{{item.title}}</span>
          <span>{{item.date}}</span>
        </div>
      </vue3-seamless-scroll>
      <p class="sub-title">整体缩放,根据设计稿的宽高比</p>

<!--      <pre>-->
<!--        1. 引入ScaleBox-->
<!--        import SacleBox from '@/components/ScaleBox.vue'-->
<!--        2. 包围大屏内容-->
<!--          <SacleBox>-->
<!--            <HeaderModule title="藤桥镇社会治理平台" />-->
<!--            <div class="map-bg-gradient map-bg-gradient-left">-->
<!--              <LeftComponent />-->
<!--            </div>-->
<!--            <div class="map-bg-gradient map-bg-gradient-right">-->
<!--              <rightComponent />-->
<!--            </div>-->
<!--            <div class="map-bg-gradient-center">-->
<!--              <MiddleComponent />-->
<!--            </div>-->
<!--          </SacleBox>-->
<!--      </pre>-->
    </div>
  </div>
</section>

</template>

<style lang="scss" scoped>
$blue:   #00aeff;
.myHeader{
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #00aeff;
  color: $blue;
  .header_left{
    flex:1;
  }
  .header_middle{
    width: 30%;
    height: 100%;
    line-height: 60px;
    font-size: 30px;
    font-family: "PangMen";
    text-align: center;
  }
  .header_right{
    flex:1;
  }
}
.bigscreen-container{
  height: calc(100% - 60px);
}
.bg-blue{
  background: #05aefd27;
}
.blue{
  color: #00aeff;
}
.pie-chart{
  width: 100%;
  height: 300px;
}
.big-font{
  font-size: 30px;
  font-weight: 800;
  color: #00aeff;
}
.scroll-box{
  height: 270px;
  width:100%;
  margin: 10px auto;
  overflow: hidden;
}
.sub-title{
  font-size: 14px;
  color: #00aeff;
}
.drop-img{
  position: absolute;
  top: 8px;
  left: 0px;
  transform: translate(-100%, 24px);
  // filter: drop-shadow(176px 0 0 #ffb400); //需要修改的颜色值
  filter: v-bind(dropshow); //需要修改的颜色值
}
.module-box{
  height: 347px;
  position: relative;
}
.icon-button {
  display: inline-block;
  padding: 4px 11px;
  box-sizing: border-box;
  box-shadow: 0.1vh 0.1vh 1.2vh 0.1vh #00fcff inset;
  color: #00fcff;
  border-radius: 1vh;
  font-size: 14px;
  cursor: pointer;
}
.font-grad{
  font-size: 30px;
  font-weight: 800;
   background-image: -webkit-linear-gradient(bottom, #05EDFE, #cd6c19, #14C0FC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
<style lang="scss">
.bigScreen-input{
  .ant-btn{
    background-color: transparent;
    border: 1px solid #00aeff;
    box-shadow: none;
  }
  .ant-input{
    color: #00aeff;
  }
  .a-input__suffix{
    color: #00aeff;
  }
}
</style>
