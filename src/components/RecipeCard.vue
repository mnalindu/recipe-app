<template>
  <div
    @click="$emit('select', recipe)"
    class="group cursor-pointer relative overflow-hidden"
    style="background:#0f0f0f; aspect-ratio: 3/4;"
  >
    <!-- Image -->
    <img
      :src="recipe.image"
      :alt="recipe.name"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <!-- Dark overlay -->
    <div class="absolute inset-0 transition-opacity duration-500"
      style="background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);">
    </div>
    <!-- Hover overlay -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style="background: rgba(200,169,110,0.1);">
    </div>

    <!-- Top badges -->
    <div class="absolute top-4 left-4 right-4 flex justify-between items-start">
      <span class="text-xs tracking-widest uppercase px-3 py-1"
        style="background:rgba(200,169,110,0.9); color:#0f0f0f; font-weight:500;">
        {{ recipe.cuisine }}
      </span>
      <span class="text-xs px-2 py-1" style="background:rgba(0,0,0,0.7); color:#c8a96e;">
        ★ {{ recipe.rating }}
      </span>
    </div>

    <!-- Bottom content -->
    <div class="absolute bottom-0 left-0 right-0 p-5">
      <p class="text-xs tracking-widest uppercase mb-2" style="color:#c8a96e;">
        {{ recipe.mealType.join(' · ') }}
      </p>
      <h3 class="font-display text-xl font-bold leading-tight mb-3" style="color:#f5f0e8;">
        {{ recipe.name }}
      </h3>
      <div class="flex items-center gap-4 text-xs" style="color:#888;">
        <span>⏱ {{ recipe.prepTimeMinutes + recipe.cookTimeMinutes }}min</span>
        <span>👤 {{ recipe.servings }}</span>
        <span :style="{ color: recipe.difficulty === 'Easy' ? '#7cb98a' : recipe.difficulty === 'Medium' ? '#c8a96e' : '#e07070' }">
          {{ recipe.difficulty }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '../types/recipe'
defineProps<{ recipe: Recipe }>()
defineEmits<{ select: [recipe: Recipe] }>()
</script>