<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import CourseGrid from '../components/organisms/CourseGrid.vue';
import { useCourseStore } from '../stores/course';
import { onMounted } from 'vue';

const auth = useAuthStore();
const courseStore = useCourseStore();

onMounted(() => {
  courseStore.fetchCourses();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-primary to-primary-dark pt-20">
    <!-- Hero Section -->
    <div class="container-custom text-center text-white py-20">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        Welcome back, {{ auth.user?.name }}!
      </h1>
      <p class="text-xl text-white/90 mb-8">
        Continue your learning journey
      </p>
    </div>

    <!-- Main Content -->
    <div class="bg-gray-50 min-h-screen rounded-t-3xl shadow-inner">
      <div class="container-custom py-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Your Courses</h2>
        <CourseGrid
          :courses="courseStore.publishedCourses"
          :loading="courseStore.loading"
          :error="courseStore.error"
        />
      </div>
    </div>
  </div>
</template>