<template>
  <h2 class="text-2xl font-semibold text-primary mb-4">{{ t('detailTitle') }}</h2>

  <!-- Berry Picker -->
  <div class="flex items-center gap-2 mb-6">
    <select v-model="selected" class="border px-4 py-2 rounded text-sm w-64">
      <option v-for="b in store.berries" :key="b.name" :value="b.name">
        {{ b.name }}
      </option>
    </select>
    <button @click="fetchDetail" class="btn-primary">
      {{ t('fetch') }}
    </button>
  </div>

  <!-- Loading skeleton -->
  <div v-if="loading" class="space-y-3">
    <div class="w-1/2 h-5 bg-gray-200 rounded animate-pulse"></div>
    <div class="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
    <div class="w-full h-24 bg-gray-200 rounded animate-pulse"></div>
  </div>

  <!-- Detail Card -->
  <div v-else-if="detail" class="bg-white border rounded shadow p-6 space-y-4 max-w-xl">
    <h3 class="text-xl font-bold text-primary capitalize">{{ detail.name }}</h3>
    <div class="grid grid-cols-2 gap-4 text-sm">
      <div>
        <span class="text-gray-500">{{ t('growthTime') }}:</span>
        <div class="text-gray-900 font-medium">{{ detail.growth_time }}</div>
      </div>
      <div>
        <span class="text-gray-500">{{ t('size') }}:</span>
        <div class="text-gray-900 font-medium">{{ detail.size }}</div>
      </div>
      <div>
        <span class="text-gray-500">{{ t('smoothness') }}:</span>
        <div class="text-gray-900 font-medium">{{ detail.smoothness }}</div>
      </div>
      <div>
        <span class="text-gray-500">{{ t('soilDryness') }}:</span>
        <div class="text-gray-900 font-medium">{{ detail.soil_dryness }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBerryStore } from '@/store/useBerryStore'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
import { API_BERRIES } from '@/contants/api'

const store = useBerryStore()
const { t } = useI18n()

const selected = ref('')
const detail = ref<any>(null)
const loading = ref(false)

onMounted(async () => {
  await store.fetchBerries()
  selected.value = store.berries[0]?.name || ''
  fetchDetail()
})

async function fetchDetail() {
  loading.value = true
  try {
    const res = await axios.get(`${API_BERRIES/${selected.value}`)
    detail.value = res.data
  } catch (error) {
    detail.value = null
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.btn-primary {
  @apply bg-primary text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm;
}
</style>
