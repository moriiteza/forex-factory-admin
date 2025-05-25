<template>
  <h5 class="my-2">
    {{ tableName }}
    <Icon v-if="refreshButton" class="filter-item" icon="system-uicons:refresh" @click="getEmit" />
  </h5>
  <div class="row">
    <div class="col-md-12 px-4">
      <FilterBuilder
        v-if="tableFilters && tableFilters.length > 0"
        :items="tableFilters"
        @filter="filter"
        :defaults="props.defaultFilters"
      />
    </div>
  </div>
  <el-table
    :data="props.rows"
    stripe
    :table-layout="props.layout"
    @sort-change="sort"
    @selection-change="handleSelectionChange"
    class="w-100 mt-4"
  >
    <el-table-column v-if="props.selection" type="selection" width="5" :align="'center'" />
    <el-table-column
      v-for="column of props.columns"
      :prop="column.key"
      :label="column.title"
      :width="column.width"
      :sortable="column.sortable ? 'custom' : null"
      :align="'center'"
    >
      <!-- Handle type of text      -->
      <template #default="scope" v-if="column.type === 'text'">
        <el-tooltip :content="scope.row[column.key]">
          <div class="text-overlay" :style="{ 'max-width': column.width }">
            {{ scope.row[column.key] }}
          </div>
        </el-tooltip>
      </template>

      <!-- Handle type of text      -->
      <template #default="scope" v-if="column.type === 'price'">
        <el-tooltip :content="scope.row[column.key]">
          <div class="text-overlay" :style="{ 'max-width': column.width }">
            {{ new Intl.NumberFormat('fa-IR').format(scope.row[column.key]) }}
          </div>
        </el-tooltip>
      </template>

      <!-- Handle type of boolean      -->
      <template #default="scope" v-if="column.type === 'boolean'">
        <el-tooltip :content="scope.row[column.key]">
          <div class="text-overlay" :style="{ 'max-width': column.width }">
            {{ scope.row[column.key] === true ? 'بله' : 'خیر' }}
          </div>
        </el-tooltip>
      </template>

      <!-- Handle type of image      -->
      <template #default="scope" v-if="column.type === 'image'">
        <el-tooltip :content="scope.row[column.key]">
          <img :src="scope.row[column.key]" style="width: 50px; height: 50px; border-radius: 50%" />
        </el-tooltip>
      </template>

      <!-- Handle type of date      -->
      <template #default="scope" v-if="column.type === 'date'">
        <div v-html="simpleDate(scope.row[column.key])"></div>
      </template>

      <!-- Handle type of date with tag      -->
      <template #default="scope" v-if="column.type === 'tagDate'">
        <el-tag v-if="column.tagMode" :type="column.tagType" class="py-4 px-4">
          <div v-html="convertDate(scope.row[column.key])"></div>
        </el-tag>
      </template>

      <!-- Handle type of tag      -->
      <template #default="scope" v-if="column.type === 'tag'">
        <el-tag class="p-3" :type="column.tagType">{{ scope.row[column.key] }}</el-tag>
      </template>

      <!-- Handle type of operation      -->
      <template #default="scope" v-if="column.type === 'operation'">
        <el-tooltip v-for="op of column.operations" :content="op.tooltip" placement="bottom">
          <el-button
            plain
            circle
            :size="op.buttonSize"
            class="mx-1"
            :type="op.iconColor"
            v-if="op.show || !Object.keys(op).includes('show')"
            @click="op.onClick({ actionHandler: actionHandler, row: scope })"
          >
            <Icon :icon="op.icon" />
          </el-button>
        </el-tooltip>
      </template>

      <!-- Handle type of custom   -->
      <template #default="scope" v-if="column.type === 'custom'">
        <span v-html="formatColumn(column.html, column.key, scope)"></span>
      </template>
      <!-- Handle type of Introduction Icons   -->
      <template #default="scope" v-if="column.type === 'icon'">
        <el-tooltip :content="scope.row[column.tooltip]">
          <Icon :icon="scope.row[column.key]" width="25" />
        </el-tooltip>
      </template>

      <!-- Handle type of components   -->
      <template #default="scope" v-if="column.type === 'component'">
        <component
          :is="column.component"
          :[column.propName]="scope.row"
          @[column.emitName]="getEmit"
        ></component>
      </template>

      <!-- Handle type of formatter   -->
      <template #default="scope" v-if="column.type === 'formatter'">
        <div v-html="formatColumn(column.formatter, column.key, scope)"></div>
      </template>

      <!-- Handle type of button   -->
      <template #default="scope" v-if="column.type === 'button'">
        <el-button
          :type="column.buttonColor"
          class="w-100"
          @click="column.onClick({ actionHandler: actionHandler, row: scope })"
        >
          {{ column.title }}
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="d-flex align-items-center">
    <el-pagination
      layout="prev, pager, next"
      :total="props.totalItem"
      :page-size="50"
      :current-page="currentPage"
      :next-icon="ArrowLeft"
      :prev-icon="ArrowRight"
      @current-change="paginate"
    />
    <span class="ms-auto">تعداد کل: {{ props.totalItem }}</span>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import FilterBuilder from '../../components/DataTable/FilterBuilder.vue'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps([
  'rows',
  'columns',
  'layout',
  'selection',
  'totalItem',
  'tableFilters',
  'tableName',
  'refreshButton',
  'defaultFilters'
])
const emits = defineEmits(['action', 'filter', 'updateTable', 'selectedUser'])

