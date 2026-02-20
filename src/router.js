import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/components/Login/Login.vue'
import Registration from '@/components/Registration/Registration.vue'
import Courses from '@/components/Courses/Courses.vue'
import CourseInfo from '@/components/CourseInfo/CourseInfo.vue'
import CourseForm from '@/components/CourseForm/CourseForm.vue'

const routes = [
  {
    path: '/login',
    component: Login,
    meta: { public: true }
  },
  {
    path: '/register',
    component: Registration,
    meta: { public: true }
  },
  {
    path: '/courses',
    component: Courses
  },
  {
    path: '/courses/create',
    component: CourseForm
  },
  {
    path: '/courses/update/:id',
    component: CourseForm,
    props: true
  },
  {
    path: '/courses/:id',
    component: CourseInfo,
    props: true
  },
  {
    path: '/',
    redirect: '/courses'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('user')

  if (!to.meta?.public && !isLoggedIn) {
    next('/login')
  } else if (
    (to.path === '/login' || to.path === '/register') &&
    isLoggedIn
  ) {
    next('/courses')
  } else {
    next()
  }
})

export default router