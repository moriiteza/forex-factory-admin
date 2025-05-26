<template>
  <div class='v-field__input' :class="errorMessage ? 'invalid' : ''">
    <div style='display: flex'>
      <label :for='name' class='v-field__label'>
        {{ label }}
        <span v-if='required' class='text-danger'>*</span>
      </label>
      <el-popover
        v-if='showInfo'
        placement='bottom'
        :title='infoTitle'
        :width='200'
        trigger='click'
        :content='infoBody'
      >
        <template #reference>
          <i
            class='ic-u_info-circle menu-open-icon'
            style='
              cursor: pointer;
              margin-right: 5px;
              color: #0cc7a1;
              margin-top: 2px;
            '
          ></i>
        </template>
      </el-popover>
    </div>


    <el-time-select
      :id='name'
      :remote='remoteFilterable'
      :filterable='filterable'
      :name='name'
      :size='size'
      :placeholder='placeholder'
      :model-value='inputValue'
      @change='handleChange'
      @blur='handleBlur'
      :disabled='disable'
      style="text-align: right"
      start="00:00"
      step="00:01"
      end="23:59"
      clearable />
  </div>

  <div class='v-field__error' :class="errorMessage ? 'show' : 'hide'" v-if='errorMessage'>
    <i class='ic-u_info-circle'></i> {{ errorMessage }}
  </div>
</template>

<script setup lang='ts'>
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  value: String,
  name: String,
  placeholder: String,
  type: String,
  label: String,
  readonly: Boolean,
  showInfo: Boolean,
  size: String,
  infoTitle: String,
  infoBody: String,
  isRtl: {
    default: true,
    type: Boolean
  },
  items: null,
  disable: Boolean,
  keyName: String,
  valueName: String,
  required: Boolean,
  filterable: {
    default: true,
    type: Boolean
  },
  remoteFilterable: {
    default: false,
    type: Boolean
  }
})

const name: any = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta: { touched }
} = useField(name, undefined, {
  initialValue: props.value
})
</script>

<style>
.el-select__placeholder.is-transparent {
  user-select: none;
  color: var(--el-text-color-placeholder);
  text-align: right;
}

.el-select__placeholder {
  direction: rtl;
  position: absolute;
  display: block;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--el-input-text-color, var(--el-text-color-regular));
  text-align: right;
}
</style>