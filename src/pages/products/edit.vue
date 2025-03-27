<template>
  <h2 class="text-xl font-semibold text-primary mb-4">Edit Product</h2>
  <ProductForm :editId="route.params.id" />
</template>

<script setup lang="ts">
import ProductForm from '@/components/ProductForm/index.vue'
import { API_PRODUCTS } from '@/contants/api'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.params.id)

const edit = (id: number) => router.push(`/products/${id}/edit`)
const remove = async (id: number) => {
  if (confirm('Are you sure?')) {
    await axios.delete(`${API_PRODUCTS}/${id}`)
    await fetchProducts()
  }
}
</script>
