<template>
  <div class="container-fluid my-5">
    <div class="row">
      <div class="col-md-12">
        <el-card>
          <div class="p-0 d-flex">
            <h3>تقویم</h3>
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
            :table-name="'لیست داده های تقویم'"
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

  <CalendarForm :visible="formVisible" :edit-value="formData" @close="closeForm" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DataTable from '@/components/DataTable/DataTable.vue'
import type { TableColumnInterFace } from '@/interfaces/table'
import type { FilterBuilderInterface } from '@/interfaces/filter-builder'
import { fetch } from '@/modules/Calendar/api/calendar.ts'
import enums from '@/enums/enums.ts'
import CalendarForm from '@/modules/Calendar/components/CalendarForm.vue'

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
    key: 'event.event_name',
    type: 'text',
    sortable: false,
  },
  {
    title: 'نام فارسی',
    key: 'event.event_name_fa',
    type: 'text',
    sortable: false,
  },
  {
    title: 'تاریخ',
    key: 'date',
    type: 'text',
    sortable: false,
  },
  {
    title: 'زمان',
    key: 'time',
    type: 'text',
    sortable: false,
  },
  {
    title: 'پیش بینی',
    key: 'forecast',
    type: 'text',
    sortable: false,
  },
  {
    title: 'مقدار قبلی',
    key: 'previous',
    type: 'text',
    sortable: false,
  },
  {
    title: 'مقدار فعلی',
    key: 'actual',
    type: 'text',
    sortable: false,
  },
  {
    title: 'تقویم',
    key: 'source_type',
    type: 'formatter',
    sortable: false,
    formatter: (val: any) => {
      return enums.getById('calendarType', val.source_type)
    },
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
    name: 'id',
    type: 'textField',
    title: 'شناسه',
    icon: true,
  },
  {
    name: 'actual',
    type: 'textField',
    title: 'فعلی',
    icon: true,
  },
  {
    name: 'forecast',
    type: 'textField',
    title: 'پیش بینی',
  },
  {
    name: 'previous',
    type: 'textField',
    title: 'مقدار قبلی',
    icon: true,
  },
  {
    name: 'date',
    type: 'date',
    title: 'تاریخ',
    icon: true,
  },
  {
    name: 'source_type',
    type: 'enumSelect',
    title: 'تقویم',
    enum: 'calendarType',
    icon: true,
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

const updateTable = (event: boolean) => {
  getItems(filters)
}

const closeForm = () => {
  formVisible.value = false;
  formData.value = null
  getItems(filters);
}
</script>
