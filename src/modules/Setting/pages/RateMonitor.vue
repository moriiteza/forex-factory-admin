<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div
        v-for="(asset, index) in assetList"
        :key="asset.symbol"
        class="col-md-6 ol-12 mb-2"
      >
        <AssetFormCard :initial-asset="asset" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AssetFormCard from '@/modules/Setting/components/AssetFormCard.vue'
import { onMounted, ref } from 'vue'
import { get } from '@/modules/Setting/api/rate-monitor.ts'

interface Asset {
  name: string
  symbol: string
  price: string | null
  second_price: string | null
  timestamp: string | null
}

const assetList = ref<Asset[]>([
  { name: 'بیت کوین', symbol: 'bitcoin', price: '', second_price: '', timestamp: '' },
  { name: 'اتریوم', symbol: 'ethereum', price: '', second_price: '', timestamp: '' },
  { name: 'تتر', symbol: 'tether', price: '', second_price: '', timestamp: '' },
  { name: 'انس جهانی طلا', symbol: 'gold-ons', price: '', second_price: '', timestamp: '' },
  { name: 'طلای ۱۸ عیار', symbol: '18ayar', price: null, second_price: null, timestamp: '' },
  { name: 'دلار', symbol: 'us', price: '', second_price: null, timestamp: '' },
])

const getData = async () => {
  const { data } = await get()
  const responseList = data?.data || []

  assetList.value.forEach((asset) => {
    const match = responseList.find(
      (item: any) =>
        item.symbol === asset.symbol ||
        (asset.symbol === 'usd' && item.symbol === 'us')
    )

    if (match) {
      asset.price = match.price ?? ''
      asset.second_price = match.second_price ?? null
      asset.timestamp = match.timestamp
    }
  })
}
onMounted(() => getData())
</script>
