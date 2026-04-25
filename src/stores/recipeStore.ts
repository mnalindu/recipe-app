import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Recipe } from '../types/recipe'

export const useRecipeStore = defineStore('recipe', () => {
  const recipes = ref<Recipe[]>([])
  const selectedRecipe = ref<Recipe | null>(null)
  const searchQuery = ref('')
  const selectedCuisine = ref('')
  const selectedDifficulty = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const cuisines = computed(() => {
    const all = recipes.value.map(r => r.cuisine)
    return [...new Set(all)].sort()
  })

  const filteredRecipes = computed(() => {
    return recipes.value.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        recipe.cuisine.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCuisine = selectedCuisine.value === '' || recipe.cuisine === selectedCuisine.value
      const matchesDifficulty = selectedDifficulty.value === '' || recipe.difficulty === selectedDifficulty.value
      return matchesSearch && matchesCuisine && matchesDifficulty
    })
  })

  async function fetchRecipes() {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch('https://dummyjson.com/recipes?limit=50')
      const data = await res.json()
      recipes.value = data.recipes
    } catch (e) {
      error.value = 'Failed to fetch recipes'
    } finally {
      isLoading.value = false
    }
  }

  function setSelectedRecipe(recipe: Recipe | null) {
    selectedRecipe.value = recipe
  }

  return {
    recipes, selectedRecipe, searchQuery, selectedCuisine,
    selectedDifficulty, isLoading, error, cuisines,
    filteredRecipes, fetchRecipes, setSelectedRecipe
  }
})