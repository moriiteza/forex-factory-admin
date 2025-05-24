<template>
  <div v-if='show'>
    <DoughnutChart :data='valueData' :has-detail='detail' v-if="chartType === 'doughnut'"
                   :key-name="keyName" :value-name="valueName"
                   :legend-top='props.legendTop' :series-right='props.seriesRight'/>
    <PieChart :data='valueData' :has-detail='detail' v-if="chartType === 'pie'"
              :key-name="keyName" :value-name="valueName"
              :legend-top='props.legendTop' :series-right='props.seriesRight'/>
    <BarChart :data='valueData' v-if="chartType === 'bar'" :key-name="keyName" :value-name="valueName"/>
    <MultiBarChart :series='valueData' :x-axis="props.xAxis" :legends="props.legends" v-if="chartType === 'multiBar'"/>
    <Treemap :data='valueData' v-if="chartType === 'treemap'" :key-name="keyName" :value-name="valueName"/>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'
import BarChart from '@/components/ChartBuilder/charts/BarChart.vue'
import Treemap from '@/components/ChartBuilder/charts/Treemap.vue'
import DoughnutChart from '@/components/ChartBuilder/charts/DoughnutChart.vue'
import MultiBarChart from '@/components/ChartBuilder/charts/MultiBarChart.vue'


const show = ref(false)
const props = defineProps(['chartData', 'detail', 'legendTop', 'seriesRight', 'chartType', 'keyName', 'valueName', 'legends', 'xAxis'])

const valueData: any = ref(null);

watch(() => props.chartData, (value) => {
  show.value = false;
  valueData.value = null
  valueData.value = value;
  show.value = true
}, {deep: true, immediate: true})


</script>

<style scoped>
.chart {
  height: 50vh;
}
</style>