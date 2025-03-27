import { defineStore } from 'pinia'
import axios from 'axios'
import { API_BERRIES } from '@/contants/api'

export const useBerryStore = defineStore('berries', {
  state: () => ({
    berries: [],
    search: '',
    currentPage: 1,
    pageSize: 10,
    loading: false,
  }),
  persist: true,
  getters: {
    filteredBerries: (state) => {
      return state.berries
        .filter((b: any) => b.name.includes(state.search.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name))
    },
    paginatedBerries: (state) => {
      const start = (state.currentPage - 1) * state.pageSize
      return state.filteredBerries.slice(start, start + state.pageSize)
    },
    totalPages: (state) => {
      return Math.ceil(state.filteredBerries.length / state.pageSize)
    },
  },
  actions: {
    async fetchBerries() {
      this.loading = true
      const res = await axios.get(`${API_BERRIES}?limit=100`)
      this.berries = res.data.results
      this.loading = false
    },
    setSearch(term: string) {
      this.search = term
      this.currentPage = 1
    },
    setPage(page: number) {
      this.currentPage = page
    },
    setPageSize(size: number) {
      this.pageSize = size
      this.currentPage = 1
    },
  },
})
