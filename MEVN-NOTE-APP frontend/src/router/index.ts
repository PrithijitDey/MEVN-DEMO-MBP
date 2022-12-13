import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../components/login.vue'
import Register from '../components/register.vue'
import Table from '../components/table.vue'
import Users from '../components/users.vue'
import Notes from '../components/notes.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: { auth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { auth: false }
  },
  {
    path: '/homepage/:username',
    name: 'homepage',
    meta: { auth: true },

    component: () => import('../components/homepage.vue'),
    children: [
      { path: '', name: 'table', component: Table, meta: { auth: true } },
      { path: 'users', name: 'users', component: Users, meta: { auth: true } },
      { path: 'notes', name: 'notes', component: Notes, meta: { auth: true } }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
const user = JSON.parse(<string>localStorage.getItem('userData'))

router.beforeEach(async (to, from, next) => {
  if (to.meta.auth && !localStorage.getItem('userData')) {
    next('/')
  } else if (
    !to.meta.auth &&
    localStorage.getItem('userData') &&
    from.name !== 'login'
  ) {
    next(`/homepage/${user.username}`)

    //  next('/');
    return { name: 'login' }
  } else {
         next();

    return { name: 'login' }
  }
})

export default router
