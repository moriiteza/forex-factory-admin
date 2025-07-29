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
    :width="750"
    @opened="openForm"
  >
    <template #header>
      <div class="form-header">
        <h5>
          {{ editValue?.id ? 'ویرایش کاربر' : 'افزودن کاربر' }}
        </h5>
        <span @click="closeForm" class="fa-solid fa-x text-muted"></span>
      </div>
    </template>


    <el-form @submit.prevent="submitUserInfo" :disabled="loadingInfo" v-if="!loadingForm">
      <div class="row m-0">
        <div class="col-md-6 my-1">
          <TextField name="first_name" label="نام"/>
        </div>
        <div class="col-md-6 my-1">
          <TextField name="last_name" label="نام خانوادگی"/>
        </div>
        <div class="col-md-6 my-1">
          <TextField name="email" label="ایمیل" />
        </div>
        <div class="col-md-6 my-1">
          <TextField name="phone" label="شماره تماس" />
        </div>
        <div class="col-md-6 my-1">
          <TextField name="broker_choices" label="انتخاب های بروکر" />
        </div>
        <div class="col-md-6 my-1">
          <TextField name="timezone" label="تایم زون" />
        </div>
        <div class="col-md-12 my-1">
          <TextField name="username" label="نام کاربری" />
        </div>
        <div class="col-md-6 my-2">
          <CheckboxField name="is_active" label="فعال" />
        </div>
        <div class="col-md-6 my-2">
          <CheckboxField name="is_superuser" label="مدیر کل" />
        </div>

        <div class="row justify-content-center mt-4">
          <div class="col-md-3">
            <el-button type="primary" native-type="submit" :loading="loadingInfo" class="w-100">
              ذخیره اطلاعات
            </el-button>
          </div>
          <div class="col-md-3">
            <el-button type="warning" class="w-100" @click="closeForm" :disabled="loadingInfo">
              انصراف
            </el-button>
          </div>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, toRefs, type PropType } from 'vue'
import * as yup from 'yup'
import { useForm as useUserForm } from 'vee-validate'
import TextField from '@/components/Form/TextField.vue'
import { create, get, update } from '@/modules/Users/api/user'
import CheckboxField from '@/components/Form/CheckboxField.vue'

const props = defineProps({
  visible: Boolean,
  editValue: {
    type: Object as PropType<Record<string, any> | null>,
    default: null,
  },
})
const emits = defineEmits(['close'])
const { visible, editValue } = toRefs(props)

const loadingInfo = ref(false)
const loadingForm = ref(true)

const {
  handleSubmit,
  setValues,
  setFieldError
} = useUserForm({
  validationSchema: yup.object().shape({
    first_name: yup.string(),
    last_name: yup.string(),
    email: yup.string().email(),
    phone: yup.string().required('ضروری است'),
    broker_choices: yup.string(),
    timezone: yup.string(),
    username: yup.string().required('ضروری است'),
    is_active: yup.boolean().required('ضروری است'),
    is_superuser: yup.boolean().required('ضروری است'),
  }),
})

const submitUserInfo = handleSubmit(async (values) => {
  try {
    loadingInfo.value = true
    if (editValue?.value?.id) {
      await update(editValue.value.id, values)
    } else {
      await create(values)
    }
    closeForm()
  } catch (error: any) {
    Object.keys(error.response.data).forEach((key) => {
      setFieldError(key, error.response.data[key])
    })
  } finally {
    loadingInfo.value = false
  }
})

const openForm = async () => {
  if (editValue?.value?.id) {
    loadingForm.value = true
    const data = await get(editValue.value.id)
    setValues({
      first_name: data.data.data?.first_name,
      last_name: data.data.data?.last_name,
      email: data.data.data?.email,
      phone: data.data.data?.phone,
      timezone: data.data.data?.timezone,
      broker_choices: data.data.data?.broker_choices,
      is_active: data.data.data?.is_active,
      is_superuser: data.data.data?.is_superuser,
      username: data.data.data?.username,
    })
    loadingForm.value = false
  } else {
    loadingForm.value = false
  }
}

const closeForm = () => emits('close', false)
</script>

<style scoped>
.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
