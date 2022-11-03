/**
 * @Description
 * @Author holyer
 * @Date 2022/08/18 08:51:32
 */
<template>
  <div class="modal">
    <div class="verify-order-modal-content" :style="{width:$attrs.width || '50vw'}">
      <div class="title-row">
        <div class="title-container">
          <div class="big-screen-gradient-text">
            {{ $attrs.title || '' }}
          </div>
        </div>
        <div v-if="showClose" class="close-item" @click="clickClose"></div>
      </div>
      <div class="content-row">
        <slot></slot>
      </div>
      <div v-if="bottoms.length" class="bottom-row">
        <div v-for="(btn,index) in bottoms" :key="index" class="bottom-button" @click="clickBtn(btn)">
          <i v-if="btn.loading" class="el-icon-loading"></i>{{ btn.text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { reactive } from 'vue'
interface BottomProp {
  cb: Function,
  text: String,
  loading?: Boolean
}
  interface Props {
    bottoms?: BottomProp[],
    showClose?: boolean
  }

const props = withDefaults(defineProps<Props>(), {
  bottoms: () => ([]),
  showClose: true
})
  const emit = defineEmits(['close'])
  function clickClose() {
    emit('close')
  }
  function clickBtn(item:any) {
    item.cb()
  }
</script >
<style lang='scss' scoped>
$big-screen-lightblue: #19b1fb;
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0,0,0,0.5);
  .verify-order-modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 70%;
    // height: 60%;
    min-height: 200px;
    position: absolute;
    background: url('@/assets/modal-bg.png');
    background-size: 100% 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .title-row {
      height: 3vh;
      width: 100%;
      margin-top: 2.5vh;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      .title-container {
        color: #fff;
        background: linear-gradient(to right, rgba(41,110,143,0.3)  0%,rgba(3,14,34,0.3) 100%);
        height: 100%;
        width: 40vh;
        display: flex;
        align-items: center;
        padding-left: 2vh;
        font-size: 15px;
        font-weight: 600;
      }
      .close-item {
        width: 1vh;
        height: 1vh;
        margin-right: 2vh;
        background: url('@/assets/modal-close.png');
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
  .bottom-row {
      width: 100%;
      height: 5vh;
      box-sizing: border-box;
      padding-right: 2vh;
      padding-bottom: 1vh;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      gap:15px;
      .bottom-button {
        height: 3.5vh;
        // width: 7vh;
        padding: 8px 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0.1vh 0.1vh 1.2vh 0.1vh #19b1fb inset;
        color: #19b1fb;
        border-radius: 1vh;
        cursor: pointer;
      }
    }
}
</style>
