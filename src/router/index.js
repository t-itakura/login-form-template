import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/Login.vue'
import Top from '@/Top.vue'
import auth from '@/auth.js'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/top',
    name: 'Top',
    component: Top
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  auth.onAuth();
  let currentUserStatus = store.getters['isSignedIn'];
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(!requiresAuth) {
    next()
  }else if (requiresAuth && !currentUserStatus){
    next('')
  }else{
    next()
  }
})


export default router


