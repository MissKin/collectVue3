<template>
  <div>
    <temTsx/>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs} from 'vue'
import temTsx from "@/components/temTsx";

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
</script>

<style scoped>

</style>
