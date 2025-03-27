import { defineStore } from 'pinia'
import axios from 'axios'
import { API_PRODUCTS } from '@/contants/api'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
    error: '',
    search: '',
    page: 1,
    pageSize: 10,
  }),
  persist: true,
  getters: {
    filtered(state): any[] {
      return state.products.filter((p: any) =>
        p.title.toLowerCase().includes(state.search.toLowerCase()),
      )
    },
    totalPages(): number {
      return Math.ceil(this.filtered.length / this.pageSize)
    },
    paginated(): any[] {
      const start = (this.page - 1) * this.pageSize
      return this.filtered.slice(start, start + this.pageSize)
    },
  },
  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const res = await axios.get(`${API_PRODUCTS}/products`)
        this.products = res.data
      } catch (err) {
        this.error = 'Failed to fetch products'
      } finally {
        this.loading = false
      }
    },
    async deleteProduct(id: number) {
      await axios.delete(`${API_PRODUCTS}/products/${id}`)
      this.products = this.products.filter((p: any) => p.id !== id)
    },
    setSearch(query: string) {
      this.search = query
      this.page = 1
    },
    setPage(page: number) {
      this.page = page
    },
    setPageSize(size: number) {
      this.pageSize = size
    },
  },
})
