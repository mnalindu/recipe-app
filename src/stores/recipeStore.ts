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
  const bookmarks = ref<Recipe[]>(JSON.parse(localStorage.getItem('bookmarks') || '[]'))
  const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')

  // Auth
  const token = ref<string | null>(localStorage.getItem('token'))
  const currentUser = ref<string | null>(localStorage.getItem('username'))
  const isLoggedIn = computed(() => !!token.value)

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

  async function login(username: string, password: string): Promise<boolean> {
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (!res.ok) return false
      const data = await res.json()
      token.value = data.accessToken
      currentUser.value = data.username
      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('username', data.username)
      return true
    } catch {
      return false
    }
  }

  function logout() {
    token.value = null
    currentUser.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  function toggleBookmark(recipe: Recipe) {
    const index = bookmarks.value.findIndex(b => b.id === recipe.id)
    if (index === -1) {
      bookmarks.value.push(recipe)
    } else {
      bookmarks.value.splice(index, 1)
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks.value))
  }

  function isBookmarked(id: number): boolean {
    return bookmarks.value.some(b => b.id === id)
  }

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('darkMode', String(isDarkMode.value))
  }

  function setSelectedRecipe(recipe: Recipe | null) {
    selectedRecipe.value = recipe
  }

  return {
    recipes, selectedRecipe, searchQuery, selectedCuisine,
    selectedDifficulty, isLoading, error, cuisines, filteredRecipes,
    bookmarks, isDarkMode, token, currentUser, isLoggedIn,
    fetchRecipes, login, logout, toggleBookmark, isBookmarked,
    toggleDarkMode, setSelectedRecipe
  }
})