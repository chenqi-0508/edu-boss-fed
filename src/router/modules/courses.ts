import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteConfig = {
  path: '/',
  component: Layout,
  meta: {
    title: '课程管理'
  },
  children: [
    {
      path: '/course',
      name: 'course',
      component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/course/create',
      name: 'course-create',
      component: () => import(/* webpackChunkName: 'course-create' */ '@/views/course/create.vue'),
      meta: {
        requiresAuth: true,
        title: '创建课程'
      }
    },
    {
      path: '/course/:courseId/edit',
      name: 'course-edit',
      component: () => import(/* webpackChunkName: 'course-edit' */ '@/views/course/edit.vue'),
      meta: {
        requiresAuth: true,
        title: '更新课程'
      },
      props: true
    },
    {
      path: '/course/:courseId/section',
      name: 'course-section',
      component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/section.vue'),
      meta: {
        requiresAuth: true,
        title: '课程内容'
      },
      props: true
    },
    {
      path: '/course/:courseId/video',
      name: 'course-video',
      component: () => import(/* webpackChunkName: 'course-video' */ '@/views/course/video.vue'),
      meta: {
        requiresAuth: true,
        title: '视频上传'
      },
      props: true
    }
  ]
}

export default routes
