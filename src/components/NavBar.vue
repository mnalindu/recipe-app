<template>
  <nav class="sticky top-0 z-50 bg-amber-50 dark:bg-zinc-900 border-b-2 border-amber-900 dark:border-amber-700">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-2">
        
        <span class="text-3xl">🍽️</span>
        <span class="font-serif text-2xl font-bold text-amber-900 dark:text-amber-400 tracking-tight">
          Quick Bites
        </span>
      </RouterLink>

      <div class="flex items-center gap-4">
        <RouterLink to="/" class="font-medium text-amber-800 dark:text-amber-400 hover:text-amber-600 transition-colors">
          Home
        </RouterLink>
        <RouterLink to="/bookmarks" class="font-medium text-amber-800 dark:text-amber-400 hover:text-amber-600 transition-colors">
          🔖 Bookmarks
        </RouterLink>

        <!-- Dark Mode Toggle -->
        <button @click="store.toggleDarkMode()"
          class="w-10 h-10 rounded-full bg-amber-100 dark:bg-zinc-700 flex items-center justify-center text-lg hover:scale-110 transition">
          {{ store.isDarkMode ? '☀️' : '🌙' }}
        </button>

        <!-- Auth -->
        <button v-if="!store.isLoggedIn" @click="showLogin = true"
          class="bg-amber-900 dark:bg-amber-700 text-amber-50 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-amber-800 transition">
          Sign In
        </button>
        <div v-else class="flex items-center gap-2">
          <span class="text-sm text-amber-700 dark:text-amber-400 font-medium">👤 {{ store.currentUser }}</span>
          <button @click="store.logout()"
            class="text-sm text-red-500 hover:text-red-700 font-medium transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  </nav>

  <LoginModal v-if="showLogin" @close="showLogin = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRecipeStore } from '../stores/recipeStore'
import LoginModal from './LoginModal.vue'

const store = useRecipeStore()
const showLogin = ref(false)
</script>