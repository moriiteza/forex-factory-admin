<template>
  <div class="container-fluid my-5">
    <div class="row">
      <div class="col-md-12">
        <el-card>
          <div class="p-0 d-flex">
            <h3>تنظیمات تبلیغات</h3>
          </div>
        </el-card>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6 col-12 mx-auto">
        <el-card>
          <div class="d-flex align-items-center gap-3">
            <img :src="baseurl + `/storage/download/?file_name=${data?.value?.desktop_image}`" class="image-thumb" />
            <img :src="baseurl + `/storage/download/?file_name=${data?.value?.mobile_image}`" class="image-thumb ms-auto" />
          </div>
        </el-card>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6 col-12 mx-auto">
        <el-card class="mt-4" v-loading="loading">
          <div class="row">
            <div class="col-md-12 mt-3">
              <SimpleUploadField
                :label="'عکس دسکتاپ'"
                :placeholder="'عکس دسکتاپ'"
                :size="'large'"
                name="desktop_image"
                :has-error="true"
                :limit="1"
                list-type="text"
                :directory="'adds-setting'"
                :multiple="false"
                @uploading="isUploadingFile"
                @uploaded-file-name="
                  (emitData: any) => getUploadedFileName(emitData, 'desktop_image')
                "
              />
            </div>
            <div class="col-md-12 mt-3">
              <SimpleUploadField
                :label="'عکس موبایل'"
                :placeholder="'عکس موبایل'"
                :size="'large'"
                name="mobile_image"
                :has-error="true"
                :limit="1"
                list-type="text"
                :directory="'adds-setting'"
                :multiple="false"
                @uploading="isUploadingFile"
                @uploaded-file-name="
                  (emitData: any) => getUploadedFileName(emitData, 'mobile_image')
                "
              />
            </div>
            <div class="col-md-12 mt-3">
              <TextField name="link" label="لینک تبلیغ" placeholder="..." required />
            </div>
            <div class="col-md-12 mt-3">
              <TextField name="alt" label="Image Alt" placeholder="..." required />
            </div>
            <div class="col-md-12 mt-3">
              <el-button
                size="large"
                @click="submit"
                :loading="loading || uploadLoading"
                :disabled="loading || uploadLoading"
                class="w-100"
                type="success"
                plain>
                ثبت
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { get, create } from '@/modules/Setting/api/ads.ts'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import SimpleUploadField from '@/components/Form/SimpleUploadField.vue'
import TextField from '@/components/Form/TextField.vue'
import { baseurl } from '@/composables/axios.ts'


const loading = ref(false)
const uploadLoading = ref(false)

const data = ref({})

const { values, setFieldValue, setValues } = useForm({
  validationSchema: yup.object().shape({
    desktop_image: yup.string(),
    mobile_image: yup.string(),
    link: yup.string(),
    alt: yup.string(),
  }),
})

const getUploadedFileName = (name: string, filedName: string) => {
  setFieldValue(filedName, name)
}

const getAds = () => {
  loading.value = true
  get()
    .then((res: any) => {
      loading.value = false
      data.value = res.data.data
      setValues(res.data.data.value)
    })
    .finally(() => (loading.value = false))
}

const submit = () => {
  loading.value = true
  create(values).then((res: any) => {
    loading.value = false
  }).catch(() => loading.value = false)
}

const isUploadingFile = (event: any) => {
  uploadLoading.value = event
}
onMounted(() => getAds())
</script>

<style lang="scss">
.image-thumb {
  width: 400px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 16px;
}
</style>
