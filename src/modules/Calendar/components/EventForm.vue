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
        <h5>{{ editValue?.id ? 'ویرایش رویداد اقتصادی' : 'افزودن رویداد اقتصادی' }}</h5>
        <span @click="closeForm" class="fa-solid fa-x text-muted"></span>
      </div>
    </template>

    <el-form @submit.prevent="submitForm" :disabled="loading">
      <div class="row m-0">
        <div class="col-md-6 my-1">
          <TextField name="event_name" label="Event Name" placeholder="..." required />
        </div>
        <div class="col-md-6 my-1">
          <TextField name="event_name_fa" label="Persian Event Name" placeholder="..." required />
        </div>

        <div class="col-md-6 my-1" v-for="field in textFields" :key="field.name">
          <TextField :name="field.name" :label="field.label" />
        </div>

        <div class="col-md-12 my-1">
          <CheckboxField :name="'is_rate'" :label="'نمایش به عنوان نرخ بهره'" />
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

<script lang="ts" setup>
import { type PropType, ref, toRefs } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import TextField from '@/components/Form/TextField.vue'
import { update, create } from '@/modules/Calendar/api/event.ts'
import CheckboxField from '@/components/Form/CheckboxField.vue'

const props = defineProps({
  visible: Boolean,
  editValue: {
    type: Object as PropType<Record<string, any> | null>,
    required: false,
    default: null
  }
})
const { visible, editValue } = toRefs(props)

const emits = defineEmits(['close'])

const loading = ref(false)

const textFields = [
  { name: 'measures', label: 'Measures' },
  { name: 'usual_effect', label: 'Usual Effect' },
  { name: 'usual_effect_crypto', label: 'Usual Effect Crypto' },
  { name: 'usual_effect_energy', label: 'Usual Effect Energy' },
  { name: 'usual_effect_metals', label: 'Usual Effect Metal' },
  { name: 'frequently', label: 'Frequently' },
  { name: 'ff_note', label: 'FF note' },
  { name: 'why_trader_cares', label: 'Why Trader Cares' },
  { name: 'derived_via', label: 'Derived Via' },
  { name: 'speaker', label: 'Speaker' },
  { name: 'also_called', label: 'Also Called' },
  { name: 'acro_expand', label: 'Acro Expand' },
  { name: 'intro_link', label: 'Intro Link' },
  { name: 'intro_link_text', label: 'Intro Link Text' },
  { name: 'source_name', label: 'Source Name' },
  { name: 'source_link', label: 'Source Link' },
]

const openForm = () => {
  const data = editValue?.value || {}

  const cleaned = {
    event_name: data.event_name || '',
    event_name_fa: data.event_name_fa || '',
    measures: data.measures || '',
    usual_effect: data.usual_effect || '',
    usual_effect_crypto: data.usual_effect_crypto || '',
    usual_effect_energy: data.usual_effect_energy || '',
    usual_effect_metals: data.usual_effect_metals || '',
    frequently: data.frequently || '',
    ff_note: data.ff_note || '',
    why_trader_cares: data.why_trader_cares || '',
    derived_via: data.derived_via || '',
    speaker: data.speaker || '',
    also_called: data.also_called || '',
    acro_expand: data.acro_expand || '',
    intro_link: data.intro_link || '',
    intro_link_text: data.intro_link_text || '',
    source_name: data.source_name || '',
    source_link: data.source_link || '',
    is_rate: data.is_rate || false
  }

  setValues(cleaned)
}

const closeForm = () => {
  emits('close', false)
}

const schema = yup.object({
  event_name: yup.string().required('ضروری است'),
  event_name_fa: yup.string().required('ضروری است'),
  measures: yup.string().nullable(),
  usual_effect: yup.string().nullable(),
  usual_effect_crypto: yup.string().nullable(),
  usual_effect_energy: yup.string().nullable(),
  usual_effect_metals: yup.string().nullable(),
  frequently: yup.string().nullable(),
  ff_note: yup.string().nullable(),
  why_trader_cares: yup.string().nullable(),
  derived_via: yup.string().nullable(),
  speaker: yup.string().nullable(),
  also_called: yup.string().nullable(),
  acro_expand: yup.string().nullable(),
  intro_link: yup.string().nullable(),
  intro_link_text: yup.string().nullable(),
  source_name: yup.string().nullable(),
  source_link: yup.string().nullable(),
  is_rate: yup.boolean().nullable(),
})

const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
})

const submitForm = handleSubmit(async (values) => {
  try {
    loading.value = true

    if (editValue?.value?.id) {
      await update(editValue.value.id, values)
    } else {
      await create(values)
    }

    closeForm()
  } catch (error) {
    console.error('Error submitting form:', error)
  } finally {
    loading.value = false
  }
})
</script>