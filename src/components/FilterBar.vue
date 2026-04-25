<template>
  <div class="bg-amber-50 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
    <input
      v-model="store.searchQuery"
      type="text"
      placeholder="🔍 Search recipes..."
      class="flex-1 px-4 py-2 rounded-xl border-2 border-amber-200 focus:border-amber-500 outline-none bg-white text-amber-900 placeholder-amber-300"
    />
    <select
      v-model="store.selectedCuisine"
      class="px-4 py-2 rounded-xl border-2 border-amber-200 focus:border-amber-500 outline-none bg-white text-amber-900"
    >
      <option value="">All Cuisines</option>
      <option v-for="cuisine in store.cuisines" :key="cuisine" :value="cuisine">
        {{ cuisine }}
      </option>
    </select>
    <select
      v-model="store.selectedDifficulty"
      class="px-4 py-2 rounded-xl border-2 border-amber-200 focus:border-amber-500 outline-none bg-white text-amber-900"
    >
      <option value="">All Difficulties</option>
      <option value="Easy">Easy</option>
      <option value="Medium">Medium</option>
      <option value="Hard">Hard</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useRecipeStore } from '../stores/recipeStore'
const store = useRecipeStore()
</script>