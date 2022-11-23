<template>
  <div class='box'>
    <!-- 圆形 -->
    <div class="wave-demo">
      <div class="monitor-item" v-for="(v, k) in chartData4List" :key="k">
        <div class="monitor-wave" :class="{ 'monitor-active': k === chartData4Index }">
          <div class="monitor-z-index">
            <div class="monitor-item-label">{{ v.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
 </template>
  
 <script setup lang='ts'>
  import {ref,reactive} from "vue";
  // 3DEarth 地图周围按钮组
  const chartData4List: Array<object> = reactive([
	{
		label: '温度',
	},
	{
		label: '光照',
	},
	{
		label: '湿度',
	},
	{
		label: '风力',
	},
	{
		label: '张力',
	},
	{
		label: '气压',
	},
]);

// 3DEarth 地

 const taskList: Array<object> = reactive([
  {num: 4, text: '任务一'},
  {num: 3, text: '任务二'},
  {num: 4, text: '任务三'},
  {num: 3, text: '任务四'},
 ])
  
 </script>
  
 <style lang="scss" scoped>
 .box{
     position: relative;
 }
 .wave-demo{
  width: 100%;
  display: flex;
  // height: 150px;
  .monitor-item {
    width: 50%;
    display: flex;
    align-items: center;
    .monitor-wave {
      cursor: pointer;
      width: 80px;
      height: 80px;
      position: relative;
      background-color: #43bdf0;
      border-radius: 50%;
      overflow: hidden;
      text-align: center;
      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        width: 80px;
        height: 80px;
        background: #f4f4f4;
        animation: roateOne 10s linear infinite;
        transform: translateX(-50%);
        z-index: 1;
      }
      &::before {
        bottom: 20px;
        border-radius: 60%;
      }
      &::after {
        bottom: 18px;
        opacity: 0.7;
        border-radius: 37%;
      }
      .monitor-z-index {
        position: relative;
        z-index: 2;
        color: #4eb8ff;
        display: flex;
        align-items: center;
        height: 100%;
        justify-content: center;
        font-weight: bold;
      }
    }
    @keyframes roateOne {
      0% {
        transform: translate(-50%, 0) rotateZ(0deg);
      }
      50% {
        transform: translate(-50%, -2%) rotateZ(180deg);
      }
      100% {
        transform: translate(-50%, 0%) rotateZ(360deg);
      }
    }
    .monitor-active {
      background-color: #22bc76;
      .monitor-z-index {
        color: #22bc76;
      }
    }
  }
 }
 


 </style>