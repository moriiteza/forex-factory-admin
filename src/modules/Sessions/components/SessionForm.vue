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
        <h5>
          {{ editValue?.id ? 'ویرایش اطلاعات جلسه معاملاتی' : 'افزودن اطلاعات جلسه معاملاتی' }}
        </h5>
        <span @click="closeForm" class="fa-solid fa-x text-muted"></span>
      </div>
    </template>

    <el-form @submit.prevent="submitForm" :disabled="loading">
      <div class="row m-0">
        <div class="col-md-6 my-1">
          <TimePickerField
            placeholder="انتخاب کنید"
            name="start_time"
            label="ساعت شروع به وقت محلی"
          />
        </div>

        <div class="col-md-6 my-1">
          <TimePickerField
            placeholder="انتخاب کنید"
            name="end_time"
            label="ساعت پایان به وقت محلی"
          />
        </div>

        <div class="col-md-6 my-1">
          <TextField name="country" label="نام کشور" />
        </div>

        <div class="col-md-6 my-1">
          <TextField name="country_name" label="کد کشور" />
        </div>

        <div class="col-md-6 my-1">
          <TextField name="timezone" label="اختلاف زمانی " placeholder="3:30+"/>
        </div>

        <div class="col-md-6 my-3">
          <CheckboxField name="is_active" label="فعال" />
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
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { type PropType, ref, toRefs } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import TextField from '@/components/Form/TextField.vue'
import { update, create } from '@/modules/Sessions/api/sessions.ts'
import TimePickerField from '@/components/Form/TimePickerField.vue'
import CheckboxField from '@/components/Form/CheckboxField.vue'

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
  const cleaned = { ...data }
  setValues(cleaned)
}

const closeForm = () => {
  emits('close', false)
}

const schema = yup.object({
  country_name: yup.string().required('ضروری است'),
  country: yup.string().required('ضروری است'),
  timezone: yup.string().required('ضروری است'),
  start_time: yup.string().required('ضروری است'),
  end_time: yup.string().required('ضروری است'),
  is_active: yup.boolean().required('ضروری است'),
})

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
})

const submitForm = handleSubmit(async (values) => {
  try {
    loading.value = true
    const payload = { ...values }
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
