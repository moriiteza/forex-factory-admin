<template>
  <div class="container">
    <div class="my-5">
      <form @submit.prevent="submit" :loading="loading">
        <div class="row my-3">
          <el-card>
            <template #header>
              <span>آموزش ژرنال</span>
            </template>
            <div class="row" v-if="!loading">
              <div class="col-md-12">
                <EditorField placeholder="توضیحات" label="توضیحات" name="description" required :upload-directory="'tutorial-setting'"/>
              </div>
            </div>
          </el-card>
        </div>
        <div class="row my-3">
          <div class="col-md-4 mx-auto">
            <el-button type="success" size="large" class="w-100" native-type="submit" :loading="loadingFile">ثبت </el-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useForm } from 'vee-validate'
import { ElMessage } from 'element-plus'
import * as yup from 'yup'
import EditorField from '@/components/Form/EditorField.vue'
import { create, get } from '@/modules/Setting/api/tutorial.ts'

const loading = ref(false);
const loadingFile = ref(false);

const { values, setFieldValue } = useForm({
  validationSchema: yup.object().shape({
    description: yup.string(),
  })
})

const getData = () => {
  loading.value = true;
  get().then((res: any) => {
    setFieldValue('description', res.data.data.value.description);
  }).finally(() => loading.value = false)
}

const submit = () => {
  create(values).then((res: any) => {
    ElMessage.success('عملیات با موفقیت انجام شد');
  })
}


onMounted(() => getData())
</script>

<style>
</style>