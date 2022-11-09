<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { init, EChartsOption, EChartsType } from "echarts";
import 'echarts-gl'
import {getPie3D, getParametricEquation} from './options'
// import RectTitleBox from "@/view/bigScreen/comp/box/RectTitleBox.vue";
// import TitleDot from "@/view/bigScreen/comp/box/TitleDot.vue";?


interface Props {
  msg?: any,
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'row-click', row: any, column: any, event: PointerEvent): void,
}>()

// 慈善捐款
const warningRepairs = [
  {staticNum: 569, personNum:89},
  {staticNum: 669, personNum:99},
]
const warningTexts = ['一', '二']
const donationRef = ref()
let echartList:EChartsType[] = []
// const generEchartAll = () => {
//   const charts = Array.from(document.getElementsByClassName('warning-repair')) as HTMLElement[]
//   console.log('charts: ', charts);
//   for(let i = 0; i< charts.length; i++) {
//     const chartItem = charts[i]
//     const echartValue = init(chartItem)
//     console.log('echartValue: ', echartValue);
//     echartList.push(echartValue)
//     const data = warningRepairs[i]
//     const option = getPie3D(data, 0)
//     console.log('option: ', option);
//     echartValue.setOption(option)

//   }
//   // window.addEventListener('resize',function(){
//   //   console.log();
//   //   chartResize()
//   // })
// }
const warningRef1 = ref()
const warningRef2 = ref()
const generDonationEchart = () => {
  const echartValue = init(warningRef1.value)
  var optionData = [{
    name: '一（元）',
    value: 600,
    itemStyle: {
        color: '#5b90fa'
    }
  }, {
    name: '二',
    value: 200,
    itemStyle: {
        color: '#00fafe',
    }
  }]

  const option = getPie3D(optionData, 0.7);
  echartValue.setOption(option)
      // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
    let selectedIndex:any = '';
    let hoveredIndex:any = '';
    // 监听点击事件，实现选中效果（单选）
    echartValue.on('click', function(params) {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
      let isSelected = !option.series[params.seriesIndex].pieStatus.selected;
      let isHovered = option.series[params.seriesIndex].pieStatus.hovered;
      let k = option.series[params.seriesIndex].pieStatus.k;
      let startRatio = option.series[params.seriesIndex].pieData.startRatio;
      let endRatio = option.series[params.seriesIndex].pieData.endRatio;
      // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
      if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
          option.series[selectedIndex].parametricEquation = getParametricEquation(option.series[selectedIndex].pieData.startRatio, option.series[selectedIndex].pieData.endRatio, false, false, k, option.series[selectedIndex].pieData.value);
          option.series[selectedIndex].pieStatus.selected = false;
      }

      // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
      option.series[params.seriesIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, option.series[selectedIndex].pieData.value);
      option.series[params.seriesIndex].pieStatus.selected = isSelected;

      // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
      isSelected ? selectedIndex = params.seriesIndex : null;

      // 使用更新后的 option，渲染图表
      echartValue.setOption(option);
    });

   // 监听 mouseover，近似实现高亮（放大）效果
    // echartValue.on('mouseover', function(params) {

    //   // 准备重新渲染扇形所需的参数
    //   let isSelected;
    //   let isHovered;
    //   let startRatio;
    //   let endRatio;
    //   let k;

    //   // 如果触发 mouseover 的扇形当前已高亮，则不做操作
    //   if (hoveredIndex === params.seriesIndex) {
    //       return;

    //       // 否则进行高亮及必要的取消高亮操作
    //   } else {

    //       // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
    //       if (hoveredIndex !== '') {
    //           // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
    //           isSelected = option.series[hoveredIndex].pieStatus.selected;
    //           isHovered = false;
    //           startRatio = option.series[hoveredIndex].pieData.startRatio;
    //           endRatio = option.series[hoveredIndex].pieData.endRatio;
    //           k = option.series[hoveredIndex].pieStatus.k;

    //           // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
    //           option.series[hoveredIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, option.series[hoveredIndex].pieData.value);
    //           option.series[hoveredIndex].pieStatus.hovered = isHovered;

    //           // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
    //           hoveredIndex = '';
    //       }

    //       // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
    //       if (params.seriesName !== 'mouseoutSeries') {
    //           // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
    //           isSelected = option.series[params.seriesIndex].pieStatus.selected;
    //           isHovered = true;
    //           startRatio = option.series[params.seriesIndex].pieData.startRatio;
    //           endRatio = option.series[params.seriesIndex].pieData.endRatio;
    //           k = option.series[params.seriesIndex].pieStatus.k;

    //           // 对当前点击的扇形，执行高亮操作（对 option 更新）
    //           option.series[params.seriesIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, option.series[params.seriesIndex].pieData.value + 5);
    //           option.series[params.seriesIndex].pieStatus.hovered = isHovered;

    //           // 记录上次高亮的扇形对应的系列号 seriesIndex
    //           hoveredIndex = params.seriesIndex;
    //       }

    //       // 使用更新后的 option，渲染图表
    //       echartValue.setOption(option);
    //   }
    // });
}
const generDonationEchart2 = () => {
  const echartValue = init(warningRef2.value)
  var optionData = [{
    name: '服务时长\n（小时）',
    value: 850,
    itemStyle: {
        color: '#5b90fa'
    }
  }, {
    name: '加分人数',
    value: 150,
    itemStyle: {
        color: '#00fafe',
    }
  }]
  const option = getPie3D(optionData, 0);
  echartValue.setOption(option)
      // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
    let selectedIndex:any = '';
    let hoveredIndex:any = '';
    // 监听点击事件，实现选中效果（单选）
    echartValue.on('click', function(params) {
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
      let isSelected = !option.series[params.seriesIndex].pieStatus.selected;
      let isHovered = option.series[params.seriesIndex].pieStatus.hovered;
      let k = option.series[params.seriesIndex].pieStatus.k;
      let startRatio = option.series[params.seriesIndex].pieData.startRatio;
      let endRatio = option.series[params.seriesIndex].pieData.endRatio;
      // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
      if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
          option.series[selectedIndex].parametricEquation = getParametricEquation(option.series[selectedIndex].pieData.startRatio, option.series[selectedIndex].pieData.endRatio, false, false, k, option.series[selectedIndex].pieData.value);
          option.series[selectedIndex].pieStatus.selected = false;
      }

      // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
      option.series[params.seriesIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, option.series[selectedIndex].pieData.value);
      option.series[params.seriesIndex].pieStatus.selected = isSelected;

      // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
      isSelected ? selectedIndex = params.seriesIndex : null;

      // 使用更新后的 option，渲染图表
      echartValue.setOption(option);
    });

   // 监听 mouseover，近似实现高亮（放大）效果
    echartValue.on('mouseover', function(params) {

      // 准备重新渲染扇形所需的参数
      let isSelected;
      let isHovered;
      let startRatio;
      let endRatio;
      let k;

      // 如果触发 mouseover 的扇形当前已高亮，则不做操作
      if (hoveredIndex === params.seriesIndex) {
          return;

          // 否则进行高亮及必要的取消高亮操作
      } else {

          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== '') {
              // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
              isSelected = option.series[hoveredIndex].pieStatus.selected;
              isHovered = false;
              startRatio = option.series[hoveredIndex].pieData.startRatio;
              endRatio = option.series[hoveredIndex].pieData.endRatio;
              k = option.series[hoveredIndex].pieStatus.k;

              // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
              option.series[hoveredIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, option.series[hoveredIndex].pieData.value);
              option.series[hoveredIndex].pieStatus.hovered = isHovered;

              // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
              hoveredIndex = '';
          }

          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (params.seriesName !== 'mouseoutSeries') {
              // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
              isSelected = option.series[params.seriesIndex].pieStatus.selected;
              isHovered = true;
              startRatio = option.series[params.seriesIndex].pieData.startRatio;
              endRatio = option.series[params.seriesIndex].pieData.endRatio;
              k = option.series[params.seriesIndex].pieStatus.k;

              // 对当前点击的扇形，执行高亮操作（对 option 更新）
              option.series[params.seriesIndex].parametricEquation = getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, option.series[params.seriesIndex].pieData.value + 5);
              option.series[params.seriesIndex].pieStatus.hovered = isHovered;

              // 记录上次高亮的扇形对应的系列号 seriesIndex
              hoveredIndex = params.seriesIndex;
          }

          // 使用更新后的 option，渲染图表
          echartValue.setOption(option);
      }
    });
}
onMounted(() => {
  generDonationEchart()
  // generDonationEchart2()
  // generEchartAll()
})

</script>

<template>
  <div class="flex h-full warning-box">
      <div class="w-2/4 warning-item">
        <!-- <TitleDot :title="warningTexts[0]" /> -->
        <div ref="warningRef1" class="warning-repair" style="height: 100%"></div>
      </div>
      <div class="w-2/4 warning-item">
        <!-- <TitleDot :title="warningTexts[1]" /> -->
        <div ref="warningRef2" class="warning-repair" style="height: 100%"></div>
      </div>
    </div>
</template>

<style scoped>
</style>