let filters: any = { page: 1, limit: 50 }
const currentPage = ref(1)

const multipleSelection = ref([])

const convertDate = (date: Date): string => {
  if (date) {
    const currentDate = new Date(date)
    if (!isNaN(currentDate.getTime())) {
      const persianDate = new Intl.DateTimeFormat('fa', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      }).format(currentDate)
      const persianTime = new Intl.DateTimeFormat('fa', {
        hour: 'numeric',
        minute: 'numeric'
      }).format(currentDate)
      const persianCurrentYear = new Intl.DateTimeFormat('fa', {
        month: 'long',
        day: 'numeric'
      }).format(currentDate)
      if (currentDate.getFullYear() === new Date().getFullYear()) {
        return `${persianCurrentYear} <br/><br/> ${persianTime}`
      } else {
        return `${persianDate}<br/>${persianTime}`
      }
    } else {
      return 'ثبت نشده'
    }
  } else {
    return 'ثبت نشده'
  }
}

const simpleDate = (date: Date): string => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatColumn = (formatters: any, value: any, row: any) => {
  return formatters(row.row)
}

const sort = (column: any) => {
  let sortString = ''
  if (column.order === 'descending') sortString = `-${column.prop}`
  else if (column.order === 'ascending') sortString = `${column.prop}`
  if (column.order !== null) {
    filters['sort'] = sortString
  }
  if (Object.keys(filters).includes('sort') && column.order === null) {
    delete filters.sort
  }
}

const paginate = (paginate: any) => {
  currentPage.value = paginate
  filters['page'] = (paginate)
  filters['limit'] = 50
  emits('filter', filters)
}

const filter = (filter: any) => {
  filters = { ...filter }
  console.log(filters)
  Object.keys(filters).forEach((key: string) => {
    if (filters[key] && typeof filters[key] === 'object' && Object.keys(filters[key]).includes('en')) {
      filters[key] = filters[key].en
      // filters[key] = filter[key].en;
    }
  })
  filters.page = 1
  filters['limit'] = 50
  emits('filter', filters)
}

const getEmit = (value: any) => {
  emits('updateTable', value)
}

const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
  emits('selectedUser', multipleSelection.value)
}
</script>

<style scoped lang="scss">
.text-overlay {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.filter-item {
  color: rgb(128, 128, 128);
  transition: 0.3s all;
  cursor: pointer;
  margin-right: 10px;
}

.filter-item:hover {
  color: #1a73e8;
  transition: 0.3s all;
}

:deep(.el-table__body) {
  th {
    background-color: #f4f5fe;
  }
}
</style>
