<template>
    <div class="flex">
        <div class="left-box flex-1">
            <div ref="echartLeftRef" class="echart-box"></div>
            <div ref="echartLeftTwoRef" class="echart-box"></div>
            <div ref="echartLeftThreeRef" class="echart-box"></div>
        </div>
        <div class="middle-box flex-1">
            <div class="middleOne" style="height:200px;">
                <ThreeDimenPie/>
            </div>
        </div>
        <div class="right-box flex-1"></div>
    </div>
</template>
<script setup lang="ts">
import {ref, reactive, toRefs, onMounted} from 'vue'
import { init, EChartsOption } from "echarts";
import {timmerOneAnim} from '@/utils/echartDispatch'

import {circlePoint, cylinderOption, barsOption} from './options'
import ThreeDimenPie from './components/ThreeDimenPie.vue'

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

// 第一个
const echartLeftRef = ref()
const generCircleEchart = () => {
//   const chartDom = document.getElementById('pieChart1') as HTMLElement
  const chartValue = init(echartLeftRef.value)

  const options = circlePoint()
  chartValue.setOption(options)
}

// 第二个
const echartLeftTwoRef = ref()
const generCylinderEchart = () => {
//   const chartDom = document.getElementById('pieChart1') as HTMLElement
  const chartValue = init(echartLeftTwoRef.value)

  const options = cylinderOption()
  chartValue.setOption(options)
}
// 第三个
const echartLeftThreeRef = ref()
const generBarsEchart = () => {
//   const chartDom = document.getElementById('pieChart1') as HTMLElement
  const chartValue = init(echartLeftThreeRef.value)

  const options = barsOption()
  chartValue.setOption(options)
}

onMounted(() => {
    generCircleEchart()
    generCylinderEchart()
    generBarsEchart()
})
</script>
<style lang="scss" scoped>
.echart-box{
    width: 100%;
    height: 250px;
}
</style>