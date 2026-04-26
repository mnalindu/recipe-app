<template>
  <main class="min-h-screen bg-amber-50 dark:bg-zinc-950 py-12 px-4">
    <div v-if="store.isLoading" class="text-center py-20">
      <div class="text-6xl animate-bounce">🍳</div>
    </div>

    <div v-else-if="recipe" class="max-w-3xl mx-auto">
      <RouterLink to="/" class="text-amber-700 dark:text-amber-400 hover:underline mb-6 inline-block">
        ← Back to Recipes
      </RouterLink>

      <div class="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl">
        <div class="relative h-72">
          <img :src="recipe.image" :alt="recipe.name" class="w-full h-full object-cover" />
          <div class="absolute top-4 left-4 bg-amber-900/80 text-amber-50 rounded-full px-3 py-1 text-sm">
            {{ recipe.cuisine }}
          </div>
          <button @click="store.toggleBookmark(recipe)"
            class="absolute top-4 right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg text-xl hover:scale-110 transition">
            {{ store.isBookmarked(recipe.id) ? '🔖' : '🤍' }}
          </button>
        </div>

        <div class="p-8">
          <h1 class="font-serif text-4xl font-bold text-amber-900 dark:text-amber-400 mb-4">{{ recipe.name }}</h1>

          <div class="grid grid-cols-4 gap-3 mb-6">
            <div class="bg-amber-50 dark:bg-zinc-800 rounded-xl p-3 text-center">
              <p class="text-2xl">⏱</p>
              <p class="text-xs text-amber-600 dark:text-amber-400 mt-1">{{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }} min</p>
            </div>
            <div class="bg-amber-50 dark:bg-zinc-800 rounded-xl p-3 text-center">
              <p class="text-2xl">👤</p>
              <p class="text-xs text-amber-600 dark:text-amber-400 mt-1">{{ recipe.servings }} servings</p>
            </div>
            <div class="bg-amber-50 dark:bg-zinc-800 rounded-xl p-3 text-center">
              <p class="text-2xl">🔥</p>
              <p class="text-xs text-amber-600 dark:text-amber-400 mt-1">{{ recipe.caloriesPerServing }} kcal</p>
            </div>
            <div class="bg-amber-50 dark:bg-zinc-800 rounded-xl p-3 text-center">
              <p class="text-2xl">⭐</p>
              <p class="text-xs text-amber-600 dark:text-amber-400 mt-1">{{ recipe.rating }}</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-2 mb-6">
            <span v-for="tag in recipe.tags" :key="tag"
              class="bg-amber-100 dark:bg-zinc-700 text-amber-800 dark:text-amber-300 text-xs px-3 py-1 rounded-full">
              {{ tag }}
            </span>
          </div>

          <h2 class="font-serif text-2xl font-bold text-amber-900 dark:text-amber-400 mb-3">Ingredients</h2>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-1">
            <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
          </ul>

          <h2 class="font-serif text-2xl font-bold text-amber-900 dark:text-amber-400 mb-3">Instructions</h2>
          <ol class="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-3">
            <li v-for="(step, i) in recipe.instructions" :key="i" class="leading-relaxed">{{ step }}</li>
          </ol>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '../stores/recipeStore'

const route = useRoute()
const store = useRecipeStore()

const recipe = computed(() =>
  store.recipes.find(r => r.id === Number(route.params.id))
)

onMounted(() => {
  if (store.recipes.length === 0) store.fetchRecipes()
})
</script>