<template>
  <el-card class="mt-4" v-loading="loading">
    <template #header>
      <div class="d-flex w-100 justify-between">
        <span>{{ initialAsset.name }}</span>
        <span class="ms-auto">{{ formatters.toJalali(initialAsset.timestamp) }}</span>
      </div>
    </template>
    <div class="row">
      <div class="col-md-6 mt-3">
        <TextField
          name="price"
          label="قیمت"
          placeholder="..."
          required
        />
      </div>

      <div class="col-md-6 mt-3" v-if="initialAsset.second_price !== null">
        <TextField
          name="second_price"
          label="قیمت به تومان"
          placeholder="..."
          required
        />
      </div>

      <div class="col-md-6 mt-3">
        <TextField
          name="symbol"
          label="واحد"
          readonly
          disabled
          placeholder="..."
          required
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 mt-3">
        <el-button
          size="large"
          native-type="submit"
          :loading="loading"
          :disabled="loading"
          class="w-100"
          type="success"
          @click="onSubmit"
          plain
        >
          ثبت {{ initialAsset.name }}
        </el-button>
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import TextField from '@/components/Form/TextField.vue'
import { create } from '@/modules/Setting/api/rate-monitor.ts'
import { ElMessage } from 'element-plus'
import formatters from '@/libarary/formatters.ts'

const props = defineProps<{
  initialAsset: {
    name: string
    symbol: string
    price: string
    second_price: string | null
    timestamp: string
  }
}>()

const loading = ref(false)

const schema = computed(() =>
  yup.object({
    price: yup.string().required('قیمت الزامی است'),
    second_price: yup
      .string()
      .nullable()
      .when([], {
        is: () => props.initialAsset.second_price !== null,
        then: (s) => s.required('قیمت دوم الزامی است'),
        otherwise: (s) => s.notRequired(),
      }),
    symbol: yup.string().required('واحد الزامی است'),
  })
)

const { handleSubmit, setValues, values, setFieldValue } = useForm({
  initialValues: {
    price: props.initialAsset.price,
    second_price: props.initialAsset.second_price,
    symbol: props.initialAsset.symbol,
  },
  validationSchema: schema.value,
})

watch(
  () => props.initialAsset,
  (newVal) => {
    setValues({
      price: newVal.price,
      symbol: newVal.symbol,
    })
    if (newVal.second_price !== null) {
      setFieldValue('second_price', newVal.second_price)
    }
    console.log(newVal)
  },
  { immediate: true, deep: true }
)

const onSubmit = handleSubmit(async (values) => {
  loading.value = true
  try {
    await create({
      name: props.initialAsset.name,
      ...values,
    })
    await ElMessage.success('عملیات با موفقیت انجام شد')
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

