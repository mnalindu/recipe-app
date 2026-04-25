<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
    style="background: rgba(15,15,15,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(200,169,110,0.2);">
    <RouterLink to="/" class="flex items-center gap-3">
      <span class="font-display text-2xl font-bold" style="color:#c8a96e;">SAVEUR</span>
      <span class="text-xs tracking-[0.3em] uppercase" style="color:#888; padding-top:2px;">Recipe Book</span>
    </RouterLink>
    <div class="flex items-center gap-8">
      <RouterLink to="/" class="text-sm tracking-widest uppercase hover:text-amber-400 transition-colors" style="color:#aaa;">
        Recipes
      </RouterLink>
      <span class="text-sm tracking-widest uppercase" style="color:#c8a96e; border:1px solid #c8a96e; padding: 6px 18px; cursor:pointer;">
        Explore
      </span>
    </div>
  </nav>
</template>