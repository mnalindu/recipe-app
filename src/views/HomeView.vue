<template>
  <main class="w-full" style="background:#0f0f0f; min-height:100vh;">

    <!-- HERO -->
    <div class="relative w-full flex items-center justify-center overflow-hidden"
      style="height:100vh; background: linear-gradient(160deg, #1a1206 0%, #0f0f0f 60%);">
      <div class="absolute inset-0 opacity-20"
        style="background-image: radial-gradient(circle at 20% 50%, #c8a96e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8b5e3c 0%, transparent 40%);">
      </div>
      <div class="relative text-center px-6 max-w-5xl mx-auto">
        <p class="text-xs tracking-[0.5em] uppercase mb-6" style="color:#c8a96e;">World Cuisine Collection</p>
        <h1 class="font-display leading-none mb-8"
          style="font-size: clamp(3rem, 10vw, 8rem); font-weight:900; color:#f5f0e8; letter-spacing:-2px;">
          Discover<br/>
          <em style="color:#c8a96e; font-style:italic;">Delicious</em><br/>
          Recipes
        </h1>
        <p class="text-lg mb-10 mx-auto max-w-xl" style="color:#888; font-weight:300; line-height:1.8;">
          Explore 50+ handpicked recipes from the world's finest cuisines
        </p>
        <button @click="scrollToRecipes"
          class="text-sm tracking-widest uppercase px-10 py-4 transition-all duration-300 hover:scale-105"
          style="background:#c8a96e; color:#0f0f0f; font-weight:500; letter-spacing:0.2em;">
          Browse Recipes ↓
        </button>
      </div>
    </div>

    <!-- FILTERS -->
    <div id="recipes" class="max-w-screen-xl mx-auto px-6 pt-20 pb-8">
      <div class="flex flex-col md:flex-row gap-4 items-center">
        <div class="relative flex-1 w-full">
          <input
            v-model="store.searchQuery"
            type="text"
            placeholder="Search recipes, cuisines..."
            class="w-full px-6 py-4 text-sm outline-none transition-all"
            style="background:#1a1a1a; border:1px solid #2a2a2a; color:#f5f0e8; letter-spacing:0.05em;"
            @focus="($event.target as HTMLInputElement).style.borderColor='#c8a96e'"
            @blur="($event.target as HTMLInputElement).style.borderColor='#2a2a2a'"
          />
          <span class="absolute right-5 top-1/2 -translate-y-1/2 text-sm" style="color:#555;">⌕</span>
        </div>
        <select v-model="store.selectedCuisine"
          class="px-6 py-4 text-sm outline-none cursor-pointer"
          style="background:#1a1a1a; border:1px solid #2a2a2a; color:#f5f0e8; min-width:180px;">
          <option value="">All Cuisines</option>
          <option v-for="c in store.cuisines" :key="c" :value="c">{{ c }}</option>
        </select>
        <select v-model="store.selectedDifficulty"
          class="px-6 py-4 text-sm outline-none cursor-pointer"
          style="background:#1a1a1a; border:1px solid #2a2a2a; color:#f5f0e8; min-width:180px;">
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div class="flex items-center justify-between mt-6 pb-6" style="border-bottom:1px solid #1e1e1e;">
        <p class="text-sm" style="color:#666;">
          Showing <span style="color:#c8a96e; font-weight:500;">{{ store.filteredRecipes.length }}</span> recipes
        </p>
      </div>
    </div>

    <!-- LOADING -->
    <div v-if="store.isLoading" class="flex flex-col items-center justify-center py-32">
      <div class="text-5xl mb-6" style="animation: spin 2s linear infinite;">🍳</div>
      <p class="text-sm tracking-widest uppercase" style="color:#666;">Loading recipes...</p>
    </div>

    <!-- GRID -->
    <div v-else class="max-w-screen-xl mx-auto px-6 pb-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px" style="background:#1e1e1e;">
        <RecipeCard
          v-for="recipe in store.filteredRecipes"
          :key="recipe.id"
          :recipe="recipe"
          @select="openModal"
        />
      </div>
    </div>

    <!-- MODAL -->
    <RecipeModal
      v-if="selectedRecipe"
      :recipe="selectedRecipe"
      @close="selectedRecipe = null"
    />
    <!-- Footer -->
    <footer class="bg-amber-50 dark:bg-zinc-900 border-t border-amber-200 dark:border-zinc-700 mt-12 py-8">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <div class="flex items-center justify-center gap-2 mb-2">
          <span class="text-xl">🍽️</span>
          <span class="font-serif text-lg font-bold text-amber-900 dark:text-amber-400">Quick Bites</span>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          © 2026 Quick Bites Recipe App. Crafted with code and ❤️
        </p>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRecipeStore } from '../stores/recipeStore'
import RecipeCard from '../components/RecipeCard.vue'
import RecipeModal from '../components/RecipeModal.vue'
import FilterBar from '../components/FilterBar.vue'
import type { Recipe } from '../types/recipe'

const store = useRecipeStore()
const selectedRecipe = ref<Recipe | null>(null)

function openModal(recipe: Recipe) { selectedRecipe.value = recipe }
function scrollToRecipes() {
  document.getElementById('recipes')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => { store.fetchRecipes() })
</script>

<style scoped>
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>