import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createI18n } from 'vue-i18n'
import messages from './locales'
import Toast from 'vue3-toastify'
import './assets/tailwind.css'
import 'vue3-toastify/dist/index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const i18n = createI18n({
  legacy: false,
  locale: 'id', // default
  messages,
})

createApp(App).use(pinia).use(router).use(i18n).use(Toast).mount('#app')
