<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-semibold text-primary">{{ $t('title') }}</h1>
  </div>

  <div class="flex gap-4 mb-4">
    <input
      v-model="store.search"
      class="border rounded px-3 py-2 flex-1"
      :placeholder="$t('search')"
    />
    <select v-model="store.pageSize" class="border rounded px-3 py-2 w-36">
      <option :value="10">10</option>
      <option :value="30">30</option>
      <option :value="50">50</option>
    </select>
  </div>

  <div v-if="store.loading" class="space-y-3 mb-4">
    <div class="w-full h-4 bg-gray-200 animate-pulse rounded" v-for="i in 5" :key="i" />
  </div>

  <table v-else class="w-full text-sm bg-white border shadow rounded-md">
    <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
      <tr>
        <th class="px-4 py-2 text-left">No</th>
        <th class="px-4 py-2 text-left">{{ $t('name') }}</th>
        <th class="px-4 py-2 text-left">{{ $t('action') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(berry, i) in store.paginatedBerries"
        :key="berry.name"
        class="border-t hover:bg-gray-50"
      >
        <td class="px-4 py-2">{{ i + 1 + (store.currentPage - 1) * store.pageSize }}</td>
        <td class="px-4 py-2 capitalize">{{ berry.name }}</td>
        <td class="px-4 py-2">
          <button @click="goToDetail(berry.name)" class="text-blue-500 hover:underline mr-2">
            {{ $t('detail') }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="mt-4 flex gap-2">
    <button
      v-for="n in store.totalPages"
      :key="n"
      class="px-3 py-1 border rounded text-sm"
      :class="store.currentPage === n ? 'bg-primary text-white' : 'text-gray-600 bg-white'"
      @click="store.setPage(n)"
    >
      {{ n }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useBerryStore } from '@/store/useBerryStore'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const store = useBerryStore()
const router = useRouter()

onMounted(() => store.fetchBerries())

const goToEdit = (id: string) => router.push(`/edit-product/${id}`)
const goToDetail = (id: string) => router.push(`/berries/${id}`)
</script>
