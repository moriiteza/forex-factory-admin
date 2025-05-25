<template>
  <el-dialog
    v-model='visible'
    :append-to-body='true'
    class='el-dialog--center'
    :close-on-press-escape='false'
    :close-on-click-modal='false'
    :before-close='closeForm'
    :destroy-on-close='true'
    :show-close='false'
    @opened='openForm'
    :width='750'
  >
    <template #header>
      <div class="form-header">
        <h5>{{ editValue?.id ? 'ویرایش رویداد اقتصادی' : 'افزودن رویداد اقتصادی' }}</h5>
        <span @click="closeForm" class="fa-solid fa-x text-muted"></span>
      </div>
    </template>

    <el-form @submit.prevent="submitForm" :disabled="loading">
      <div class="row m-0">
        <div class="col-md-6 my-1">
          <TextField name="event_name" label="عنوان رویداد (انگلیسی)" placeholder="..." required />
        </div>
        <div class="col-md-6 my-1">
          <TextField name="event_name_fa" label="عنوان رویداد (فارسی)" placeholder="..." required />
        </div>

        <div class="col-md-6 my-1">
          <TextField name="currency_name" label="ارز" placeholder="USD" />
        </div>
        <div class="col-md-6 my-1">
          <EnumSelectField :enum="'calendarType'" name="currency_market" label="بازار ارز" placeholder="Crypto / Forex" />
        </div>

        <div class="col-md-6 my-1">
          <DatePickerField name="date" label="تاریخ رویداد" placeholder="YYYY-MM-DD" result-formatter="YYYY-MM-DD" />
        </div>
        <div class="col-md-6 my-1">
          <TextField name="time" label="ساعت رویداد" placeholder="13:00" />
        </div>

        <div class="col-md-4 my-1">
          <TextField name="actual" label="Actual" />
        </div>
        <div class="col-md-4 my-1">
          <TextField name="forecast" label="Forecast" />
        </div>
        <div class="col-md-4 my-1">
          <TextField name="previous" label="Previous" />
        </div>

        <div class="col-md-6 my-3">
          <TextField name="impact" label="Impact" />
        </div>
        <div class="col-md-6 my-3">
          <TextField name="revised" label="Revised" />
        </div>

        <div class="col-md-6 my-3">
          <DatePickerField name="next_release" label="انتشار بعدی" result-formatter="YYYY-MM-DD" />
        </div>
        <div class="col-md-6 my-3">
          <TextField name="ff_notice" label="توضیح" />
        </div>

        <div class="col-md-6 my-3">
          <TextField name="source_name" label="منبع" />
        </div>
        <div class="col-md-6 my-3">
          <TextField name="source_link" label="لینک منبع" />
        </div>

        <div class="col-md-6 my-3">
          <EnumSelectField :enum="'calendarType'" name="source_type" label="نوع منبع" />
        </div>
        <div class="col-md-6 my-3">
          <TextField name="currency_symbol" label="نماد ارز" />
        </div>

        <div class="col-md-12 my-3">
          <TextField name="time_model_name" label="مدل زمانی" />
        </div>

        <div class="col-md-4 my-3">
          <TextField name="impact_crypto" label="Impact Crypto" />
        </div>
        <div class="col-md-4 my-3">
          <TextField name="impact_energy" label="Impact Energy" />
        </div>
        <div class="col-md-4 my-3">
          <TextField name="impact_metal" label="Impact Metal" />
        </div>
      </div>

      <!-- Nested Event Data -->
      <div class="row mt-3">
        <div class="col-12">
          <h6>اطلاعات تکمیلی</h6>
        </div>
        <div class="col-md-6 my-1" v-for="field in ['measures', 'usual_effect', 'frequently', 'ff_note', 'why_trader_cares']" :key="field">
          <TextField :name="`event_data.${field}`" :label="field" />
        </div>
      </div>

      <!-- Nested Color Data -->
      <div class="row mt-3">
        <div class="col-12">
          <h6>اطلاعات رنگ</h6>
        </div>
        <div class="col-md-6 my-1" v-for="field in ['actual_color', 'revised_color', 'actual_color_crypto', 'actual_color_energy']" :key="field">
          <EnumSelectField :placeholder="field" :enum="'colorTypes'" :name="`color_data.${field}`" :label="field" />
        </div>
      </div>

      <div class="row justify-content-center mt-4">
        <div class="col-md-3">
          <el-button type="primary" native-type="submit" :loading="loading" :disabled="loading" class="w-100">
            ذخیره
          </el-button>
        </div>
        <div class="col-md-3">
          <el-button type="warning" class="w-100" @click="closeForm" :disabled="loading">
            انصراف
          </el-button>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import TextField from '@/components/Form/TextField.vue'
