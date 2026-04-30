<template>
  <div
    class="group cursor-pointer bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-zinc-700"
  >
    <!-- Image -->
    <div @click="$emit('select', recipe)" class="relative overflow-hidden h-52">
      <img
        :src="recipe.image"
        :alt="recipe.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <!-- Difficulty Badge -->
      <div :class="{
        'bg-green-400 text-white': recipe.difficulty === 'Easy',
        'bg-yellow-400 text-white': recipe.difficulty === 'Medium',
        'bg-red-400 text-white': recipe.difficulty === 'Hard'
      }" class="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide">
        {{ recipe.difficulty }}
      </div>
      <!-- Rating Badge -->
      <div class="absolute top-3 right-3 bg-zinc-900 rounded-full px-3 py-1 text-xs font-bold text-white flex items-center gap-1 shadow">
        ⭐ {{ recipe.rating }}
      </div>
    </div>

    <!-- Content -->
    <div @click="$emit('select', recipe)" class="p-4">
      <h3 class="font-bold text-white text-lg mb-3 line-clamp-2 leading-snug">
        {{ recipe.name }}
      </h3>

      <!-- Stats Row -->
      <div class="flex items-center gap-4 text-sm text-gray-400 mb-3">
        <span class="flex items-center gap-1">
          🕐 {{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }}m
        </span>
        <span class="flex items-center gap-1">
          🔥 {{ recipe.caloriesPerServing }} cal
        </span>
        <span class="flex items-center gap-1">
          👤 {{ recipe.servings }} serving
        </span>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in recipe.tags.slice(0, 3)" :key="tag"
          class="border border-zinc-600 text-gray-300 text-xs px-3 py-1 rounded-full"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Bookmark -->
    <div class="px-4 pb-4 flex justify-end">
      <button @click.stop="store.toggleBookmark(recipe)"
        class="text-xl hover:scale-125 transition-transform">
        {{ store.isBookmarked(recipe.id) ? '🔖' : '🤍' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '../types/recipe'
import { useRecipeStore } from '../stores/recipeStore'
defineProps<{ recipe: Recipe }>()
defineEmits<{ select: [recipe: Recipe] }>()
const store = useRecipeStore()
</script>