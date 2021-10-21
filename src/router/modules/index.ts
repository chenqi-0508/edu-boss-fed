import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import rightsRoutes from './rights'
import usersRoutes from './users'
import coursesRoutes from './courses'
import advertsRoutes from './adverts'

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */ '@/views/error-page/404.vue')
  },
  rightsRoutes,
  usersRoutes,
  coursesRoutes,
  advertsRoutes
]

export default routes
