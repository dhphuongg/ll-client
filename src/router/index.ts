import { createRouter, createWebHistory } from 'vue-router';
import routes from '~pages';
import { setupLayouts } from 'virtual:generated-layouts';

import { auth } from '@/middlewares';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes)
});

router.beforeEach(async (from, to, next) => {
  return auth(from, to, next);
});

router.afterEach((to) => {
  const defaultDocumentTitle = 'Little Lives';
  if (to.name) {
    document.title = `${String(to.name)} - ${defaultDocumentTitle}`;
  } else {
    document.title = defaultDocumentTitle;
  }
});

export default router;
