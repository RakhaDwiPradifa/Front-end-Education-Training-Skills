<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const isScrolled = ref(false);
const mobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const handleLogout = () => {
  auth.logout();
  router.push('/login');
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <nav
    class="fixed w-full z-50 transition-all duration-300"
    :class="[
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg py-2' 
        : 'bg-transparent py-4'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <!-- Logo and Main Nav -->
        <div class="flex items-center">
          <router-link
            to="/dashboard"
            class="flex-shrink-0 flex items-center"
          >
            <span class="text-2xl font-bold" :class="[
              isScrolled ? 'text-primary' : 'text-white'
            ]">
              SkillUp
            </span>
          </router-link>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:ml-10 md:flex md:space-x-8">
            <router-link
              v-for="(link, index) in [
                { to: '/dashboard', text: 'Dashboard' },
                { to: '/courses', text: 'Courses' },
                { to: '/admin/dashboard', text: 'Admin', show: auth.isAdmin }
              ]"
              :key="index"
              v-show="!link.show || link.show"
              :to="link.to"
              :class="[
                'transition-colors duration-200 text-sm font-medium',
                isScrolled 
                  ? 'text-gray-900 hover:text-primary' 
                  : 'text-white/90 hover:text-white'
              ]"
            >
              {{ link.text }}
            </router-link>
          </div>
        </div>

        <!-- Right Side Menu -->
        <div class="flex items-center">
          <div class="flex items-center space-x-4">
            <span :class="[
              'text-sm font-medium',
              isScrolled ? 'text-gray-700' : 'text-white/90'
            ]">
              {{ auth.user?.name }}
            </span>
            <button
              @click="handleLogout"
              class="transition-all duration-200 px-4 py-2 rounded-full text-sm font-medium"
              :class="[
                isScrolled 
                  ? 'bg-primary text-white hover:bg-primary-dark' 
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              ]"
            >
              Logout
            </button>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden ml-4 p-2"
            :class="[
              isScrolled ? 'text-gray-900' : 'text-white'
            ]"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-show="mobileMenuOpen"
        class="md:hidden mt-2 py-2 bg-white/95 backdrop-blur-md rounded-lg shadow-lg"
      >
        <router-link
          v-for="(link, index) in [
            { to: '/dashboard', text: 'Dashboard' },
            { to: '/courses', text: 'Courses' },
            { to: '/admin/dashboard', text: 'Admin', show: auth.isAdmin }
          ]"
          :key="index"
          v-show="!link.show || link.show"
          :to="link.to"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          @click="mobileMenuOpen = false"
        >
          {{ link.text }}
        </router-link>
      </div>
    </div>
  </nav>

  <!-- Spacer to prevent content from hiding under fixed navbar -->
  <div class="h-16"></div>
</template>