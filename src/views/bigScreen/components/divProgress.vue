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

  const completeList = ref([
    { townName: '第一镇', progress: '98.78', number: '1589' },
    { townName: '第二镇', progress: '87.78', number: '1289' },
    { townName: '第三镇', progress: '78.78', number: '1089' },
    { townName: '第四镇', progress: '68.78', number: '989' }
  ])
  const colorList= ref(['#ff4f4f', '#ffb400', '#19b1fb'])

  </script>

  <template>
    <div class="progress-box" style="position: relative">
      <div v-for="(item, index) in completeList" :key="index" class=" boxText">
        <div class="boxText_one" :style="{color: (index < 3 ? colorList[index]: '')}">
          <span>NO.{{ index + 1 }}</span>
          <span class="white" style="margin-left: 10px">{{ item.townName }}</span>
        </div>
        <div class="flex progress-box">
          <div class="progress">
            <div
              class="progress_child"
              :class="[index < 3 ? `progress_child_${index+ 1}`: '']"
              :style="{ width: item.progress + '%' }"
            ></div>
          </div>
          <div class="data-num">{{ item.number }}</div>
        </div>
      </div>
    </div>
  </template>

<style lang="scss" scoped>
  .boxText {
  align-items: center;
  height: 40px;
  line-height: 40px;
  justify-content: space-between;
}
.boxText_one {
  font-size: 14px;
  color: #fff;
  line-height: 1.5;
}
.progress-box{
  color: #fff;
  width: 100%;
  align-items: center;
  line-height: 1.5;
  gap:8px;
}
.redColor {
  color: #d1090f;
}
.yellowColor {
  color: #ffb400;
}
.blueColor {
  color: #00fcff;
}
.progress {
  flex:1;
  height: 5px;
  background: rgba(255,255,255,0.1);
}
.progress_child {
  position: relative;
  height: 100%;
  background: linear-gradient(to right, #2cecff, #9ff6ff);
}
.progress_child_1{
  background: linear-gradient(to right, #ff4f4f, #ffafaf);
}
.progress_child_2{
  background: linear-gradient(to right, #ffb400, #ffe6a9);
}
.progress_child_3{
  background: linear-gradient(to right, #19b1fb, #a1e0ff);
}

.progress_child:after {
  content: "";
  position: absolute;
  top: -1px;
  right: 0%;
  width: 4px;
  height: 7px;
  background-color: #fff;
}
.data-num{
  font-family: 'DIN-BOLD';
}
  </style>
