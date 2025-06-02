<template>
  <div class='row'>
    <div class='col-md-2 col-12 px-1 mt-2' v-for='item of props.items'>
      <TextField :icon='item.icon' :name='item.name' :placeholder='item.title' :label='item.label' v-if="item.type === 'textField'" :size="'large'"/>
      <PersianDatePickerField :name='item.name' :placeholder='item.title' :label='item.label' v-if="item.type === 'persianDate'" :size="'large'" :result-formatter='item.dateFormat'/>
      <DatePickerField :name='item.name' :placeholder='item.title' :label='item.label' v-if="item.type === 'date'" :size="'large'"/>
      <Select :name='item.name' :placeholder='item.title' :label='item.label' :filterable='item.filterAble' :remote-filterable='item.remoteFilterAble' :items='item.options' v-if="item.type === 'select'" :multiple='item.multiple' :size="'large'"/>
      <EnumSelectField :name='item.name' :placeholder='item.title' , :label='item.label' v-if="item.type ==='enumSelect'" :enum='item.enum' :size="'large'"/>
      <CheckboxField :name="item.name" :placeholder="item.title" :label="item.label" , v-if="item.type === 'checkbox'" :size="'large'"/>
      <SourceTypeSelectField :multiple="item.multiple" :name="item.name" :placeholder="item.title" :label="item.label" , v-if="item.type === 'sourceType'" :size="'large'"/>
      <EventSelectField :name="item.name" :placeholder="item.title" :label="item.label" , v-if="item.type === 'eventSelect'" :size="'large'"/>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {useForm} from 'vee-validate'
import {watch} from 'vue'
import * as yup from 'yup'
import _ from 'lodash'
import TextField from '@/components/Form/TextField.vue'
import Select from '@/components/Form/SelectField.vue'
import EnumSelectField from '@/components/Form/EnumSelectField.vue'
import CheckboxField from '@/components/Form/CheckboxField.vue'
import DatePickerField from '@/components/Form/DatePickerField.vue'
import { useRoute } from 'vue-router'
import PersianDatePickerField from '@/components/Form/PersianDatePickerField.vue'
import SourceTypeSelectField from '@/components/Form/SourceTypeSelectField.vue'
import EventSelectField from '@/components/Form/EventSelectField.vue'

const props = defineProps(['items', 'defaults'])
const emits = defineEmits(['filter'])
const route = useRoute();

const yupObject: any = {}

for (const item of props.items) {
  yupObject[item.name] = yup.mixed()
}

const {values, setValues} = useForm({
  validationSchema: yup.object().shape(yupObject)
})

const createFilterObject = (data?: any) => {
  emits('filter', values)
}

watch(values, _.debounce(() => {
  createFilterObject(values)
}, 1000), { deep: true, immediate: true })

if (route.query) {
  setTimeout(() => setValues(route.query), 1000)
}

</script>

<style scoped>

</style>
