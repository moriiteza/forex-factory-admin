<template>
  <div class='w-100'>
    <div class='v-field__input'>
      <div style='display: flex'>
        <label :for='name' class='v-field__label'>
          {{ label }}
          <span v-if='required' class='text-danger'>*</span>
        </label>
      </div>
    </div>
    <el-upload
      :disabled='loading'
      ref='upload'
      :id='name'
      :name='name'
      :model-value='inputValue'
      :action='uploadURL'
      :auto-upload='false'
      :limit='limit || 1'
      :headers='header'
      method='POST'
      :on-exceed='handleExceed'
      :on-preview='handlePictureCardPreview'
      :on-remove='handleRemove'
      :on-change='fileChange'
      :list-type="listType"
    >
      <el-button class="w-100" type="primary">انتخاب فایل</el-button>
    </el-upload>
  </div>
</template>

<script lang='ts' setup>
import { ref, toRef } from 'vue'
import type { UploadFile, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { ElMessage, genFileId } from 'element-plus'
import { useField } from 'vee-validate'
import axiosInstance from '../../composables/axios'
import { useAuthStore } from '@/stores/auth.ts'

const upload = ref<UploadInstance>()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const authStore = useAuthStore()

const header = new Headers()
const props: any = defineProps({
  name: String,
  value: String,
  label: String,
  uid: Number,
  fileType: String,
  loading: Boolean,
  limit: Number,
  listType: String,
  required: Boolean,
  preview: Object,
  directory: String
})
const emits = defineEmits(['uploading', 'delete', 'uploadedFileName'])

const handleRemove: UploadProps['onRemove'] = () => {
  ElMessage.success('فایل حذف شد')
  emits('delete')
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const fileChange: UploadProps['onChange'] = (files: any) => {
  emits('uploading', true)
  const headers = {
    Authorization: `Bearer ${authStore.token}`,
    'Content-Type': 'multipart/form-data'
  }
  const formData = new FormData()
  formData.append('file', files.raw)
  formData.append('directory', props.directory)
  axiosInstance.post(`storage/upload/`, formData, { headers }).then((result: any) => {
    setValue(result.data.data.stored_name)
    emits('uploadedFileName', `${result.data.data.stored_name}`)
  }).then(() => {
    ElMessage.success('فایل با موفیت بارگذاری شد')
  }).catch((error: any) => {
    ElMessage.error('عملیات با خطا مواجه شد')
    upload.value!.clearFiles()

  }).finally(() => emits('uploading', false))
}

const name: any = toRef(props, 'name')

const {
  value: inputValue,
  setValue,
  meta: { touched }
} = useField(name, undefined, {
  initialValue: props.value
})
</script>

<style scoped lang="scss">
:deep(.el-upload) {
  width: 100% !important;
}
</style>