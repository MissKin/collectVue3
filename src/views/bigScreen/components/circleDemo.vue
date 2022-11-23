<template>
  <div class='box'>
    <!-- 圆形 -->
    <div class="circle-demo">
      <div :class="v.topLevelClass" v-for="(v, k) in earth3DBtnList" :key="k">
        <div class="circle circle-item" v-for="i in 4" :key="i"></div>
        <div class="text-box">
          <div class="text">{{ v.label }}</div>
        </div>
      </div>
    </div>
    <!-- 渐变 -->
    <div class="gradient-demo">
      <div class="task">
        <div class="task-item" v-for="(v, k) in taskList" :key="k">
          <div class="task-item-box task1">
            <div class="task-item-value">{{v.num}}</div>
            <div class="task-item-label">{{v.text}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
 </template>
  
 <script setup lang='ts'>
  import {ref,reactive} from "vue";
  // 3DEarth 地图周围按钮组
 const earth3DBtnList: Array<object> = ref([
 	{
 		topLevelClass: 'fixed-top',
 		icon: 'ele-MagicStick',
 		label: '环境监测',
 		type: 0,
 	},
 	{
 		topLevelClass: 'fixed-right',
 		icon: 'ele-MoonNight',
 		label: '精准管理',
 		type: 1,
 	}
 ]);

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
     display: flex;
 }
 .circle-demo{
  width: 50%;
  height: 150px;
  .fixed-top,
 .fixed-right {
     position: absolute;
     width: 100px;
     height: 100px;
     display: flex;
     cursor: pointer;
 }
 .fixed-top {
  left: 20px;
  top: 20px;
}
.fixed-right {
  left: 150px;
  top: 20px;
}
.text-box {
  position: relative;
  z-index: 11;
  color: #c0d1f2;
  margin: auto;
  text-align: center;
  font-size: 12px;
  i {
    font-size: 28px;
    margin-bottom: 10px;
  }
}
 .circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.01);
  z-index: 10;
}
 .circle:nth-of-type(1) {
     width: 100px;
     height: 95px;
     animation: turnAround 6s infinite linear;
     box-shadow: 0 0 1px 0 #869fe4, inset 0 0 10px 0 #869fe4;
 }
 .circle:nth-of-type(2) {
     width: 95px;
     height: 100px;
     animation: turnAround 10s infinite linear;
     box-shadow: 0 0 1px 0 #3397f2, inset 0 0 10px 0 #3397f2;
 }
 .circle:nth-of-type(3) {
     width: 110px;
     height: 100px;
     animation: turnAround 5s infinite linear;
     box-shadow: 0 0 1px 0 #3eaadc, inset 0 0 10px 0 #3eaadc;
 }
 .circle:nth-of-type(4) {
     width: 100px;
     height: 110px;
     animation: turnAround 15s infinite linear;
     box-shadow: 0 0 1px 0 #09f, inset 0 0 10px 0 #09f;
 }
 @keyframes turnAround {
     100% {
         transform: rotate(360deg);
     }
 }
 }
 

 .gradient-demo{
    flex: 0 0 50%;
    margin-top: 39px;
  .task {
    display: flex;
    height: 45px;
    .task-item {
      flex: 1;
      color: #fff;
      display: flex;
      justify-content: center;
      .task-item-box {
        position: relative;
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 100%;
        z-index: 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        box-shadow: 0 10px 12px 0 rgba(0, 0, 0, 0.3);
        &::before {
          content: '';
          position: absolute;
          z-index: -2;
          left: -50%;
          top: -50%;
          width: 200%;
          height: 200%;
          background-repeat: no-repeat;
          background-size: 50% 50%, 50% 50%;
          background-position: 0 0, 100% 0, 100% 100%, 0 100%;
          background-image: linear-gradient(#19d4ae, #19d4ae), linear-gradient(#5ab1ef, #5ab1ef), linear-gradient(#fa6e86, #fa6e86),
            linear-gradient(#ffb980, #ffb980);
          animation: rotate 2s linear infinite;
        }
        &::after {
          content: '';
          position: absolute;
          z-index: -1;
          left: 2px;
          top: 2px;
          width: calc(100% - 4px);
          height: calc(100% - 4px);
          border-radius: 100%;
        }
        .task-item-value {
          text-align: center;
          font-size: 14px;
          font-weight: bold;
        }
        .task-item-label {
          text-align: center;
        }
      }
      .task1 {
        &::after {
          background: #5492be;
        }
      }
      .task2 {
        &::after {
          background: #43a177;
        }
      }
      .task3 {
        &::after {
          background: #a76077;
        }
      }
      .task4 {
        &::after {
          background: #b4825a;
        }
      }
      .task5 {
        &::after {
          background: #74568f;
        }
      }
    }
    .task-first-item {
      flex-direction: column;
      text-align: center;
      .task-first {
        font-size: 20px;
      }
    }
  }
 }
 </style>