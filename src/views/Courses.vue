<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCourseStore } from '../stores/course';
import CourseCard from '../components/CourseCard.vue';
import CourseFilters from '../components/CourseFilters.vue';
import type { CourseFilters as FilterType } from '../types/course';

const courseStore = useCourseStore();
const filters = ref<FilterType>({});

onMounted(() => {
  courseStore.fetchCourses();
});

const filteredCourses = computed(() => {
  return courseStore.filterCourses(filters.value);
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">Available Courses</h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Filters -->
          <div class="lg:col-span-1">
            <CourseFilters v-model="filters" />
          </div>

          <!-- Course List -->
          <div class="lg:col-span-3">
            <div v-if="courseStore.loading" class="text-center py-8">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p class="mt-2 text-gray-600">Loading courses...</p>
            </div>

            <div v-else-if="courseStore.error" class="text-center py-8">
              <p class="text-red-600">{{ courseStore.error }}</p>
            </div>

            <div v-else-if="filteredCourses.length === 0" class="text-center py-8">
              <p class="text-gray-600">No courses found matching your criteria.</p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CourseCard
                v-for="course in filteredCourses"
                :key="course.id"
                :course="course"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>