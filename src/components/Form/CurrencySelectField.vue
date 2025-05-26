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
            style="cursor: pointer; margin-right: 5px; color: #0cc7a1; margin-top: 2px;"
          ></i>
        </template>
      </el-popover>
    </div>

    <el-select
      :id="name"
      :filterable="filterable"
      :remote="remoteFilterable"
      :name="name"
      :size="size"
      :placeholder="placeholder"
      :model-value="inputValue"
      @change="onSelect"
      @blur="handleBlur"
      :disabled="disable"
      clearable
      style="text-align: right"
    >
      <el-option
        v-for="(item, index) in items"
        :key="item.symbol"
        :label="`${item.name} (${item.symbol})`"
        :value="item.symbol"
        :id="`${index}-${name}`"
      />
    </el-select>
  </div>

  <div class="v-field__error" :class="errorMessage ? 'show' : 'hide'" v-if="errorMessage">
    <i class="ic-u_info-circle"></i> {{ errorMessage }}
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useField, useForm } from 'vee-validate'

const props = defineProps({
  name: String,
  label: String,
  required: Boolean,
  showInfo: Boolean,
  infoTitle: String,
  infoBody: String,
  size: String,
  placeholder: String,
  filterable: {
    default: true,
    type: Boolean
  },
  remoteFilterable: {
    default: false,
    type: Boolean
  },
  disable: Boolean
})

const items = [
  { name: 'فلزات پایه', symbol: 'BML', market: 'metal' },
  { name: 'فلزات گران بها', symbol: 'XAU', market: 'metal' },
  { name: 'حاملان انرژی', symbol: 'OIL', market: 'energy' },
  { name: 'رمز ارزها', symbol: 'BTC', market: 'crypto' },
  { name: 'ریال ایران', symbol: 'IRR', market: 'forex' },
  { name: 'همه نمادها', symbol: 'All', market: 'forex' },
  { name: 'یوآن چین', symbol: 'CNY', market: 'forex' },
  { name: 'فرانک سوئیس', symbol: 'CHF', market: 'forex' },
  { name: 'پوند انگلیس', symbol: 'GBP', market: 'forex' },
  { name: 'دلار نیوزلند', symbol: 'NZD', market: 'forex' },
  { name: 'دلار استرالیا', symbol: 'AUD', market: 'forex' },
  { name: 'ین ژاپن', symbol: 'JPY', market: 'forex' },
  { name: 'دلار آمریکا', symbol: 'USD', market: 'forex' },
]

const name = toRef(props, 'name')
const {
  value: inputValue,
  errorMessage,
  handleBlur
} = useField(name, undefined, { initialValue: '' })

const { setFieldValue } = useForm()

const onSelect = (selectedSymbol: string) => {
  const selected = props.items.find((item: any) => item.symbol === selectedSymbol)
  if (selected) {
    setFieldValue('currency_name', selected.name)
    setFieldValue('currency_symbol', selected.symbol)
    setFieldValue('currency_market', selected.market)
  }
}
</script>
