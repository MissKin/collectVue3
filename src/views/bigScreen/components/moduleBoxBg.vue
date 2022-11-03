<script setup lang="ts">
import {ref} from 'vue'


interface Props {
  msg?: any,
}

const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'row-click', row: any, column: any, event: PointerEvent): void,
}>()

const count = ref(0)

</script>

<template>
  <div class="back_module-box">
    <div class="back_container back_top"></div>
    <div class="back_container back_middle"></div>
    <div class="back_container back_bottom"></div>
  </div>
</template>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.back_module-box{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  pointer-events: none;
  .back_top{
    width: 100%;
    height: 170px;
    background: url('../assets/title_head.png') no-repeat;
    background-size: contain;
    background-position: 0 0;
  }
  .back_middle{
    width: 435px;
    height: calc(100% - 350px);
    background: url('../assets/title_middle.png') repeat-y;
    background-size: 100% auto;
    background-position: 0 0;
  }
  .back_bottom{
    width: 100%;
    height: 181px;
    background: url('../assets/title_footer.png') no-repeat;
    background-size: contain;
    background-position: 0 0;
  }
}

</style>
