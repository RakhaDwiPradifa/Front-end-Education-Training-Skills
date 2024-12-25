import { defineStore } from 'pinia';
import axios from 'axios';
import type { AuthState, LoginCredentials, RegisterCredentials, User } from '../types/auth';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    async login(credentials: LoginCredentials) {
      try {
        // Kirim kredensial login ke backend
        const response = await axios.post('/api/login', {
          email: credentials.email,
          password: credentials.password,
        });

        const { token, user } = response.data;

        // Simpan token dan user di state dan localStorage
        this.token = token;
        this.user = user;
        localStorage.setItem('token', token);

        // Set header Authorization untuk request selanjutnya
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return true;
      } catch (error) {
        console.error('Login failed:', error);
        return false;
      }
    },
    
    async register(credentials: RegisterCredentials) {
      try {
        // Mengirim kredensial registrasi ke backend
        const response = await axios.post('/api/register', {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          password_confirmation: credentials.password_confirmation,
          gender: credentials.gender,
          birth_date: credentials.birth_date,
          address: credentials.address,
          phone_number: credentials.phone_number,
        });
        
        const { token, user } = response.data;
        
        // Menyimpan token dan user di state dan localStorage
        this.token = token;
        this.user = user;
        localStorage.setItem('token', token);
        
        // Mengatur header Authorization untuk permintaan berikutnya
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return true;
      } catch (error) {
        console.error('Registration failed:', error);
        return false;
      }
    },
    
    logout() {
      // Menghapus data user dan token, serta menghapus header Authorization
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
});
