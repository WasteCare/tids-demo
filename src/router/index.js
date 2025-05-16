import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /* {
      path: '/',
      name: 'home',
      component: () => import('../views/FilteredInboxView.vue'),
      props: true,
      children: [
        { path: 'ids/:id', component: () => import('../views/IDMainView.vue'), props: true },
      ],
    },*/
    {
      path: '/ids/:id',
      name: 'id',
      component: () => import('../views/IDMainView.vue'),
      props: true,
    },
    {
      path: '/update/:id',
      name: 'update',
      component: () => import('../views/IDMainView.vue'),
      props: true,
    },
  ],
})

export default router
