<script setup lang="ts">
import {routes} from '@/router/index'
</script>

<template>
  <div class="container-box">
    <header class="header-box">
      <div class="nav-item" v-for="(head, index) in routes">
        <router-link :to="head.name" class="nav-item-a">{{head.meta.title || '首页'}}</router-link>
      </div>
    </header>
    <router-view class="route-box"></router-view>
  </div>

<!--  <div>-->
<!--    <temTsx/>-->
<!--    <p class="font">哈哈哈123 abx</p>-->
<!--    <a href="https://vitejs.dev" target="_blank">-->
<!--      <img src="/vite.svg" class="logo" alt="Vite logo" />-->
<!--    </a>-->
<!--    <a href="https://vuejs.org/" target="_blank">-->
<!--      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />-->
<!--    </a>-->
<!--  </div>-->
<!--  <HelloWorld msg="Vite + Vue" />-->

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
}
</style>
