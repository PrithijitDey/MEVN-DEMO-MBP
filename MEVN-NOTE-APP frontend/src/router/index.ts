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
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/homepage/:username',
    name: 'homepage',

    component: () => import('../components/homepage.vue'),
    children: [
      { path: '', name: 'table', component: Table },
      { path: 'users', name: 'users', component: Users },
      { path: 'notes', name: 'notes', component: Notes }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
