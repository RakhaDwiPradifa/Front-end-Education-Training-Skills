<script setup lang="ts">
import { computed } from 'vue';
import CourseCard from '../molecules/CourseCard.vue';
import type { Course } from '../../types/course';

const props = defineProps<{
  courses: Course[];
  loading?: boolean;
  error?: string | null;
}>();

const hasContent = computed(() => !props.loading && !props.error && props.courses.length > 0);
</script>

<template>
  <div>
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="mt-2 text-gray-600">Loading courses...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="courses.length === 0" class="text-center py-8">
      <p class="text-gray-600">No courses found.</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CourseCard
        v-for="course in courses"
        :key="course.id"
        :course="course"
      />
    </div>
  </div>
</template>