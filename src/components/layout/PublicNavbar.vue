<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToLogin = () => {
  router.push('/login');
};
</script>

<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <router-link
            to="/"
            class="flex-shrink-0 flex items-center text-primary font-bold text-xl"
          >
            SkillUp
          </router-link>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a href="#features" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
              Features
            </a>
            <a href="#courses" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
              Courses
            </a>
            <a href="#about" class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
              About
            </a>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="navigateToLogin"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>