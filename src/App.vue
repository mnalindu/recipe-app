<template>
  <div class="min-h-screen w-full" style="background:#0f0f0f; color:#f5f0e8;">
    <NavBar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>