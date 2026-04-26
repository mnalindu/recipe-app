<template>
  <div :class="{ 'dark': store.isDarkMode }" class="min-h-screen">
    <div class="min-h-screen bg-amber-50 dark:bg-zinc-950 transition-colors duration-300">
      <NavBar />
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRecipeStore } from './stores/recipeStore'
import NavBar from './components/NavBar.vue'
const store = useRecipeStore()
</script>