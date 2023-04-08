import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../libs/authentication.js'
import HomeView from '../views/HomeView.vue'
import LoginView from "../views/LoginView.vue"
import Dashboard from "../views/Dashboard.vue"

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
    children: [
      {
        path: '',
        name: "Dashboard",
        beforeEnter: [authCheck],
        component: HomeView,
      },
      {
        path: '/profile',
        name: 'Profile',
        beforeEnter: [authCheck],
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      }
    ],
  }
]

function authCheck(to) {
  if (isAuthenticated() === false) return { path: '/login' } 
  else return true
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
