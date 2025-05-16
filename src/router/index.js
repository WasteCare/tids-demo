import { createRouter, createWebHistory } from 'vue-router'
import DefaultView from '../views/DefaultView.vue'

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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/update/:id',
      name: 'update',
      component: () => import('../views/IDMainView.vue'),
      props: true,
    },
    {
      path: '/create',
      name: 'create',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateView.vue'),
    },
  ],
})

export default router
