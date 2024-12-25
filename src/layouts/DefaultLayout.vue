<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import Navbar from '../components/organisms/Navbar.vue';
import Footer from '../components/organisms/Footer.vue';

const auth = useAuthStore();
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <main>
      <slot />
    </main>
    <Footer />
  </div>
</template>