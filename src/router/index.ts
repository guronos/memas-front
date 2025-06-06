import { createRouter, createWebHistory } from 'vue-router'
import StartPage from "@/views/StartPage.vue";
import MainRoom from "@/views/MainRoom.vue";
import {useMainStore} from "@/stores/mainState.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StartPage,
    },
    {
      path: '/:roomId',
      name: 'Main',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MainRoom.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/views/RegistrationPage.vue')
    }
  ],
})

router.beforeEach(async (to, from) => {
  const publicPaths = ['/login', '/registration'];
  if (publicPaths.includes(to.path)) return true;

  const $mainStore = useMainStore();
  if ($mainStore.getAuthState) return true;

  try {
    const data = await $mainStore.checkAuthState();
    const checkState = !!data;
    $mainStore.setAuthState(checkState);
    return checkState ? true : '/login';
  } catch (error) {
    console.error('Error during auth state check:', error);
    return '/login';
  }
});

export default router
