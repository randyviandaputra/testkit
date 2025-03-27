<template>
  <aside
    :class="[
      'h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300',
      collapsed ? 'w-16' : 'w-64',
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center justify-center h-16 border-b">
      <span v-if="!collapsed" class="text-xl font-bold text-primary">🍇 TestKit</span>
      <span v-else class="text-xl">🍇</span>
    </div>

    <!-- Navigation -->
    <nav class="mt-4 px-2">
      <RouterLink
        v-for="item in menu"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-2 px-3 py-2 rounded transition text-sm"
        :class="[
          route.path.startsWith(item.path)
            ? 'bg-primary/10 text-primary font-semibold'
            : 'text-gray-600 hover:bg-gray-100',
        ]"
      >
        <span v-if="collapsed" class="text-lg">{{ item.icon }}</span>
        <span v-else>{{ item.icon }} {{ item.name }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
defineProps<{ collapsed: boolean }>()
defineEmits(['toggle'])

const route = useRoute()

const menu = [
  { path: '/berries', name: 'Berries', icon: '🍓' },
  { path: '/products', name: 'Products', icon: '🛍️' },
]
</script>
