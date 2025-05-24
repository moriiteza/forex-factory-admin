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
    <el-input
        :id='name'
        :name='name'
        :type='type'
        :size='size'
        :input-style="{ direction: isRtl ? 'rtl' : 'ltr' }"
        :model-value='inputValue'
        :placeholder='placeholder'
        :disabled='readonly'
        :rows='height'
        @input='handleChange'
        @blur='handleBlur'
        clearable
        :suffix-icon="icon ? Search : ''"
    />
  </div>

  <div class='v-field__error' :class="errorMessage ? 'show' : 'hide'" v-if="errorMessage">
    <i class='ic-u_info-circle'></i> {{ errorMessage }}
  </div>
</template>

<script setup lang='ts'>
import {toRef} from 'vue'
import {useField} from 'vee-validate'
import {Search} from '@element-plus/icons-vue'

const props = defineProps({
  value: String,
  name: String,
  height: Number,
  placeholder: String,
  type: String,
  label: String,
  size: String,
  icon: {default: false, type: Boolean},
  required: {
    default: false,
    type: Boolean
  },
  readonly: Boolean,
  showInfo: Boolean,
  infoTitle: String,
  infoBody: String,
  isRtl: {
    default: true,
    type: Boolean
  },
})

const name: any = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta: {touched}
} = useField(name, undefined, {
  initialValue: props.value
})
</script>