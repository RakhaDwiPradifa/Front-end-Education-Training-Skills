<script setup lang="ts">
import Button from '../atoms/Button.vue';
import type { Course } from '../../types/course';

defineProps<{
  course: Course;
}>();
</script>

<template>
  <div class="card">
    <img :src="course.image_url" :alt="course.title" class="w-full h-48 object-cover">
    <div class="p-6">
      <div class="flex justify-between items-start">
        <h3 class="text-lg font-semibold text-gray-900">{{ course.title }}</h3>
        <span class="px-2 py-1 text-xs font-semibold rounded-full"
              :class="{
                'bg-green-100 text-green-800': course.level === 'beginner',
                'bg-yellow-100 text-yellow-800': course.level === 'intermediate',
                'bg-red-100 text-red-800': course.level === 'advanced'
              }">
          {{ course.level }}
        </span>
      </div>
      <p class="mt-2 text-sm text-gray-600 line-clamp-2">{{ course.description }}</p>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-sm text-gray-500">{{ course.duration }}</span>
        <span class="text-lg font-bold text-primary">${{ course.price }}</span>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-sm text-gray-500">By {{ course.instructor }}</span>
        <Button variant="primary" size="sm" @click="$router.push(`/courses/${course.id}`)">
          View Details
        </Button>
      </div>
    </div>
  </div>
</template>