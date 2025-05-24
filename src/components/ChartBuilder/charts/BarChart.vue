<template>
  <div>
    <v-chart class='chart' :option='option' autoresize />
  </div>
</template>

<script setup lang='ts'>
import { ref, provide, onMounted, watch } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

provide(THEME_KEY, 'light')

const props = defineProps(['data', 'keyName', 'valueName'])

const option = ref({
  tooltip: {
    trigger: 'item',
  },
  textStyle: {
    fontFamily: 'Vazirmatn FD'
  },
  xAxis: {
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: []
})

watch(() => props.data, () => {
  const labels = [];
  const values = [];
  option.value.xAxis.data = [];
  option.value.series = [];
  props.data.forEach((el: any) => {
    labels.push(el[props.keyName])
    values.push({
      value: el[props.valueName],
      name: el[props.keyName],
      itemStyle: {
        color: el?.meta?.color || '#FD2F70'
      }
    })
  })
  option.value.xAxis.data = labels
  option.value.series.push({
    data: values,
    type: 'bar',
  })
})

</script>

<style scoped>
.chart {
  height: 50vh;
}
</style>