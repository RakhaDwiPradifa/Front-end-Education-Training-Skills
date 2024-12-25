<script setup lang="ts">
import { ref } from 'vue';
import type { CourseFormData, Course } from '../../types/course';

const props = defineProps<{
  initialData?: Course;
}>();

const emit = defineEmits<{
  (e: 'submit', data: CourseFormData): void;
  (e: 'cancel'): void;
}>();

const formData = ref<CourseFormData>({
  title: props.initialData?.title || '',
  description: props.initialData?.description || '',
  image_url: props.initialData?.image_url || '',
  duration: props.initialData?.duration || '',
  level: props.initialData?.level || 'beginner',
  price: props.initialData?.price || 0,
  instructor: props.initialData?.instructor || '',
  category: props.initialData?.category || '',
  status: props.initialData?.status || 'draft',
});

const handleSubmit = () => {
  emit('submit', formData.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700">Title</label>
      <input type="text" v-model="formData.title" required class="input mt-1">
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Description</label>
      <textarea v-model="formData.description" required rows="4" class="input mt-1"></textarea>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Image URL</label>
      <input type="url" v-model="formData.image_url" required class="input mt-1">
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Duration</label>
        <input type="text" v-model="formData.duration" required class="input mt-1">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Level</label>
        <select v-model="formData.level" required class="input mt-1">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Price</label>
        <input type="number" v-model="formData.price" required min="0" step="0.01" class="input mt-1">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Category</label>
        <select v-model="formData.category" required class="input mt-1">
          <option value="Programming">Programming</option>
          <option value="Design">Design</option>
          <option value="Business">Business</option>
          <option value="Marketing">Marketing</option>
          <option value="Personal Development">Personal Development</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Status</label>
        <select v-model="formData.status" required class="input mt-1">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Instructor</label>
        <input type="text" v-model="formData.instructor" required class="input mt-1">
      </div>
    </div>

    <div class="flex justify-end space-x-4">
      <button type="button" @click="$emit('cancel')" class="btn bg-gray-100 text-gray-700 hover:bg-gray-200">
        Cancel
      </button>
      <button type="submit" class="btn btn-primary">
        {{ props.initialData ? 'Update' : 'Create' }} Course
      </button>
    </div>
  </form>
</template>