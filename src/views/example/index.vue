<template>
  <div style="width:1500px;margin: 0 auto;">
    <div class="welcome-box">某某某，欢迎登陆系统!</div>
    <div class="worktable-box flex">
      <div class="worktable-left">
        <p class="worktable-title">
          我的工作台
        </p>
        <div class="worktable-list flex flex-wrap justify-center">
          <div class="worktable-list-item flex flex-col" v-for="(item, index) in worktableList" :key="index">
            <div class="worktable-list-item-title">
<!--              work_1.png-->
              <img :src="getIcon(`work_${index + 1}.png`)" class="worktable-img"/>
              <span class="">{{item.text}}</span>
            </div>
            <div class="worktable-list-bottom flex">
              <div class="worktable-data" v-for="(keys, keyIndex) in item.keys" :key="keyIndex">
                <div class="font-number text-2xl">45</div>
                <div class="worktable-data-name">{{keys.text}}</div>
              </div>
            </div>

          </div>
        </div>

      </div>
      <div class="worktable-right">
        <div class="todotask-box">
          <div class="todotask-header ">
            <span class="title-line">待办任务清单</span>
          </div>
          <ul class="todotask-list">
            <template v-for="(item,index) in todolist" :key="index">
              <li class="todotask-item flex justify-between">
                <div class="todotask-info">
                  <p class="todotask-name w-full ellipsis ">
                    {{item.title}}
                  </p>
                  <p class="todotask-date">
                    截止反馈时间:{{item.updateTime}}

                  </p>
                </div>
                <div class="oprate-btn">
                  <el-button type="primary"> 反馈</el-button>
                </div>

              </li>
            </template>
          </ul>
        </div>
        <div class="systemupdate-box">
          <div class="todotask-header ">
            <span class="title-line">系统更新通知</span>
<!--            <el-button type="primary" plain> 反馈意见提交</el-button>-->
          </div>
          <div class="systemupdate-data">
            <el-timeline>
              <el-timeline-item
                  v-for="(item,index) in versionList" :key="index"
                  :timestamp="item.time" placement="top">
                <div>
                  {{item.message}}
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
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

function getIcon(name: string) {
  return new URL(`../../assets/worktable/${name}`, import.meta.url).href;
}
const todolist = ref([
  {title: '进度管理的步骤还未完成，加快进度', updateTime: '2022-10-05 15:00:00'},
  {title: '进度管理的步骤还未完成，加快进度，定义活动，排列活动顺序，估算活动资源，指定进度计划', updateTime: '2022-10-05 15:00:00'},
  {title: '进度管理的步骤还未完成，加快进度', updateTime: '2022-10-05 15:00:00'},
  {title: '进度管理的步骤还未完成，加快进度', updateTime: '2022-10-05 15:00:00'},
 ])

const worktableList = ref([
  {text: '项目管理',keys: [{text: '正常'},{text: '正常'},{text: '正常'},{text: '正常'}]},
  {text: '任务管理',keys: [{text: '正常'},{text: '正常'},{text: '正常'},{text: '正常'}]},
  {text: '领导批示',keys: [{text: '正常'},{text: '正常'},{text: '正常'},{text: '正常'}]},
  {text: '考核晾晒',keys: [{text: '正常'},{text: '正常'},{text: '正常'},{text: '正常'}]},
  {text: '运维管理',keys: [{text: '正常'},{text: '正常'},{text: '正常'},{text: '正常'}]},
  {text: '系统管理',keys: [{text: '正常'},{text: '正常'},{text: '正常'},{text: '正常'}]},
])

const versionList = ref([
  {message: '上线领导批示', time: '2022-10-05 15:30:50'},
  {message: '上线领导批示', time: '2022-10-05 15:30:50'},
  {message: '上线领导批示', time: '2022-10-05 15:30:50'},
  {message: '上线领导批示', time: '2022-10-05 15:30:50'}
])
</script>

<style lang="scss" scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.title-line{
  position: relative;
  font-size: 18px;
  padding-left: 8px;
  &:before{
    position: absolute;
    content: "";
    left: 0;
    top: 5px;
    width: 4px;
    height: 20px
  ;
    background: #1890ff;
    border-radius: 2px;
  }
}

.todotask-header{
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
}
.worktable-box{
  background: #ffffff;
  .worktable-left{
    width: 70%;
  }
  .worktable-title{
    font-size: 22px;
    color: #00aeff;
  }
  .worktable-right{
    width: 30%;
  }
}
.worktable-list{
  width:100%;
  display: flex;
  gap: 20px;
  &-item{
    width: 40%;
    border: 1px solid #dee3e6;
    border-radius: 5px;
    text-align: center;
    padding: 20px;
    height: 150px;
    /* background: rgba(24, 144, 255, 0.2705882353); */
    color: #1890ff;
    cursor: pointer;
    box-shadow: 0 0 10px 1px #e6e2e2;
  }
  &-item-title{
    font-size: 20px;
    font-weight: 600;
  }
  .worktable-img{
    display: inline-block;
    width: 50px;
    height: 50px;
    background: rgb(0 174 255 / 45%);
    padding: 11px;
    border-radius: 50%;
    margin-right: 15px;
  }
  &-bottom{
    width:100%;
    margin-top:15px;
  }
  .worktable-data{
    flex: 1;
  }
}
.todotask{
  &-box{
    width: 100%;
    height: 450px;
  }
  &-list{
    height: calc(100% - 45px);
    overflow:hidden;
    width: 100%;
  }
  &-item{
    display: flex;
    width: 100%;
    align-items: center;
    border-bottom: 1px dotted #999;
    padding: 2px 8px;
    .oprate-btn{
      width:80px;
    }
  }
  &-info{
    width: calc(100% - 80px);
  }
}
.systemupdate{
  &-box{
    height: calc(100% - 450px);
    overflow: auto;
  }
  &-data{

  }
}
</style>