import DatePickerField from '@/components/Form/DatePickerField.vue'
import EnumSelectField from '@/components/Form/EnumSelectField.vue'
import { update, create } from '@/modules/Calendar/api/calendar.ts'

const props = defineProps({
  visible: Boolean,
  editValue: Object
})
const { visible, editValue } = toRefs(props)

const emits = defineEmits(['close'])

const loading = ref(false)

const openForm = () => {
  const data = editValue?.value || null

  const cleaned = data ? {
    ...data,
    event_data: data.event_data || {},
    color_data: {
      actual_color: data.color_data?.actual?.default || '',
      revised_color: data.color_data?.revised?.default || '',
      actual_color_crypto: data.color_data?.actual?.crypto || '',
      actual_color_energy: data.color_data?.actual?.energy || '',
    },
  } : {
    event_name: '',
    event_name_fa: '',
    currency_name: '',
    currency_market: '',
    date: '',
    time: '',
    actual: '',
    forecast: '',
    previous: '',
    impact: '',
    revised: '',
    next_release: '',
    ff_notice: '',
    source_name: '',
    source_link: '',
    source_type: '',
    currency_symbol: '',
    time_model_name: '',
    impact_crypto: '',
    impact_energy: '',
    impact_metal: '',
    event_data: {
      measures: '',
      usual_effect: '',
      frequently: '',
      ff_note: '',
      why_trader_cares: '',
    },
    color_data: {
      actual_color: '',
      revised_color: '',
      actual_color_crypto: '',
      actual_color_energy: '',
    },
  }

  setValues(cleaned)
}

const closeForm = () => {
  emits('close', false)
}

const schema = yup.object({
  event_name: yup.string().required('ضروری است'),
  event_name_fa: yup.string().required('ضروری است'),
  currency_name: yup.string().nullable(),
  currency_market: yup.string().nullable(),
  date: yup.string().required('ضروری است'),
  time: yup.string().nullable(),
  actual: yup.string().nullable(),
  forecast: yup.string().nullable(),
  previous: yup.string().nullable(),
  impact: yup.string().nullable(),
  revised: yup.string().nullable(),
  next_release: yup.string().nullable(),
  ff_notice: yup.string().nullable(),
  source_name: yup.string().nullable(),
  source_link: yup.string().nullable(),
  source_type: yup.string().nullable(),
  currency_symbol: yup.string().nullable(),
  time_model_name: yup.string().nullable(),
  impact_crypto: yup.string().nullable(),
  impact_energy: yup.string().nullable(),
  impact_metal: yup.string().nullable(),
  event_data: yup.object({
    measures: yup.string().nullable(),
    usual_effect: yup.string().nullable(),
    frequently: yup.string().nullable(),
    ff_note: yup.string().nullable(),
    why_trader_cares: yup.string().nullable(),
  }),
  color_data: yup.object({
    actual_color: yup.string().nullable(),
    revised_color: yup.string().nullable(),
    actual_color_crypto: yup.string().nullable(),
    actual_color_energy: yup.string().nullable(),
  }),
})

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
})

const submitForm = handleSubmit(async (values) => {
  try {
    loading.value = true
    const payload = {
      ...values,
      color_data: {
        actual: {
          default: values.color_data.actual_color || null,
          crypto: values.color_data.actual_color_crypto || null,
          energy: values.color_data.actual_color_energy || null,
          metal: null
        },
        revised: {
          default: values.color_data.revised_color || null,
          crypto: null,
          energy: null,
          metal: null
        }
      }
    }
    if (editValue?.value?.id) {
      await update(editValue?.value?.id, payload)
    } else {
      await create(payload)
    }
    closeForm()
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    loading.value = false
  }
})

</script>


<style scoped>

</style>