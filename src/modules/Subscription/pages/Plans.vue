<template>
  <div class="container-fluid my-5">
    <div class="row">
      <div class="col-md-12">
        <el-card>
          <div class="p-0 d-flex">
            <h3>انواع بسته های اشتراک</h3>
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
            :table-name="'لیست بسته ها'"
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

  <PlanForm :visible="formVisible" :edit-value="formData" @close="closeForm" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import type { TableColumnInterFace } from '@/interfaces/table'
import type { FilterBuilderInterface } from '@/interfaces/filter-builder'
import { fetch, remove } from '@/modules/Subscription/api/plans.ts'
import DataTable from '@/components/DataTable/DataTable.vue'
import PlanForm from '@/modules/Subscription/components/PlanForm.vue'
import enums from '@/enums/enums.ts'

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
    title: 'عنوان',
    key: 'name',
    type: 'text',
    sortable: false,
  },
  {
    title: 'تعداد درخواست',
    key: 'available_requests',
    type: 'text',
    sortable: false,
  },
  {
    title: 'زمان اعتبار',
    key: 'available_time',
    type: 'text',
    sortable: false,
  },
  {
    title: 'قیمت',
    key: 'price',
    type: 'text',
    sortable: false,
  },
  {
    title: 'تاریخ ثبت',
    key: 'created_at',
    type: 'originalDate',
    sortable: false,
  },
  {
    title: 'نوع',
    key: 'type',
    type: 'formatter',
    formatter: (val: any) => {
      return enums.getById('planTypes', val.type)
    },
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
          ElMessageBox.confirm(
            'آیا از حذف این بسته اطمینان دارید؟',
            `حذف ${row.row.row.name}`,
            {
              confirmButtonText: 'بله حذف کن',
              cancelButtonText: 'منصرف شدم',
              type: 'error',
            },
          ).then(() => {
            remove(row.row.row.id).then(() => getItems())
          })
        },
      },
    ],
  },
]
const tableFilters: FilterBuilderInterface[] = [
  {
    name: 'name',
    type: 'textField',
    title: 'عنوان',
    icon: true,
  },
  {
    name: 'type',
    type: 'enumSelect',
    title: 'نوع',
    enum: 'planTypes',
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
