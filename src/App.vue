<script setup lang="ts">
import {routes} from '@/router/index'
import moment from '@/moment'
import { ref, reactive, onMounted, onUnmounted, toRefs } from 'vue'

let dateInt: any
const state = reactive({
  dateInfo: {
    date: '',
    week: '',
    time: '',
  }
})
function setDatetime() {
  state.dateInfo.date = moment().format('YYYY-MM-DD')
  state.dateInfo.week = moment.weekdays()[moment().isoWeekday() % 7]
  state.dateInfo.time = moment().format('HH:mm:ss')
  // const stamptime = Date.parse(new Date())
  // today.value = moment(stamptime).format('YYYY-MM-DD HH:mm:ss')
}

const {dateInfo} = toRefs(state)
onMounted(() => {
  setDatetime()
  dateInt = setInterval(() => {
    setDatetime()
  }, 1000)
  // 修改颜色  APP.vue 中的onMounted增加有效
  document.body.style.setProperty('--el-text-color-regular', '#19b1fb');
})

onUnmounted(() => {
  clearInterval(dateInt)
})
</script>

<template>
  <div class="container-box">
    <header class="header-box">
      <div class="nav-item" v-for="(head, index) in routes">
        <router-link :to="head.name" class="nav-item-a">{{head.meta.title || '首页'}}</router-link>
      </div>
    </header>
    <div class="time-box flex items-center justify-end pr-4">
      <div class="time pr-4 text-lg">{{ dateInfo.time }}</div>
      <div class="date">
        <div>{{ dateInfo.date }}</div>
        <div>{{ dateInfo.week }}</div>
      </div>
    </div>
    <router-view class="route-box"></router-view>
  </div>

</template>

<style lang="scss" scoped>
.container-box{
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #08132f;
  display: flex;
  flex-direction: column;
  .header-box{
    height: 60px;
    display: flex;
    gap: 50px;
    font-size: 18px;
    line-height: 60px;
    justify-content: center;
  }
  .nav-item:hover{
    transform: scale(1.1);
    transition: all ease 1s;
  }
  .router-link-active{
    transform: scale(1.5);
    /* text-decoration: underline; */
    border: 1px dashed;
    border-radius: 6px;
    padding: 0 6px;
  }
  .route-box{
    height: calc(100% - 60px);
    flex:1;
  }
  .time-box{
    position: absolute;
    right: 10px;
    color: #fff;
  }
}
</style>
