<template>
  <v-chart class='chart' :option='option' autoresize />
</template>

<script setup lang='ts'>
import { ref, provide, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { TreemapChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart, { THEME_KEY } from 'vue-echarts'

use([
  CanvasRenderer,
  TreemapChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])

provide(THEME_KEY, 'light')

const props = defineProps(['data'])

const option = ref({
  tooltip: {
    trigger: 'item',
  },
  textStyle: {
    fontFamily: 'Vazirmatn FD'
  },
  series: []
})

const show = ref(false)

onMounted(() => {
  show.value = false
  const values = []
  props.data.cols.forEach((el: any) => {
    values.push({
      value: el.value,
      name: el.label,
      itemStyle: {
        color: el.meta.color
      }
    })
  })
  option.value.series.push({
    type: "treemap",
    roam: false,
    nodeClick: false,
    animation: false,
    selectedMode: false,
    breadcrumb: false,
    animationDurationUpdate: 900,
    animationEasing: "null",
    data: [{ children: values }]
  })
})

</script>

<style scoped>
.chart {
  height: 50vh;
}
</style>