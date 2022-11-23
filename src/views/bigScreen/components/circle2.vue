<template>
 <div class='box'>
    456
    <!-- <div v-for="(v, k) in earth3DBtnList" :key="k">
        <div class="circle" v-for="i in 4" :key="i"></div>
        <div class="text-box">
            <div class="text">{{ v.label }}</div>
        </div>
    </div> -->
 </div>
</template>
 
<script setup lang='ts'>
 import {ref,reactive} from "vue";
 // 3DEarth 地图周围按钮组
// const earth3DBtnList: Array<object> = ref([
// 	{
// 		topLevelClass: 'fixed-top',
// 		icon: 'ele-MagicStick',
// 		label: '环境监测',
// 		type: 0,
// 	},
// 	{
// 		topLevelClass: 'fixed-right',
// 		icon: 'ele-MoonNight',
// 		label: '精准管理',
// 		type: 1,
// 	}
// ]);
 
</script>
 
<style lang="scss" scoped>
.box{
    position: relative;
}
.fixed-top,
.fixed-right {
    position: absolute;
    width: 100px;
    height: 100px;
    display: flex;
    cursor: pointer;
}
// .circle:nth-of-type(1) {
//     width: 100px;
//     height: 95px;
//     animation: turnAround 6s infinite linear;
//     box-shadow: 0 0 1px 0 #869fe4, inset 0 0 10px 0 #869fe4;
// }
// .circle:nth-of-type(2) {
//     width: 95px;
//     height: 100px;
//     animation: turnAround 10s infinite linear;
//     box-shadow: 0 0 1px 0 #3397f2, inset 0 0 10px 0 #3397f2;
// }
// .circle:nth-of-type(3) {
//     width: 110px;
//     height: 100px;
//     animation: turnAround 5s infinite linear;
//     box-shadow: 0 0 1px 0 #3eaadc, inset 0 0 10px 0 #3eaadc;
// }
// .circle:nth-of-type(4) {
//     width: 100px;
//     height: 110px;
//     animation: turnAround 15s infinite linear;
//     box-shadow: 0 0 1px 0 #09f, inset 0 0 10px 0 #09f;
// }
// @keyframes turnAround {
//     100% {
//         transform: rotate(360deg);
//     }
// }
</style>