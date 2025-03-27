<template>
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-semibold text-primary">Product List</h1>
    <button @click="$router.push('/products/add')" class="btn-primary">+ Add Product</button>
  </div>

  <input
    v-model="search"
    class="border rounded px-3 py-2 w-full mb-4"
    placeholder="Search by title..."
  />

  <div v-if="loading" class="space-y-3 mb-4">
    <div class="h-4 bg-gray-200 rounded animate-pulse" v-for="i in 5" :key="i" />
  </div>

  <table class="w-full text-sm bg-white border rounded shadow">
    <thead class="bg-gray-100 text-gray-600 text-xs uppercase">
      <tr>
        <th class="p-3 text-left">No</th>
        <th class="p-3 text-left">Title</th>
        <th class="p-3 text-left">Price</th>
        <th class="p-3 text-left">Category</th>
        <th class="p-3 text-left">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in paginated" :key="item.id" class="border-t hover:bg-gray-50">
        <td class="p-3">{{ i + 1 + (page - 1) * pageSize }}</td>
        <td class="p-3">{{ item.title }}</td>
        <td class="p-3">${{ item.price }}</td>
        <td class="p-3">{{ item.category }}</td>
        <td class="p-3 space-x-2">
          <button @click="edit(item.id)" class="text-blue-500 hover:underline">Edit</button>
          <button @click="remove(item.id)" class="text-red-500 hover:underline">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="mt-4 flex gap-2">
    <button
      v-for="n in totalPages"
      :key="n"
      class="px-3 py-1 border rounded text-sm"
      :class="page === n ? 'bg-primary text-white' : 'bg-white text-gray-700'"
      @click="page = n"
    >
      {{ n }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { API_PRODUCTS } from '@/contants/api'

const router = useRouter()
const products = ref<any[]>([])
const loading = ref(true)
const search = ref('')
const page = ref(1)
const pageSize = ref(10)

const filtered = computed(() =>
  products.value.filter((p) => p.title.toLowerCase().includes(search.value.toLowerCase())),
)

const totalPages = computed(() => Math.ceil(filtered.value.length / pageSize.value))

const paginated = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filtered.value.slice(start, start + pageSize.value)
})

const fetchProducts = async () => {
  loading.value = true
  const res = await axios.get(`${API_PRODUCTS}`)
  products.value = res.data
  loading.value = false
}

const edit = (id: number) => router.push(`products/${id}/edit`)
const remove = async (id: number) => {
  if (confirm('Are you sure?')) {
    await axios.delete(`${API_PRODUCTS}/${id}`)
    await fetchProducts()
  }
}

onMounted(() => fetchProducts())
</script>

<style scoped>
.btn-primary {
  @apply bg-primary text-white px-4 py-2 rounded hover:bg-indigo-700 transition;
}
</style>
