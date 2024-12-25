<script setup lang="ts">
import PublicNavbar from '../components/layout/PublicNavbar.vue';
</script>

<template>
  <div class="min-h-screen">
    <PublicNavbar />
    <main>
      <slot />
    </main>
  </div>
</template>