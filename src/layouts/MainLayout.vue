<template>
  <div class="flex h-screen bg-gray-50 font-sans text-gray-900">
    <Sidebar :collapsed="collapsed" />
    <div class="flex flex-col flex-1">
      <Topbar @toggleSidebar="collapsed = !collapsed" />
      <main class="p-6 flex-1 overflow-y-auto">
        <slot />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar/index.vue'
import Topbar from '@/components/Topbar/index.vue'
import Footer from '@/components/Footer/index.vue'
import { ref } from 'vue'

const collapsed = ref(false)
</script>
