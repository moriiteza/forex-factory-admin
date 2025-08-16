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
          {{ editValue?.id ? 'ویرایش اطلاعات بسته' : 'افزودن اطلاعات بسته' }}
        </h5>
        <span @click="closeForm" class="fa-solid fa-x text-muted"></span>
      </div>
    </template>

    <el-form @submit.prevent="submitForm" :disabled="loading">
      <div class="row m-0">
        <div class="col-md-6 my-1">
          <TextField name="name" label="نام" />
        </div>

        <div class="col-md-6 my-1">
          <EnumSelectField enum="planTypes" name="type" label="نوع" />
        </div>

        <div class="col-md-12 my-3" v-if="values.type === 'JOURNAL'">
          <TextField name="available_time" label="مدت زمان اعتبار " placeholder="2 (به ماه)"/>
        </div>

        <div class="col-md-12 my-3" v-else>
          <TextField name="available_requests" label="تعداد درخواست" />
        </div>

        <div class="col-md-12 my-1">
          <TextField name="price" label="قیمت (تومان)" />
        </div>

        <div class="col-md-12 my-1">
          <TextField name="description" label="توضیحات" />
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
import { update, create } from '@/modules/Subscription/api/plans.ts'
import * as yup from 'yup'
import TextField from '@/components/Form/TextField.vue'
import EnumSelectField from '@/components/Form/EnumSelectField.vue'

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
  name: yup.string().required('ضروری است'),
  description: yup.string().required('ضروری است'),
  type: yup.string().required('ضروری است'),
  price: yup.number().required('ضروری است'),
  available_time: yup.number().optional().nullable(),
  available_requests: yup.number().optional().nullable(),
})

const { handleSubmit, values, setValues } = useForm({
  validationSchema: schema,
})

const submitForm = handleSubmit(async (body) => {
  try {
    loading.value = true
    const payload = { ...body }
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
