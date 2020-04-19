import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Proudcts from '../views/Products.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/products',
    name: 'Proudcts',
    component: Proudcts,
    meta: {
      authRequred: true
    }
  },{
    path: '/register',
    name: 'Register',
    component: Register
  },{
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/logout',
    name: 'Logout',
    component: Logout
  },{
    path: '/admin',
    name: 'Admin',
    component: Admin,
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequred)) {
    if (!store.state.user) {
      next({
        path: '/signin',
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
