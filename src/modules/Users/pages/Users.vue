<template>
  <div class="container-fluid my-5">
    <div class="row">
      <div class="col-md-12">
        <el-card>
          <div class="p-0 d-flex">
            <h3>کاربران</h3>
            <el-button class="ms-auto" type="success" round plain @click="formVisible = true"> افزودن</el-button>
          </div>
        </el-card>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <el-card class="mt-4" v-loading="loading">
          <DataTable
            :columns="tableColumns"
            :rows="items"
            :selection="false"
            :table-name="'لیست کاربران'"
            :layout="'auto'"
            :total-item="totalItems"
            :refresh-button="true"
            @filter="filter"
            :table-filters="tableFilters"
            @update-table="updateTable"
          />
        </el-card>
      </div>
    </div>
  </div>

  <UserForm :visible="formVisible" :edit-value="formData" @close="closeForm" v-if="formVisible"/>
  <UserPasswordForm :visible="passwordFormVisible" :edit-value="passwordFormData" @close="closeForm" v-if="passwordFormVisible"/>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DataTable from '@/components/DataTable/DataTable.vue'
import type { TableColumnInterFace } from '@/interfaces/table'
import type { FilterBuilderInterface } from '@/interfaces/filter-builder'
import { fetch } from '@/modules/Users/api/user.ts'
import UserForm from '@/modules/Users/components/UserForm.vue'
import UserPasswordForm from '@/modules/Users/components/UserPasswordForm.vue'

const formVisible = ref(false)
const formData = ref<{} | null>(null)

const passwordFormVisible = ref(false)
const passwordFormData = ref<{} | null>(null)

const items: any = ref(null)
const totalItems = ref(null)
const loading = ref(false)

let filters: any

const tableColumns: TableColumnInterFace[] = [
  {
    title: 'شناسه',
    key: 'id',
    type: 'text',
    sortable: false,
  },
  {
    title: 'نام',
    key: 'first_name',
    type: 'text',
    sortable: false,
  },
  {
    title: 'نام خانوادگی',
    key: 'last_name',
    type: 'text',
    sortable: false,
  },
  {
    title: 'ایمیل',
    key: 'email',
    type: 'text',
    sortable: false,
  },
  {
    title: 'موبایل',
    key: 'phone',
    type: 'text',
    sortable: false,
  },
  {
    title: 'انتخاب بروکر',
    key: 'broker_choices',
    type: 'text',
    sortable: false,
  },
  {
    title: 'نام کاربری',
    key: 'username',
    type: 'text',
    sortable: false,
  },
  {
    title: 'ثبت نام',
    key: 'date_joined',
    type: 'originalDate',
    sortable: false,
  },
  {
    title: 'فعال',
    key: 'is_active',
    type: 'boolean',
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
          formVisible.value = true
          formData.value = row.row.row
        },
      },
      {
        icon: 'material-symbols:sync-lock',
        tooltip: 'ویرایش رمز عبور',
        iconColor: 'success',
        onClick: (row?: any) => {
          passwordFormVisible.value = true
          passwordFormData.value = row.row.row
        },
      },
    ],
  },
]
const tableFilters: FilterBuilderInterface[] = []

const getItems = (filter?: any) => {
  loading.value = true
  fetch(filter).then((res: any) => {
    items.value = res.data.data.results
    totalItems.value = res.data.data.count
    loading.value = false
  })
}

const filter = (filter: any) => {
  filters = { ...filter }
  getItems(filter)
}

const updateTable = (event: boolean) => {
  getItems(filters)
}

const closeForm = () => {
  formVisible.value = false;
  formData.value = null
  passwordFormData.value = null
  passwordFormVisible.value = false
  getItems(filters);
}

onMounted(() => getItems())
</script>
