<template>
  <div class="container-fluid my-5">
    <div class="row">
      <div class="col-md-12">
        <el-card>
          <div class="p-0 d-flex">
            <h3>جلسات معاملاتی</h3>
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
            :table-name="'لیست داده های جلسات معاملاتی'"
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

  <SessionForm :visible="formVisible" :edit-value="formData" @close="closeForm" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DataTable from '@/components/DataTable/DataTable.vue'
import type { TableColumnInterFace } from '@/interfaces/table'
import type { FilterBuilderInterface } from '@/interfaces/filter-builder'
import { fetch } from '@/modules/Sessions/api/sessions.ts'
import SessionForm from '@/modules/Sessions/components/SessionForm.vue'

const formVisible = ref(false)
const formData = ref<{} | null>(null)

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
    title: 'کد کشور',
    key: 'country',
    type: 'text',
    sortable: false,
  },
  {
    title: 'نام کشور',
    key: 'country_name',
    type: 'text',
    sortable: false,
  },
  {
    title: 'اختلاف زمانی',
    key: 'timezone',
    type: 'text',
    sortable: false,
  },
  {
    title: 'ساعت شروع',
    key: 'start_time',
    type: 'text',
    sortable: false,
  },
  {
    title: 'ساعت پایان',
    key: 'end_time',
    type: 'text',
    sortable: false,
  },
  {
    title: 'وضعیت',
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
        icon: 'material-symbols:delete-outline',
        tooltip: 'حذف',
        iconColor: 'danger',
        onClick: (row?: any) => {
          // router.push({ path: `/posts/requests`, query: { postId: row.row.row.id } })
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
  getItems(filters);
}

onMounted(() => getItems())
</script>
