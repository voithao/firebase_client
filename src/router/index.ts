import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import {getCurrentUser} from '@/firebaseConfig'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/products',
    name: 'Proudcts',
    component: () => import('@/views/Products.vue'),
    meta: {
      authRequred: true
    }
  },{
    path: '/register',
    name: 'Register',
    component: () => import('@/views/user/Register.vue')
  },{
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/user/Login.vue')
  },{
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/Login.vue')
  },{
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/user/Logout.vue')
  },{
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: {
      authRequred: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  await getCurrentUser()
  if (to.matched.some(record => record.meta.authRequred)) {
    // eslint-disable-next-line
    if (!(store.state as any).user || !(store.state as any).user.user) {
      next({
        path: '/login', 
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
