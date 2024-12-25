<script setup lang="ts">
import { ref, watch } from 'vue';
import type { CourseFilters } from '../types/course';

const props = defineProps<{
  modelValue: CourseFilters;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: CourseFilters): void;
}>();

const categories = [
  'Programming',
  'Design',
  'Business',
  'Marketing',
  'Personal Development'
];

const levels = ['beginner', 'intermediate', 'advanced'];

const filters = ref({ ...props.modelValue });

watch(filters, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-semibold mb-4">Filters</h3>
    
    <!-- Search -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Search</label>
      <input
        type="text"
        v-model="filters.search"
        class="input mt-1"
        placeholder="Search courses..."
      >
    </div>

    <!-- Categories -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Category</label>
      <select v-model="filters.category" class="input mt-1">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <!-- Levels -->
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Level</label>
      <select v-model="filters.level" class="input mt-1">
        <option value="">All Levels</option>
        <option v-for="level in levels" :key="level" :value="level">
          {{ level.charAt(0).toUpperCase() + level.slice(1) }}
        </option>
      </select>
    </div>

    <!-- Reset Filters -->
    <button
      @click="filters = {}"
      class="w-full btn btn-primary"
    >
      Reset Filters
    </button>
  </div>
</template>