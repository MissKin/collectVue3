<!--
@author: author
@date: 2022-09-08 15:01:48
-->
<template>
  <ul class="rank-box">
    <li
      v-for="(item, index) in townsApplyList"
      :key="index"
      class="rank-item flex pointer"
    >
      <span class="rank-index rank-index-other mr8" :class="`rank-box${index + 1}  rank-${index + 1}`">{{ index+ 1 }}</span>
      <span class="mr10 f14">{{ item.townName }}</span>
      <div class="rank-progress rankbg-other mr10 " :class="`rankbg${index + 1}`">
        <div class="progress-bar rankbg-other" :style="{width:item.percent + '%'}" :class="`rankbg${index + 1}`"></div>
        <span class="score">{{ item.num }}</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import {ref, onMounted} from 'vue'
  interface ItemProps {
    townName: string,
    num: number,
    percent?:string
  }
  interface Props {
    msg?: any,
  }
  
  const props = withDefaults(defineProps<Props>(), {})
  
  const emit = defineEmits<{
    // eslint-disable-next-line no-unused-vars
    (e: 'row-click', row: any, column: any, event: PointerEvent): void,
  }>()
  
  const townsApplyList = ref<Array<ItemProps>>()
  const handleData = () => {
    const list = [
      { townName: '第一镇', num: 9, percent: '0' },
      { townName: '第一镇', num: 7, percent: '0' },
      { townName: '第一镇', num: 6, percent: '0' },
      { townName: '第一镇', num: 5, percent: '0' }
    ]
    // const allCount = list.reduce((prev:number, cur) => prev += cur.num, 0)
    const allCount = list.reduce((pre: number, todo: ItemProps) => pre + todo.num, 0);
    console.log('allCount: ', allCount)
    townsApplyList.value = list.map((item:ItemProps) => {
      item.percent = Math.round(item.num / allCount * 100).toFixed(2)
      return item
    })
  }
  onMounted(() => {
    handleData()
  })
  </script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.rank-box{
   width: 100%;
   display: flex;
   position: relative;
   margin-top: 15px;
   flex-wrap: wrap;
   justify-content: flex-start;
  .rank-item{
    display: flex;
    width: 45%;
    font-size: 18px;
    color:#d2ecec;
    margin-bottom: 15px;
    margin-right: 16px;
    height: 20px;
    .rank-index{
      width: 18px;
      height: 18px;
      border-radius: 50%;
      text-align: center;
      line-height: 18px;
      font-size: 14px;
      border:none!important;
    }
    .rank-progress{
      display: flex;
      flex: 1;
      padding: 4px;
      justify-content: space-between;
      align-items: center;

    }
    .progress-bar{
      height: 8px;
    }
    .unit{
        font-style: normal;
        font-size: 14px;
        padding-left: 10px;
    }
    .score{
      color: #ffffff;
      font-size: 14px;
      // font-weight: 600;
    }
  }
  .rank-index-other{
    color: #ffffff;
     background-color:   rgba(#00fcff,0.2);
  }
  .rank-1{
    color: #2483ff;
  }
  .rank-2{
    color: #ffbb00;
  }
  .rank-3{
    color: #00ffb4;
  }
   .rank-box-other{
    border:solid 1px #2483ff;
    background-color:   rgba(210,236,236,0.2);
  }
  .rank-box1{
    border: solid 1px #2483ff;
    background-color: rgba(210,236,236,0.2);
  }
  .rank-box2{
    border:  solid 1px #ffbb00;
    background-color: rgba(210,236,236,0.2);
  }
  .rank-box3{
    border: solid 1px #00ffb4;
    background-color:    rgba(0,255,180,0.2);
  }

  .rankbg-other{
    border: solid 1px rgba(#00fcff, 0.2);
    .progress-bar{
      background-color:  #00fcff;
    }
  }
  .rankbg1{
    border: solid 1px rgba(#2483ff, 0.2);
    .progress-bar{
      background-color:  #2483ff;
    }
  }
  .rankbg2{
    border: solid 1px rgba(#ffbb00, 0.2);
    .progress-bar{
      background-color:  #ffbb00;
    }
  }
  .rankbg3{
    border: solid 1px rgba(#00ffb4, 0.2);
    .progress-bar{
      background-color:  #00ffb4;
    }
  }
}
</style>