
<template>
  <div
    class="ScaleBox"
    ref="ScaleBox"
    :style="{
      width: width + 'px',
      height: height + 'px',
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, shallowRef, toRefs, computed, onMounted, watchEffect } from 'vue'

const ScaleBox = ref()
const that = reactive({
  scale: 0,
  width: 1920,
  height: 1080,
})

const getScale = () => {
  // 固定好16：9的宽高比，计算出最合适的缩放比
  const wh = window.innerHeight / that.height;
  const ww = window.innerWidth / that.width;
  console.log(ww < wh ? ww : wh);
  return ww < wh ? ww : wh;
}

const setScale = () => {
  // 获取到缩放比例，设置它
  that.scale = getScale();
  ScaleBox.value?.style.setProperty("--scale", that.scale);
}
// const debounce = (fn:Function, delay:number) => {
//   const delays = delay || 500;
//   let timer:any;
//   return function () {
//     const th = this;
//     const args = arguments;
//     if (timer) {
//       clearTimeout(timer);
//     }
//     timer = setTimeout(function () {
//       timer = null;
//       fn.apply(th, args);
//     }, delays);
//   };
// },
onMounted(() => {
  setScale();
  // window.addEventListener("resize", this.debounce(this.setScale));
})
</script>

<style lang="scss">
#ScaleBox {
  --scale: 1;
}
.ScaleBox {
  position: absolute;
  transform: scale(var(--scale)) translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  transform-origin: 0 0;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  z-index: 999;
  // background: rgba(255, 0, 0, 0.3);
}
</style>
