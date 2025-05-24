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
      drag
      :list-type="listType"
    >
      <el-icon class='el-icon--upload'>
        <upload-filled />
      </el-icon>
      <div class='el-upload__text'>
        فایل خود را بکشید و رها کنید یا <em>کلیک کنید </em>
      </div>
    </el-upload>
    <el-link v-if="preview && typeof (preview) === 'object' && preview?.path" :href='preview?.path' type='success' class='mt-3 pt-5' target="_blank">مشاهده</el-link>
    <div v-else-if="preview && Array.isArray(preview)" v-for='(file, index) of preview'>
        <el-link :href='file?.path' type='success' target="_blank">مشاهده فایل {{index + 1}}</el-link>
    </div>
  </div>
  <el-dialog v-model='dialogVisible' class='d-flex justify-content-center p-5'>
    <img :src='dialogImageUrl' alt='Preview Image' />
  </el-dialog>
</template>

<script lang='ts' setup>
import { ref, toRef, watch } from 'vue'
import type { UploadFile, UploadInstance, UploadProps, UploadRawFile, UploadUserFile } from 'element-plus'
import { ElMessage, genFileId } from 'element-plus'
import { useField } from 'vee-validate'
import axiosInstance from '../../composables/axios'
import { UploadFilled } from '@element-plus/icons-vue'

const upload = ref<UploadInstance>()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
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
const uploadURL = ref(import.meta.env.VUE_APP_SERVER + `file/upload/${props.directory}`)

header.append('Authorization', `Bearer ${localStorage.getItem('sitra-crm-access-token')}`)

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
  const formData = new FormData()
  formData.append('file', files.raw)
  axiosInstance.post(`file-upload/upload/${props.directory}`, formData).then((result: any) => {
    setValue(result.data.data.fileName)
    emits('uploadedFileName', `${props.directory}/${result.data.data.fileName}`)
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

<style scoped>
</style>