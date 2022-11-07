# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

### tsx语法
1. 需要下载 @vitejs/plugin-vue-jsx  vite.config.ts引入
2. 用ref定义变量 需要添加 XX.value
3. tsx是支持v-show指令
4. tsx不支持v-if、v-else指令，这时候需要使用到三目运算符了
5. tsx不支持v-for指令，使用map方法遍历数组，map函数中返回一个标签渲染dom节点
6. 接收props，定义type Props，在defineComponent 的形参中设置参数类型
7. 事件： 1： 不传递参数时，直接定义，需要参数则 用bind来改变this的指向 onClick={TestClick.bind(this,item)}

## bigscreen 数据大屏常用的样式和组件