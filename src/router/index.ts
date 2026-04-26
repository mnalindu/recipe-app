import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookmarksView from '../views/BookmarksView.vue'
import RecipeDetailView from '../views/RecipeDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/bookmarks', name: 'bookmarks', component: BookmarksView },
    { path: '/recipe/:id', name: 'recipe', component: RecipeDetailView }
  ],
})

export default router