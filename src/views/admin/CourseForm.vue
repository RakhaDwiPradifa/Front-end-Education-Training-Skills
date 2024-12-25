<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCourseStore } from '../../stores/course';
import CourseFormComponent from '../../components/admin/CourseForm.vue';
import type { Course, CourseFormData } from '../../types/course';

const route = useRoute();
const router = useRouter();
const courseStore = useCourseStore();

const course = ref<Course | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  if (route.params.id) {
    loading.value = true;
    try {
      const response = await axios.get(`/api/admin/courses/${route.params.id}`);
      course.value = response.data;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }
});

const handleSubmit = async (formData: CourseFormData) => {
  try {
    if (route.params.id) {
      await courseStore.updateCourse(Number(route.params.id), formData);
    } else {
      await courseStore.createCourse(formData);
    }
    router.push('/admin/dashboard');
  } catch (err: any) {
    error.value = err.message;
  }
};

const handleCancel = () => {
  router.push('/admin/dashboard');
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ route.params.id ? 'Edit' : 'Create' }} Course
        </h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow rounded-lg">
          <div class="p-6">
            <div v-if="loading" class="text-center py-4">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>

            <div v-else-if="error" class="text-red-600 mb-4">
              {{ error }}
            </div>

            <CourseFormComponent
              v-else
              :initial-data="course"
              @submit="handleSubmit"
              @cancel="handleCancel"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>