<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 max-w-xl">
    <input v-model="form.title" class="input" placeholder="Title" />
    <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>

    <input v-model.number="form.price" type="number" class="input" placeholder="Price" />
    <p v-if="errors.price" class="text-red-500 text-sm">{{ errors.price }}</p>

    <textarea v-model="form.description" class="input" placeholder="Description"></textarea>
    <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</p>

    <input v-model="form.image" class="input" placeholder="Image URL" />
    <p v-if="errors.image" class="text-red-500 text-sm">{{ errors.image }}</p>

    <input v-model="form.category" class="input" placeholder="Category" />
    <p v-if="errors.category" class="text-red-500 text-sm">{{ errors.category }}</p>

    <button class="btn-primary" type="submit">
      {{ editId ? 'Update' : 'Submit' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import { API_PRODUCTS } from '@/contants/api'

const { t } = useI18n()
const props = defineProps<{ editId?: string | null }>()
const form = ref({
  title: '',
  price: 0,
  description: '',
  image: '',
  category: '',
})
const errors = ref<Record<string, string>>({})

onMounted(async () => {
  if (props.editId) {
    const res = await axios.get(`${API_PRODUCTS}/${props.editId}`)
    form.value = res.data
  }
})

function validateForm() {
  errors.value = {}
  if (!form.value.title) errors.value.title = 'Title is required'
  if (!form.value.price || form.value.price <= 0) errors.value.price = 'Valid price is required'
  if (!form.value.description) errors.value.description = 'Description is required'
  if (!form.value.image) errors.value.image = 'Image URL is required'
  if (!form.value.category) errors.value.category = 'Category is required'

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validateForm()) return

  try {
    if (props.editId) {
      await axios.put(`${API_PRODUCTS}/${props.editId}`, form.value)
      toast.success(t('productUpdated'))
    } else {
      await axios.post('${API_PRODUCTS}', form.value)
      toast.success(t('productAdded'))
      form.value = { title: '', price: 0, description: '', image: '', category: '' }
    }
  } catch (e) {
    toast.error(t('submitFailed'))
  }
}
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded px-3 py-2 w-full;
}
.btn-primary {
  @apply bg-primary text-white px-4 py-2 rounded hover:bg-indigo-700 transition text-sm;
}
</style>
