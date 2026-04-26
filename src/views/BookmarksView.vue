<template>
  <main class="min-h-screen bg-amber-50 dark:bg-zinc-950">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <h1 class="font-serif text-4xl font-bold text-amber-900 dark:text-amber-400 mb-2">
        Your Bookmarks
      </h1>
      <p class="text-amber-600 dark:text-amber-500 mb-8">{{ store.bookmarks.length }} saved recipes</p>

      <div v-if="store.bookmarks.length === 0" class="text-center py-20">
        <p class="text-6xl mb-4">🔖</p>
        <p class="text-amber-700 dark:text-amber-400 text-lg">No bookmarks yet!</p>
        <RouterLink to="/" class="mt-4 inline-block bg-amber-900 text-amber-50 px-6 py-3 rounded-xl font-semibold hover:bg-amber-800 transition">
          Browse Recipes
        </RouterLink>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <RecipeCard
          v-for="recipe in store.bookmarks"
          :key="recipe.id"
          :recipe="recipe"
          @select="selectedRecipe = recipe"
        />
      </div>
    </div>

    <RecipeModal v-if="selectedRecipe" :recipe="selectedRecipe" @close="selectedRecipe = null" />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRecipeStore } from '../stores/recipeStore'
import RecipeCard from '../components/RecipeCard.vue'
import RecipeModal from '../components/RecipeModal.vue'
import type { Recipe } from '../types/recipe'

const store = useRecipeStore()
const selectedRecipe = ref<Recipe | null>(null)
</script>