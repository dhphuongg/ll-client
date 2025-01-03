import { useAuthStore } from '@/stores';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const auth = async (
  from: RouteLocationNormalized,
  to: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore();
  if (from.name === 'Login' && authStore.loggedIn) {
    return next();
  }

  if (from.meta.requiresAuth) {
    if (authStore.loggedIn) {
      next();
    } else {
      next(`/auth/login?redirect=${to.path}`);
    }
  } else {
    next();
  }
};
