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


</script>

<template>
  <h1>index</h1>
</template>

<style scoped>
</style>
