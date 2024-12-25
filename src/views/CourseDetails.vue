<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCourseStore } from '../stores/course';
import type { Course } from '../types/course';

const route = useRoute();
const router = useRouter();
const courseStore = useCourseStore();

const course = ref<Course | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await axios.get(`/api/courses/${route.params.id}`);
    course.value = response.data;
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="loading" class="flex items-center justify-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <template v-else-if="course">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center">
            <h1 class="text-3xl font-bold text-gray-900">{{ course.title }}</h1>
            <span class="px-3 py-1 text-sm font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': course.level === 'beginner',
                    'bg-yellow-100 text-yellow-800': course.level === 'intermediate',
                    'bg-red-100 text-red-800': course.level === 'advanced'
                  }">
              {{ course.level }}
            </span>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <img :src="course.image_url" :alt="course.title" class="w-full h-96 object-cover">
            
            <div class="p-8">
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center space-x-4">
                  <span class="text-gray-600">
                    <i class="fas fa-clock mr-2"></i>{{ course.duration }}
                  </span>
                  <span class="text-gray-600">
                    <i class="fas fa-user mr-2"></i>{{ course.instructor }}
                  </span>
                </div>
                <span class="text-2xl font-bold text-primary">${{ course.price }}</span>
              </div>

              <div class="prose max-w-none">
                <h2 class="text-xl font-semibold mb-4">About this course</h2>
                <p class="text-gray-600">{{ course.description }}</p>
              </div>

              <div class="mt-8">
                <button class="btn btn-primary w-full">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </template>
  </div>
</template>