import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'

Vue.use(VueRouter)

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
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'),
        meta: { requiresAuth: true },
        props: true
      },
      {
        path: '/role/:roleId/alloc-resource',
        name: 'alloc-resource',
        component: () => import(/* webpackChunkName: 'alloc-resource' */ '@/views/role/alloc-resource.vue'),
        meta: { requiresAuth: true },
        props: true
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import(/* webpackChunkName: 'menu-create' */ '@/views/menu/create.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import(/* webpackChunkName: 'menu-edit' */ '@/views/menu/edit.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/create.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'course-edit' */ '@/views/course/edit.vue'),
        meta: { requiresAuth: true },
        props: true
      },
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/section.vue'),
        meta: { requiresAuth: true },
        props: true
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import(/* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue')
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: 'error-page' */ '@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.user) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
