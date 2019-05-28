
const routes = [
  {
    path: '/',
    component: () => import('pages/Auth.vue')
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue')
  },
  {
    path: '/dashboard',
    component: () => import('pages/Dashboard.vue')
  },
  {
    path: '/emptyDashboard',
    component: () => import('pages/EmptyDashboard.vue')
  },
  {
    path: '/task',
    component: () => import('pages/Task.vue')
  },
  {
    path: '/project',
    component: () => import('pages/Project.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
