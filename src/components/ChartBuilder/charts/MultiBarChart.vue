<template>
  <div>
    <v-chart class='chart' :option='option' autoresize />
  </div>
</template>

<script setup lang='ts'>
import { ref, provide, watch } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent, ToolboxComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  ToolboxComponent,
  LineChart
])

provide(THEME_KEY, 'light')

const props = defineProps(['legends', 'series', 'xAxis'])

const option = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      magicType: { show: true, type: ['line', 'bar', 'stack'] },
      restore: { show: false },
      saveAsImage: { show: true }
    }
  },
  textStyle: {
    fontFamily: 'Vazirmatn FD'
  },
  legend: {
    data: []
  },
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: []
})

watch(() => props.series, (val) => {
  option.value.series = val
}, { deep: true, immediate: true})

watch(() => props.legends, (val) => {
  option.value.legend.data = val
}, {deep: true, immediate: true})

watch(() => props.xAxis, (val) => {
  option.value.xAxis[0].data = val
}, {deep: true, immediate: true})


</script>

<style scoped>
.chart {
  height: 50vh;
}
</style>