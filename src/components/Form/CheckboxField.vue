<template>

  <el-checkbox
      border
      class='w-100 my-2'
      size='large'
      :label='label'
      :id='name'
      :name='name'
      :model-value='inputValue'
      :disabled='readonly'
      @change='handleChange'
      @blur='handleBlur'/>
  <div class='v-field__error' :class="errorMessage ? 'show' : 'hide'" v-if="errorMessage">
    <i class='ic-u_info-circle'></i> {{ errorMessage }}
  </div>
</template>

<script setup lang="ts">
import {toRef} from 'vue'
import {useField} from 'vee-validate'

const props = defineProps({
  value: String,
  name: String,
  placeholder: String,
  label: String,
  readonly: Boolean,
  errorMessage: String
})

const name = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta: {touched}
} = useField(name, undefined, {
  initialValue: props.value,
  type: 'checkbox',
  checkedValue: props.value
})
</script>
