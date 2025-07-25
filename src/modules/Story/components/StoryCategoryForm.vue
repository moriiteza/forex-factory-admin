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
    :width="600"
  >
    <template #header>
      <div class="form-header">
        <h5>{{ editValue?.id ? 'ویرایش دسته بندی استوری' : 'افزودن دسته بندی استوری' }}</h5>
        <span @click="closeForm" class="fa-solid fa-x text-muted"></span>
      </div>
    </template>

    <el-form @submit.prevent="submitForm" :disabled="loading">
      <div class="row m-0">
        <div class="col-md-12 my-1">
          <TextField name="title" label="عنوان" placeholder="..." required />
        </div>

        <div class="col-md-12 my-1">
          <SimpleUploadField
            :label="'عکس'"
            :placeholder="'عکس'"
            :size="'large'"
            name="cover"
            :has-error="true"
            :limit="1"
            list-type="text"
            :directory="'story-categories'"
            :multiple="false"
            :preview="editValue?.image"
            @uploaded-file-name="getUploadedFileName"
          />
        </div>

        <div class="col-md-12 my-1">
          <CheckboxField name="is_public" label="عمومی؟"/>
        </div>
      </div>

      <div class="row justify-content-center mt-4">
        <div class="col-md-4">
          <el-button type="primary" native-type="submit" :loading="loading" :disabled="loading" class="w-100">
            ذخیره
          </el-button>
        </div>
        <div class="col-md-4">
          <el-button type="warning" class="w-100" @click="closeForm" :disabled="loading">
            انصراف
          </el-button>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, toRefs, type PropType } from 'vue'
import { useForm } from 'vee-validate'
import { create, update } from '@/modules/Story/api/story-category.ts'
import TextField from '@/components/Form/TextField.vue'
import SimpleUploadField from '@/components/Form/SimpleUploadField.vue'
import CheckboxField from '@/components/Form/CheckboxField.vue'
import * as yup from 'yup'

const props = defineProps({
  visible: Boolean,
  editValue: {
    type: Object as PropType<Record<string, any> | null>,
    default: null,
  },
})
const { visible, editValue } = toRefs(props)
const emits = defineEmits(['close'])
const loading = ref(false)

const schema = yup.object({
  title: yup.string().required('عنوان ضروری است'),
  cover: yup.string().url('فرمت آدرس تصویر صحیح نیست').nullable(),
  description: yup.string().nullable(),
  is_public: yup.boolean().default(true),
})

const { setValues, values, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    active: true,
    title: '',
    cover: '',
  },
})

const openForm = () => {
  const data = editValue?.value || {}
  setValues({
    title: data.title || '',
    cover: data.cover || '',
    active: data.active ?? true,
  })
}

const closeForm = () => {
  emits('close', false)
}

const submitForm = async () => {
  try {
    loading.value = true

    if (editValue?.value?.id) {
      await update(editValue.value.id, values)
    } else {
      await create(values)
    }

    closeForm()
  } catch (error) {
    console.error('Form submission failed:', error)
  } finally {
    loading.value = false
  }
}

const getUploadedFileName = (fileName: string) => {
  setFieldValue('cover', fileName)
}
</script>
