<template>
  <div class="v-field__input" :class="errorMessage ? 'invalid' : ''">
    <div style="display: flex">
      <label :for="name" class="v-field__label">
        {{ label }}
        <span v-if="required" class="text-danger">*</span>
      </label>
      <el-popover
        v-if="showInfo"
        placement="bottom"
        :title="infoTitle"
        :width="200"
        trigger="click"
        :content="infoBody"
      >
        <template #reference>
          <i
            class="ic-u_info-circle menu-open-icon"
            style="cursor: pointer; margin-right: 5px; color: #0cc7a1; margin-top: 2px"
          ></i>
        </template>
      </el-popover>
    </div>

    <el-select
      :id="name"
      :name="name"
      :size="size"
      :placeholder="placeholder"
      :model-value="inputValue"
      @change="handleChange"
      @blur="handleBlur"
      :disabled="disable"
      clearable
      style="text-align: right"
    >
      <el-option v-for="(item, index) in items" :key="index" :label="item" :value="item" />
    </el-select>
  </div>

  <div class="v-field__error" :class="errorMessage ? 'show' : 'hide'" v-if="errorMessage">
    <i class="ic-u_info-circle"></i> {{ errorMessage }}
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  value: String,
  name: String,
  label: String,
  placeholder: String,
  size: String,
  required: Boolean,
  showInfo: Boolean,
  infoTitle: String,
  infoBody: String,
  disable: Boolean,
})

const items = [
  'داده ماه جولای',
  'روز هفتم',
  'داده ماه ژوئن',
  'داده ماه‌ می',
  'روز ششم',
  'روز پنجم',
  'روز چهارم',
  'روز سوم',
  '3 نوامبر',
  'روز دوم',
  'روز اول',
  '۲۹ام تا ۲ام',
  'روز هفتم',
  'نامشخص',
  'کل‌روز',
]

const name: any = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.value || '',
})
</script>
