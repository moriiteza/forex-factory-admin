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


    <el-select
        :id="name"
        :remote="true"
        :multiple="multiple"
        :size='size'
        clearable
        :name="name"
        filterable
        :remote-method='remoteMethod'
        :placeholder="placeholder"
        :model-value="inputValue"
        @change="handleChange"
        @blur="handleBlur">
      <el-option
          v-for='(item, index) in items'
          :key='item.id'
          :label="`${item.title}`"
          :value='item.id'
          :id='`${index}-${name}`'
      />
    </el-select>
  </div>

  <div class='v-field__error' :class="errorMessage ? 'show' : 'hide'" v-if="errorMessage">
    <i class='ic-u_info-circle'></i> {{ errorMessage }}
  </div>
</template>

<script setup lang='ts'>
import {onMounted, ref, toRef} from 'vue'
import {useField} from 'vee-validate'
import axiosInstance from '@/composables/axios'


const props = defineProps({
  value: String,
  name: String,
  height: Number,
  placeholder: String,
  type: String,
  label: String,
  readonly: Boolean,
  showInfo: Boolean,
  infoTitle: String,
  infoBody: String,
  size: String,
  multiple: {
    type: Boolean,
    default: false
  },
  isRtl: {
    default: true,
    type: Boolean
  },
  required: Boolean
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

const items: any = ref(null)

onMounted(() => {
  getStoryCategories()
})

const getStoryCategories = (title?: string) => {
  const filters = {}
  if (title) filters['title'] = title
  axiosInstance.get('story/admin/category/', { params: filters }).then((result: any) => {
    items.value = result.data.data.results;
  })
}

const remoteMethod = (value: string) => {
  setTimeout(() => {
    getStoryCategories(value)
  }, 400)

}
</script>