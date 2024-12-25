<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAuthStore();

const features = [
  {
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of experience',
    icon: '👨‍🏫'
  },
  {
    title: 'Flexible Learning',
    description: 'Study at your own pace, anywhere and anytime',
    icon: '⏰'
  },
  {
    title: 'Practical Projects',
    description: 'Apply your knowledge with hands-on projects',
    icon: '💻'
  },
  {
    title: 'Career Support',
    description: 'Get guidance to advance your career',
    icon: '🚀'
  }
];

const popularCourses = ref([
  {
    title: 'Web Development Fundamentals',
    category: 'Programming',
    level: 'beginner',
    price: 49.99,
    image: 'https://placehold.co/600x400?text=Web+Dev'
  },
  {
    title: 'UI/UX Design Essentials',
    category: 'Design',
    level: 'intermediate',
    price: 59.99,
    image: 'https://placehold.co/600x400?text=UI+Design'
  },
  {
    title: 'Digital Marketing Mastery',
    category: 'Marketing',
    level: 'beginner',
    price: 39.99,
    image: 'https://placehold.co/600x400?text=Marketing'
  }
]);

const navigateToRegister = () => {
  router.push('/signup');
};

const navigateToLogin = () => {
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="py-20 md:py-28">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
              Unlock Your Potential with SkillUp
            </h1>
            <p class="text-xl text-blue-100 mb-8">
              Master new skills with our expert-led online courses
            </p>
            <button
              @click="navigateToLogin"
              class="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose SkillUp?
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <div class="text-4xl mb-4">{{ feature.icon }}</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Popular Courses Section -->
    <div class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
          Popular Courses
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="course in popularCourses"
            :key="course.title"
            class="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img :src="course.image" :alt="course.title" class="w-full h-48 object-cover">
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">
                {{ course.title }}
              </h3>
              <div class="flex justify-between items-center mb-4">
                <span class="text-sm text-gray-500">{{ course.category }}</span>
                <span class="px-2 py-1 text-xs font-semibold rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': course.level === 'beginner',
                        'bg-yellow-100 text-yellow-800': course.level === 'intermediate'
                      }">
                  {{ course.level }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-primary">${{ course.price }}</span>
                <button
                  @click="navigateToLogin"
                  class="btn btn-primary"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Ready to Start Learning?
        </h2>
        <p class="text-xl text-gray-600 mb-8">
          Join thousands of students already learning on SkillUp
        </p>
        <button
          @click="navigateToRegister"
          class="bg-primary text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-primary-dark transition-colors"
        >
          Sign Up Now
        </button>
      </div>
    </div>
  </div>
</template>