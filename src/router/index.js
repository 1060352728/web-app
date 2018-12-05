import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/member/Login'
import Home from '@/components/home/Home'
import Register from "@/components/member/Register";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: '',
      component: Register
    },
    {
      path: '/home',
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      name: 'Home',
      component: Home
    }
  ]
})

