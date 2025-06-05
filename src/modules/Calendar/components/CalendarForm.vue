<template>
  <el-dialog
    v-model="visible"
    :append-to-body="true"
    class="el-dialog--center"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :before-close="closeForm"
    :destroy-on-close="true"
    :show-close="false"
    @opened="openForm"
    :width="750"
  >
    <template #header>
      <div class="form-header">
        <h5>{{ editValue?.id ? 'ویرایش اطلاعات تقویم' : 'افزودن اطلاعات تقویم' }}</h5>
        <span @click="closeForm" class="fa-solid fa-x text-muted"></span>
      </div>
    </template>

    <el-form @submit.prevent="submitForm" :disabled="loading">
      <div class="row m-0">
        <div class="col-md-6 my-1">
          <EventSelectField placeholder="انتخاب کنید" name="event" label="رویداد" required />
        </div>

        <div class="col-md-6 my-1">
          <SourceTypeSelectField
            :multiple="true"
            :enum="'calendarType'"
            name="source_type"
            placeholder="تقویم"
            label="تقویم"
          />
        </div>

        <div class="col-md-6 my-1">
          <DatePickerField name="date" label="تاریخ رویداد" result-formatter="YYYY-MM-DD" />
        </div>

        <div class="col-md-6 my-1">
          <TimePickerField placeholder="انتخاب کنید" name="time" label="ساعت رویداد" />
        </div>

        <div class="col-md-6 my-1">
          <TimeModelSelectField placeholder="مدل زمانی" name="time_model_name" label="مدل زمانی" />
        </div>

        <div class="col-md-6 my-1">
          <CurrencySelectField placeholder="انتخاب کنید" name="currency_name" label="نام ارز" />
        </div>

        <div class="col-md-12 my-1">
          <el-divider content-position="right">اطلاعات مقداری</el-divider>
        </div>

        <div class="col-md-4 my-1">
          <TextField name="actual" label="مقدار کنونی" />
        </div>
        <div class="col-md-4 my-1">
          <TextField name="forecast" label="مقدار پیش بینی" />
        </div>
        <div class="col-md-4 my-1">
          <TextField name="previous" label="مقدار قبلی" />
        </div>

        <div class="col-md-6 my-1">
          <TextField name="revised" label="Revised" />
        </div>

        <div class="col-md-6 my-1">
          <DatePickerField name="next_release" label="انتشار بعدی" />
        </div>

        <div class="col-md-12 my-1">
          <el-divider content-position="right">تاثیرات</el-divider>
        </div>

        <div class="col-md-6 my-1">
          <EnumSelectField
            enum="impactType"
            placeholder="انتخاب کنید"
            name="impact"
            label="Impact"
          />
        </div>

        <div class="col-md-6 my-1">
          <EnumSelectField
            enum="impactType"
            placeholder="انتخاب کنید"
            name="impact_crypto"
            label="Impact Crypto"
          />
        </div>
        <div class="col-md-6 my-1">
          <EnumSelectField
            enum="impactType"
            placeholder="انتخاب کنید"
            name="impact_energy"
            label="Impact Energy"
          />
        </div>
        <div class="col-md-6 my-1">
          <EnumSelectField
            enum="impactType"
            placeholder="انتخاب کنید"
            name="impact_metal"
            label="Impact Metal"
          />
        </div>

        <div class="col-md-12 my-1">
          <el-divider content-position="right">سایر اطلاعات</el-divider>
        </div>

        <div class="col-md-12 my-1">
          <TextField name="ff_notice" label="اطلاعیه" />
        </div>

        <div class="col-md-12 my-1">
          <TextField name="description" label="توضیحات" />
        </div>

        <div class="col-md-12 my-1">
          <el-divider content-position="right">اطلاعات رنگ ها</el-divider>
        </div>

        <!-- color_data -->
        <div
          class="col-md-6 my-1"
          v-for="(field, i) in [
            'actual_color',
            'actual_color_crypto',
            'actual_color_energy',
            'actual_color_metal',
            'revised_color',
            'revised_color_crypto',
            'revised_color_energy',
            'revised_color_metal',
          ]"
          :key="i"
        >
          <EnumSelectField
            :enum="'colorTypes'"
            placeholder="انتخاب کنید"
            :name="`color_data.${field}`"
            :label="field"
          />
        </div>
      </div>

      <div class="row justify-content-center mt-4">
        <div class="col-md-3">
          <el-button
            type="primary"
            native-type="submit"
            :loading="loading"
            :disabled="loading"
            class="w-100"
          >
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
import { type PropType, ref, toRefs } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import TextField from '@/components/Form/TextField.vue'
import DatePickerField from '@/components/Form/DatePickerField.vue'
import EnumSelectField from '@/components/Form/EnumSelectField.vue'
import { update, create } from '@/modules/Calendar/api/calendar.ts'
import EventSelectField from '@/components/Form/EventSelectField.vue'
import CurrencySelectField from '@/components/Form/CurrencySelectField.vue'
import TimeModelSelectField from '@/components/Form/TimeModelSelectField.vue'
import TimePickerField from '@/components/Form/TimePickerField.vue'
import SourceTypeSelectField from '@/components/Form/SourceTypeSelectField.vue'

