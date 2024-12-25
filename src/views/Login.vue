<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const formData = ref({
  Email: '',
  Password: '',
});
const error = ref('');
const successMessage = ref('');
const loading = ref(false);

const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  successMessage.value = '';

  try {
    const response = await fetch('http://127.0.0.1:8000/api/login', {
  method: 'POST',
  body: JSON.stringify({
    Email: formData.value.Email,
    Password: formData.value.Password,
  }),
  headers: {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
},
});


    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error Response:', errorText);
      error.value = 'Invalid credentials or server error';
      return;
    }

    const responseData = await response.json();
    successMessage.value = 'Login successful! Redirecting...';
    localStorage.setItem('token', responseData.token);

    setTimeout(() => {
      router.push('/');
    }, 1500);
  } catch (err) {
    console.error('Request failed:', err);
    error.value = 'Failed to connect to server';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm space-y-4">
          <input
            v-model="formData.Email"
            type="email"
            placeholder="Email"
            required
            class="form-input"
          />
          <input
            v-model="formData.Password"
            type="password"
            placeholder="Password"
            required
            class="form-input"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>
        <div v-if="successMessage" class="text-green-500 text-sm text-center">
          {{ successMessage }}
        </div>
        <div v-if="loading" class="text-sm text-gray-500 text-center">
          Loading...
        </div>

        <button
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-input {
  appearance: none;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 1rem;
}
</style>
