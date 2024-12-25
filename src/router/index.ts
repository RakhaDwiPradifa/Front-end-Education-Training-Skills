import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/',
    component: () => import('../views/LandingPage.vue'),
    meta: { guest: true }
  },
  {
    path: '/dashboard',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
    meta: { guest: true }
  },
  {
    path: '/signup',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/courses',
    component: () => import('../views/Courses.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/courses/:id',
    name: 'course-details',
    component: () => import('../views/CourseDetails.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/dashboard',
    component: () => import('../views/admin/Dashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/courses/create',
    component: () => import('../views/admin/CourseForm.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/courses/:id/edit',
    component: () => import('../views/admin/CourseForm.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresAdmin && !auth.isAdmin) {
    next('/dashboard');
  } else if (to.meta.guest && auth.isAuthenticated && to.path !== '/') {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;