<script setup lang="ts">
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  auth.logout();
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm" v-if="auth.isAuthenticated">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link
              to="/dashboard"
              class="flex-shrink-0 flex items-center text-primary font-bold text-xl"
            >
              SkillUp
            </router-link>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                to="/dashboard"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Dashboard
              </router-link>
              <router-link
                to="/courses"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Courses
              </router-link>
              <router-link
                v-if="auth.isAdmin"
                to="/admin/dashboard"
                class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
              >
                Admin
              </router-link>
            </div>
          </div>
          <div class="flex items-center">
            <button
              @click="handleLogout"
              class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>