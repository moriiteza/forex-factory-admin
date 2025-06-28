<template>
  <div class="container-fluid my-5">
    <div class="row">
      <div class="col-md-12">
        <el-card>
          <div class="p-0 d-flex">
            <h3>رویداد ها</h3>
            <el-button class="ms-auto" type="success" round plain @click="formVisible = true">
              افزودن
            </el-button>
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
            :table-name="'لیست رویداد ها'"
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
  <EventForm :visible="formVisible" :edit-value="formData" @close="closeForm" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DataTable from '@/components/DataTable/DataTable.vue'
import type { TableColumnInterFace } from '@/interfaces/table'
import type { FilterBuilderInterface } from '@/interfaces/filter-builder'
import { fetch } from '@/modules/Calendar/api/event.ts'
import EventForm from '@/modules/Calendar/components/EventForm.vue'

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
    title: 'نام',
    key: 'event_name',
    type: 'text',
    sortable: false,
  },
  {
    title: 'نام فارسی',
    key: 'event_name_fa',
    type: 'text',
    sortable: false,
  },
  {
    title: 'نام منبع',
    key: 'source_name',
    type: 'text',
    sortable: false,
  },
  {
    title: 'نرخ بهره',
    key: 'is_rate',
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
const tableFilters: FilterBuilderInterface[] = [
  {
    name: 'event_name',
    type: 'textField',
    title: 'نام',
    icon: true,
  },
  {
    name: 'event_name_fa',
    type: 'textField',
    title: 'نام فارسی',
  },
  {
    name: 'is_rate',
    type: 'checkBox',
    title: 'نرخ بهره',
    label: 'نرخ بهره',
  },
]

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

const closeForm = () => {
  formVisible.value = false
  formData.value = null
  getItems(filters)
}

const updateTable = (event: boolean) => {
  getItems(filters)
}
</script>
