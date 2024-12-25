import { defineStore } from 'pinia';
import axios from 'axios';
import type { Course, CourseFilters, CourseFormData } from '../types/course';

export const useCourseStore = defineStore('course', {
  state: () => ({
    courses: [] as Course[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    publishedCourses: (state) => 
      state.courses.filter(course => course.status === 'published'),
    
    filterCourses: (state) => (filters: CourseFilters) => {
      return state.courses.filter(course => {
        if (filters.category && course.category !== filters.category) return false;
        if (filters.level && course.level !== filters.level) return false;
        if (filters.search) {
          const search = filters.search.toLowerCase();
          return course.title.toLowerCase().includes(search) ||
                 course.description.toLowerCase().includes(search);
        }
        return true;
      });
    },
  },

  actions: {
    async fetchCourses() {
      this.loading = true;
      try {
        const response = await axios.get('/api/courses');
        this.courses = response.data;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async createCourse(courseData: CourseFormData) {
      try {
        const response = await axios.post('/api/admin/courses', courseData);
        this.courses.push(response.data);
        return response.data;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      }
    },

    async updateCourse(id: number, courseData: CourseFormData) {
      try {
        const response = await axios.put(`/api/admin/courses/${id}`, courseData);
        const index = this.courses.findIndex(course => course.id === id);
        if (index !== -1) {
          this.courses[index] = response.data;
        }
        return response.data;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      }
    },

    async deleteCourse(id: number) {
      try {
        await axios.delete(`/api/admin/courses/${id}`);
        this.courses = this.courses.filter(course => course.id !== id);
      } catch (error: any) {
        this.error = error.message;
        throw error;
      }
    }
  }
});