import { createRouter, createWebHistory } from 'vue-router'
import BerryList from '@/pages/berries/index.vue'
import BerryDetailPage from '@/pages/berries/detail.vue'
import AddProduct from '@/pages/products/add.vue'
import EditProduct from '@/pages/products/edit.vue'
import ProductList from '@/pages/products/index.vue'

const routes = [
  { path: '/', redirect: '/berries' },
  { path: '/berries', component: BerryList },
  { path: '/berries/:id', component: BerryDetailPage },
  { path: '/products', component: ProductList },
  { path: '/products/add', component: AddProduct },
  { path: '/products/:id/edit', component: EditProduct },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
