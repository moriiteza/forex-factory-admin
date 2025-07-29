<template>
  <div class="container my-5">
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
      <div class="col-md-12 col-12 mx-auto">
        <el-card class="mt-4" v-loading="loading">
          <div class="row">
            <div class="col-md-3 mt-3">
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
            <div class="col-md-3 mt-3">
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
            <div class="col-md-3 mt-3">
              <TextField name="link" label="لینک تبلیغ" placeholder="..." required />
            </div>
            <div class="col-md-3 mt-3">
              <TextField name="alt" label="Image Alt" placeholder="..." required />
            </div>
            <div class="col-md-3 mt-3">
              <CheckboxField name="is_active" label="فعال" placeholder="..." required />
            </div>
            <div class="col-md-3 mt-3">
              <el-button
                size="large"
                @click="submit"
                :loading="loading || uploadLoading"
                :disabled="loading || uploadLoading"
                class="w-100"
                type="success"
                plain
              >
                ثبت
              </el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md-12">
        <el-card class="mt-4" v-loading="loading">
          <DataTable
            :columns="tableColumns"
            :rows="data"
            :selection="false"
            :table-name="'لیست تبلیغات'"
            :layout="'auto'"
            :refresh-button="true"
            :total-item="0"
            :table-filters="tableFilters"
          />
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { get, create, removeFile } from '@/modules/Setting/api/ads.ts'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import SimpleUploadField from '@/components/Form/SimpleUploadField.vue'
import TextField from '@/components/Form/TextField.vue'
import type { TableColumnInterFace } from '@/interfaces/table.ts'
import type { FilterBuilderInterface } from '@/interfaces/filter-builder.ts'
import DataTable from '@/components/DataTable/DataTable.vue'
import CheckboxField from '@/components/Form/CheckboxField.vue'
import { ElMessage } from 'element-plus'

interface AdsSetting {
  id: number
  alt: string
  link: string
  is_active: boolean
  mobile_image: string
  desktop_image: string
}

const loading = ref(false)
const uploadLoading = ref(false)
const data = ref<AdsSetting[] | []>([])
const editRow = ref<AdsSetting | null>()

const tableColumns: TableColumnInterFace[] = [
  {
    title: 'لینک',
    key: 'link',
    type: 'text',
    sortable: false,
  },
  {
    title: 'Alt',
    key: 'alt',
    type: 'text',
    sortable: false,
  },
  {
    title: 'فعال',
    key: 'is_active',
    type: 'boolean',
    sortable: false,
  },
  {
    title: 'عکس موبایل',
    key: 'mobile_image',
    type: 'image',
    sortable: false,
  },
  {
    title: 'عکس دسکتاپ',
    key: 'desktop_image',
    type: 'image',
    sortable: false,
  },
  {
    type: 'operation',
    key: '',
    sortable: false,
    width: '170px',
    emitName: 'updateTable',
    title: '',
    operations: [
      {
        icon: 'material-symbols:edit-outline',
        tooltip: 'ویرایش',
        iconColor: 'warning',
        onClick: (row?: any) => {
          setValues(row.row.row)
          editRow.value = row.row.row
        },
      },
      {
        icon: 'material-symbols:delete-outline',
        tooltip: 'حذف',
        iconColor: 'danger',
        onClick: (row?: any) => {
          removeAdd(row.row.row)
        },
      },
    ],
  },
]
const tableFilters: FilterBuilderInterface[] = []

const { values, setFieldValue, setValues, resetForm } = useForm({
  validationSchema: yup.object().shape({
    desktop_image: yup.string(),
    mobile_image: yup.string(),
    link: yup.string(),
    alt: yup.string(),
    is_active: yup.boolean(),
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
      data.value = res.data.data.value
    })
    .finally(() => (loading.value = false))
}

const submit = () => {
  if (editRow.value) {
    data.value.map((el: AdsSetting) => {
      if (el.id === editRow.value?.id) {
        el.alt = values.alt
        el.link = values.link
        el.desktop_image = values.desktop_image
        el.mobile_image = values.mobile_image
        el.is_active = values.is_active
      }
    })
  } else {
    const lastId = data.value.length > 0
      ? Math.max(...data.value.map(item => item.id))
      : 0

    const item: AdsSetting = {
      alt: values.alt,
      link: values.link,
      desktop_image: values.desktop_image,
      mobile_image: values.mobile_image,
      is_active: values.is_active,
      id: lastId + 1,
    }

    data.value.push(item)
  }
  loading.value = true ض
  create(data.value)
    .then((res: any) => {
      loading.value = false
      resetForm()
      editRow.value = null
    })
    .catch(() => (loading.value = false))
}

const removeAdd = async (row: AdsSetting) => {
  const index = data.value.findIndex(el => el.id === row.id)
  if (index === -1) {
    return ElMessage.error('تبلیغ مورد نظر یافت نشد، لطفا صفحه ها رفرش و مجددا تست فرمایید')
  }
  loading.value = true
  try {
    await removeFile(row.mobile_image)
    await removeFile(row.desktop_image)
    data.value.splice(index, 1)
    await create(data.value)
    loading.value = false
    getAds()
  } catch (error) {
    console.log(error)
    loading.value = false
  }
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
