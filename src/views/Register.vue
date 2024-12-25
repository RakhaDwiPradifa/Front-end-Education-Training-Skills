<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Data untuk form
const formData = ref({
  Nama: '',
  Email: '',
  Password: '',
  Password_confirmation: '',
  JenisKelamin: '',
  TanggalLahir: '',
  Alamat: '',
  NomorTelepon: '',
});
const profilePicture = ref<File | null>(null); // Tipe File untuk gambar profil
const error = ref('');

// Router
const router = useRouter();

// Fungsi untuk menangani signup
const handleSignUp = async () => {
  try {
    const data = new FormData();
    Object.entries(formData.value).forEach(([key, value]) => {
      data.append(key, value as string);
    });

    if (profilePicture.value) {
      data.append('ProfilePicture', profilePicture.value);
    }

    const response = await fetch('http://127.0.0.1:8000/api/register', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      // Coba tampilkan respons dalam format teks untuk melihat error
      const errorText = await response.text();
      console.error('Error Response:', errorText); // Lihat isi error dari server
      error.value = 'Registration failed';
      return;
    }

    const responseData = await response.json();
    alert(responseData.message);
    router.push('/');
  } catch (err) {
    console.error('Request failed:', err);
    error.value = 'Failed to connect to server';
  }
};


// Fungsi untuk menangani perubahan pada file input
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    profilePicture.value = input.files[0];
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create a new account
      </h2>
      <form class="mt-8 space-y-6" @submit.prevent="handleSignUp">
        <div class="rounded-md shadow-sm space-y-4">
          <input v-model="formData.Nama" type="text" placeholder="Nama" required class="form-input" />
          <input v-model="formData.Email" type="email" placeholder="Email" required class="form-input" />
          <input v-model="formData.Password" type="password" placeholder="Password" required class="form-input" />
          <input
            v-model="formData.Password_confirmation"
            type="password"
            placeholder="Confirm Password"
            required
            class="form-input"
          />
          <select v-model="formData.JenisKelamin" required class="form-input">
            <option value="" disabled selected>Select Gender</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
          <input v-model="formData.TanggalLahir" type="date" required class="form-input" />
          <textarea v-model="formData.Alamat" placeholder="Alamat" required class="form-input"></textarea>
          <input v-model="formData.NomorTelepon" type="text" placeholder="Nomor Telepon" required class="form-input" />
          <input type="file" @change="handleFileChange" class="form-input" />
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-500 text-sm text-center">{{ error }}</div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark"
        >
          Sign up
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
