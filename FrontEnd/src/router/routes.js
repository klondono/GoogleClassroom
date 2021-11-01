import Login from 'pages/Login.vue';
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    name: 'Classroom',
    path: '/Classroom',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Courses/Courses.vue') },
      { name: 'Course', path: '/Course', component: () => import('pages/Courses/Course.vue') },
      { name: 'Assignments', path: '/Assignments', component: () => import('pages/Assignments/Assignments.vue') },
      { name: 'Topics', path: '/Topics', component: () => import('pages/Topics/Topics.vue') }
    ],
    meta: { requiresAuth: true }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
    meta: { requiresAuth: false }
  }
]

export default routes
