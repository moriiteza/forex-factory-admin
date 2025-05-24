<template>
  <div class="chart-container">
    <v-chart class='chart' :option='option' autoresize/>
  </div>
</template>

<script setup lang='ts'>
import {ref, watch, provide, onMounted} from 'vue'
import {use} from 'echarts/core'
import {CanvasRenderer} from 'echarts/renderers'
import {PieChart} from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart, {THEME_KEY} from 'vue-echarts'

use([
  CanvasRenderer,
  PieChart, TitleComponent,
  TooltipComponent,
  LegendComponent
])

provide(THEME_KEY, 'light')

const props = defineProps(['data', 'hasDetail', 'legendTop', 'seriesRight'])

const option = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  textStyle: {
    fontFamily: 'Vazirmatn FD'
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    left: 'right',
    data: [],
    top: 20,
    itemWidth: 20,
    formatter: (name: string) => {
      if (!props.hasDetail) {
        return name
      }
      const dataItem = props.data.cols.find((item: any) => item.label === name)
      return `{a|${dataItem.meta.percent}%} {b|${dataItem.value}} {c|${dataItem.label}}`
    },
    textStyle: {
      rich: {
        a: {
          align: 'left',
          width: 50
        },
        b: {
          align: 'left',
          width: 50
        },
        c: {
          align: 'right',
          width: 150
        }
      }
    }
  },
  series: []
})

const show = ref(false)
const fillData = () => {
  show.value = false
  const labels = []
  const values = []
  setTimeout(() => {
    if (props.data.cols) {
      props.data.cols.forEach((el: any) => {
        labels.push(el.label)
        values.push({
          value: el.value,
          name: el.label,
          itemStyle: {
            color: el.meta.color
          }
        })
      })
      option.value.legend.data = labels
      option.value.series = []
      option.value.series.push({
        name: '',
        type: 'pie',
        radius: '85%',
        center: ['50%', '60%'],
        right: props.seriesRight | 0,
        bottom: 50,
        data: values,
        label: {
          formatter: function (params: any) {
            return params.percent == 0 ? '' : `${params.percent}%`;
          },
          position: 'inside'
        },
      })
    }
  }, 500)
}
watch(() => props.data, (value: any) => {
  fillData()
})
onMounted(() => {
  fillData()
})

</script>

<style scoped>
.chart {
  height: 40vh;
}
</style>