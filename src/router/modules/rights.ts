import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteConfig = {
  path: '/',
  component: Layout,
  meta: {
    title: '权限管理'
  },
  children: [
    {
      path: '/role',
      name: 'role',
      component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
      meta: {
        requiresAuth: true,
        title: '角色管理'
      }
    },
    {
      path: '/role/:roleId/alloc-menu',
      name: 'alloc-menu',
      component: () => import(/* webpackChunkName: 'alloc-menu' */ '@/views/role/alloc-menu.vue'),
      meta: {
        requiresAuth: true,
        title: '分配菜单'
      },
      props: true
    },
    {
      path: '/role/:roleId/alloc-resource',
      name: 'alloc-resource',
      component: () => import(/* webpackChunkName: 'alloc-resource' */ '@/views/role/alloc-resource.vue'),
      meta: {
        requiresAuth: true,
        title: '分配资源'
      },
      props: true
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
      meta: {
        requiresAuth: true,
        title: '菜单管理'
      }
    },
    {
      path: '/menu/create',
      name: 'menu-create',
      component: () => import(/* webpackChunkName: 'menu-create' */ '@/views/menu/create.vue'),
      meta: {
        requiresAuth: true,
        title: '创建菜单'
      }
    },
    {
      path: '/menu/:id/edit',
      name: 'menu-edit',
      component: () => import(/* webpackChunkName: 'menu-edit' */ '@/views/menu/edit.vue'),
      meta: {
        requiresAuth: true,
        title: '更新菜单'
      }
    },
    {
      path: '/resource',
      name: 'resource',
      component: () => import(/* webpackChunkName: 'resource' */ '@/views/resource/index.vue'),
      meta: {
        requiresAuth: true,
        title: '资源管理'
      }
    }
  ]
}

export default routes
