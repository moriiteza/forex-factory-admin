<template>
  <div class="w-75 mx-auto">
    <div class="col-md-6 col-12 mx-auto">
      <el-card class="w-100">
        <template #header>
          <div class="d-flex align-items-center">
            <h4 class="text-center my-4">ورود مدیران</h4>
            <img src="@/assets/images/LOGO.png" width="60" height="60" class="ms-auto" />
          </div>
        </template>
        <el-form @submit.prevent="submitForm">
          <TextField
            class="form-input mt-5"
            :is-rtl="false"
            placeholder="نام کاربری"
            label="نام کاربری"
            name="username"
            size="large"
            dir="ltr"
            type="tell"
          />
          <TextField
            class="form-input mt-5"
            :is-rtl="false"
            placeholder="رمز عبور"
            label="رمز عبور"
            name="password"
            size="large"
            dir="ltr"
            type="password"
          />
          <el-button
            type="primary"
            class="w-100 mt-5 p-4"
            plain
            :loading="loading"
            :disabled="loading"
            native-type="submit"
          >ورود
          </el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth.ts'
import { useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import TextField from '@/components/Form/TextField.vue'
import { ref } from 'vue'

const auth = useAuthStore()
const router = useRouter()

const loading = ref(false)

const { values } = useForm({
  validationSchema: yup.object().shape({
    username: yup.mixed(),
    password: yup.mixed(),
  }),
})

const submitForm = async () => {
  loading.value = true
  try {
    await auth.login(values.username, values.password)
    await router.push('/')
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}
</script>

<style></style>
