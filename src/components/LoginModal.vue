<template>
  <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    @click.self="$emit('close')">
    <div class="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-8 shadow-2xl">
      <h2 class="font-serif text-3xl font-bold text-amber-900 dark:text-amber-400 mb-2">Welcome Back</h2>
      <p class="text-gray-500 mb-6 text-sm">Enter your details to get started</p>

      <div v-if="error" class="bg-red-50 text-red-600 rounded-xl p-3 mb-4 text-sm">{{ error }}</div>

      <div class="space-y-4">
        <input v-model="username" type="text" placeholder="Username or Email"
          class="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 outline-none bg-amber-50 dark:bg-zinc-800 dark:text-white dark:border-zinc-600" />
        <input v-model="password" type="password" placeholder="Password"
          class="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 outline-none bg-amber-50 dark:bg-zinc-800 dark:text-white dark:border-zinc-600" />
        <button @click="handleLogin" :disabled="loading"
          class="w-full bg-amber-900 text-amber-50 py-3 rounded-xl font-semibold hover:bg-amber-800 transition disabled:opacity-50">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
        <button @click="$emit('close')"
          class="w-full border-2 border-amber-200 text-amber-900 py-3 rounded-xl font-semibold hover:bg-amber-50 transition">
          Cancel
        </button>
      </div>

      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRecipeStore } from '../stores/recipeStore'

const emit = defineEmits<{ close: [] }>()
const store = useRecipeStore()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  const success = await store.login(username.value, password.value)
  loading.value = false
  if (success) {
    emit('close')
  } else {
    error.value = 'Invalid username or password. Try emilys / emilyspass'
  }
}
</script>