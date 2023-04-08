import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../libs/authentication.js'
import HomeView from '../views/HomeView.vue'
import LoginView from "../views/LoginView.vue"
import SignUpView from "../views/SignUpView.vue"
import Dashboard from "../views/Dashboard.vue"

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    beforeEnter: [guestOnly],
    meta: { title: 'Login - KrewsUI' },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUpView,
    beforeEnter: [guestOnly],
    meta: { title: 'SignUp - KrewsUI' },
  },
  {
    path: '/',
    name: 'Home',
    component: Dashboard,
    meta: { title: 'KrewsUI' },
    children: [
      {
        path: '',
        name: "Dashboard",
        beforeEnter: [authCheck],
        component: HomeView,
        meta: { title: 'Dashboard - KrewsUI' },
      },
      {
        path: '/profile',
        name: 'Profile',
        beforeEnter: [authCheck],
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
        meta: { title: 'Profile - KrewsUI' },
      }
    ],
  }
]

function authCheck(to) {
  if (isAuthenticated() === false) return { path: '/login' } 
  else return true
}
function guestOnly(to, from) {
  if (isAuthenticated() === false) return true
  else return { path: from.path } 
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router
