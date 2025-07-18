
<template>
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
      @open="loadingPass = false"
      :width="750"
    >
      <template #header>
        <div class="form-header">
          <h5>
            ویرایش رمز عبور کاربر
          </h5>
          <span @click="closeForm" class="fa-solid fa-x text-muted"></span>
        </div>
      </template>

      <el-form @submit.prevent="submitPassword" :disabled="loadingPass">
        <div class="row m-0">
          <div class="col-md-6 my-1">
            <TextField name="password" label="رمز عبور جدید" type="password" />
          </div>
          <div class="col-md-6 my-1">
            <TextField name="confirm_password" label="تکرار رمز عبور" type="password" />
          </div>

          <div class="row justify-content-center mt-4">
            <div class="col-md-3">
              <el-button type="primary" native-type="submit" :loading="loadingPass" class="w-100">
                تغییر رمز
              </el-button>
            </div>
            <div class="col-md-3">
              <el-button type="warning" class="w-100" @click="closeForm" :disabled="loadingPass">
                انصراف
              </el-button>
            </div>
          </div>
        </div>
      </el-form>
    </el-dialog>
  </template>
</template>


<script setup lang="ts">
import { ref, toRefs, type PropType } from 'vue'
import * as yup from 'yup'
import { get, update } from '@/modules/Users/api/user'
import { useForm as usePasswordForm } from 'vee-validate'
import TextField from '@/components/Form/TextField.vue'

const props = defineProps({
  visible: Boolean,
  editValue: {
    type: Object as PropType<Record<string, any> | null>,
    default: null,
  },
})
const emits = defineEmits(['close'])
const { visible, editValue } = toRefs(props)

const loadingPass = ref(false)

const passSchema = yup.object({
  password: yup.string().min(6).required('رمز عبور ضروری است'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'رمز عبور مطابقت ندارد')
    .required('تکرار رمز عبور ضروری است'),
})

const {
  handleSubmit,
  resetForm,
} = usePasswordForm({
  validationSchema: passSchema,
})

const submitPassword = handleSubmit(async (values) => {
  try {
    loadingPass.value = true
    if (editValue?.value?.id) {
      await update(editValue.value.id, { password: values.password })
    }
    closeForm()
  } catch (error) {
    console.error('Password change error:', error)
  } finally {
    loadingPass.value = false
  }
})

const closeForm = () => emits('close', false)

</script>

<style scoped>

</style>