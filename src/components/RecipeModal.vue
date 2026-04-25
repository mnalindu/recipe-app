<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    style="background:rgba(0,0,0,0.85); backdrop-filter:blur(10px);"
    @click.self="$emit('close')">
    <div class="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      style="background:#141414; border:1px solid #2a2a2a;">

      <!-- Close -->
      <button @click="$emit('close')"
        class="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center transition-colors"
        style="background:#1e1e1e; color:#888; border:1px solid #2a2a2a;"
        @mouseover="($event.target as HTMLElement).style.color='#c8a96e'"
        @mouseout="($event.target as HTMLElement).style.color='#888'">
        ✕
      </button>

      <!-- Hero image -->
      <div class="relative h-72 md:h-96 overflow-hidden">
        <img :src="recipe.image" :alt="recipe.name" class="w-full h-full object-cover" />
        <div class="absolute inset-0" style="background:linear-gradient(to top, #141414 0%, transparent 60%)"></div>
        <div class="absolute bottom-6 left-8">
          <p class="text-xs tracking-widest uppercase mb-2" style="color:#c8a96e;">{{ recipe.cuisine }}</p>
          <h2 class="font-display text-4xl font-bold" style="color:#f5f0e8;">{{ recipe.name }}</h2>
        </div>
      </div>

      <div class="p-8">
        <!-- Stats -->
        <div class="grid grid-cols-4 gap-3 mb-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center py-4"
            style="background:#1a1a1a; border:1px solid #2a2a2a;">
            <p class="text-2xl mb-1">{{ stat.icon }}</p>
            <p class="font-display text-lg font-bold" style="color:#c8a96e;">{{ stat.value }}</p>
            <p class="text-xs uppercase tracking-widest mt-1" style="color:#555;">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-8">
          <span v-for="tag in recipe.tags" :key="tag"
            class="text-xs tracking-widest uppercase px-3 py-1"
            style="border:1px solid #2a2a2a; color:#666;">
            {{ tag }}
          </span>
        </div>

        <!-- Two column layout -->
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Ingredients -->
          <div>
            <h3 class="font-display text-2xl font-bold mb-4" style="color:#f5f0e8;">
              Ingredients
            </h3>
            <ul class="space-y-2">
              <li v-for="ing in recipe.ingredients" :key="ing"
                class="flex items-start gap-3 text-sm py-2"
                style="border-bottom:1px solid #1e1e1e; color:#aaa;">
                <span style="color:#c8a96e; margin-top:2px;">—</span>
                {{ ing }}
              </li>
            </ul>
          </div>

          <!-- Instructions -->
          <div>
            <h3 class="font-display text-2xl font-bold mb-4" style="color:#f5f0e8;">
              Instructions
            </h3>
            <ol class="space-y-4">
              <li v-for="(step, i) in recipe.instructions" :key="i" class="flex gap-4 text-sm" style="color:#aaa;">
                <span class="font-display text-3xl font-bold flex-shrink-0 leading-none"
                  style="color:#2a2a2a;">{{ String(i+1).padStart(2,'0') }}</span>
                <p class="leading-relaxed pt-1">{{ step }}</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Recipe } from '../types/recipe'

const props = defineProps<{ recipe: Recipe }>()
defineEmits<{ close: [] }>()

const stats = computed(() => [
  { icon: '⏱', value: `${props.recipe.prepTimeMinutes + props.recipe.cookTimeMinutes}m`, label: 'Total Time' },
  { icon: '👤', value: props.recipe.servings, label: 'Servings' },
  { icon: '🔥', value: props.recipe.caloriesPerServing, label: 'Calories' },
  { icon: '★', value: props.recipe.rating, label: 'Rating' },
])
</script>