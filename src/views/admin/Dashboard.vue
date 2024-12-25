<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const courses = ref([]);
const loading = ref(true);

const fetchCourses = async () => {
  try {
    const response = await axios.get('/api/admin/courses');
    courses.value = response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchCourses);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>
    </header>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-gray-900">Manage Courses</h2>
            <button
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              Add New Course
            </button>
          </div>

          <div v-if="loading" class="text-center py-4">
            Loading...
          </div>

          <div v-else class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul class="divide-y divide-gray-200">
              <li v-for="course in courses" :key="course.id" class="px-6 py-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">
                      {{ course.title }}
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">
                      {{ course.description }}
                    </p>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      class="px-3 py-1 text-sm text-primary hover:text-primary-dark"
                    >
                      Edit
                    </button>
                    <button
                      class="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>