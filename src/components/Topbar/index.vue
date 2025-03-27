<!-- src/components/Topbar.vue -->
<template>
  <header class="flex justify-between items-center h-16 bg-white px-4 border-b shadow-sm">
    <!-- Hamburger button to toggle sidebar -->
    <button
      @click="$emit('toggleSidebar')"
      class="text-xl text-gray-600 hover:text-primary transition"
    >
      ☰
    </button>

    <div class="flex items-center gap-4">
      <!-- Language Selector -->
      <select
        v-model="lang"
        @change="changeLang"
        class="border rounded text-sm px-2 py-1 bg-gray-50"
      >
        <option value="id">🇮🇩 ID</option>
        <option value="en">🇬🇧 EN</option>
      </select>

      <!-- User Info -->
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center font-bold"
        >
          U
        </div>
        <span class="text-sm">Username</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
const lang = ref(locale.value)
const changeLang = () => (locale.value = lang.value)
</script>