const props = defineProps({
  visible: Boolean,
  editValue: {
    type: Object as PropType<Record<string, any> | null>,
    required: false,
    default: null,
  },
})
const { visible, editValue } = toRefs(props)

const emits = defineEmits(['close'])

const loading = ref(false)

const openForm = () => {
  const data = editValue?.value || null
  const sourceTypes = editValue?.value?.source_type.map((el: any) => el.id) || null

  const cleaned = data
    ? {
        ...data,
        color_data: data.color_data || {},
        event: data?.event?.id,
        source_type: sourceTypes,
      }
    : {
        date: '',
        time: '',
        impact: '',
        actual: '',
        forecast: '',
        previous: '',
        revised: '',
        description: '',
        next_release: '',
        ff_notice: '',
        source_type: '',
        currency_name: '',
        currency_symbol: '',
        currency_market: '',
        time_model_name: '',
        impact_crypto: '',
        impact_energy: '',
        impact_metal: '',
        event: null,
        color_data: {
          actual_color: '',
          actual_color_crypto: '',
          actual_color_energy: '',
          actual_color_metal: '',
          revised_color: '',
          revised_color_crypto: '',
          revised_color_energy: '',
          revised_color_metal: '',
        },
      }

  setValues(cleaned)
}

const closeForm = () => {
  emits('close', false)
}

const schema = yup.object({
  event: yup.number().required('ضروری است'),
  date: yup.string().required(),
  time: yup.string().nullable(),
  impact: yup.string().nullable(),
  actual: yup.string().nullable(),
  forecast: yup.string().nullable(),
  previous: yup.string().nullable(),
  revised: yup.string().nullable(),
  description: yup.string().nullable(),
  next_release: yup.string().nullable(),
  ff_notice: yup.string().nullable(),
  source_type: yup.array().nullable(),
  currency_name: yup.string().nullable(),
  currency_symbol: yup.string().nullable(),
  currency_market: yup.string().nullable(),
  time_model_name: yup.string().nullable(),
  impact_crypto: yup.string().nullable(),
  impact_energy: yup.string().nullable(),
  impact_metal: yup.string().nullable(),
  color_data: yup.object({
    actual_color: yup.string().nullable(),
    actual_color_crypto: yup.string().nullable(),
    actual_color_energy: yup.string().nullable(),
    actual_color_metal: yup.string().nullable(),
    revised_color: yup.string().nullable(),
    revised_color_crypto: yup.string().nullable(),
    revised_color_metal: yup.string().nullable(),
    revised_color_energy: yup.string().nullable(),
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
          metal: values.color_data.actual_color_metal || null,
        },
        revised: {
          default: values.color_data.revised_color || null,
          crypto: values.color_data.revised_color_crypto || null,
          energy: values.color_data.revised_color_energy || null,
          metal: values.color_data.revised_color_metal || null,
        },
      },
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

<style scoped></style>
