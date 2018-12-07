import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/member/Login'
import Home from '@/components/home/Home'
import Register from "@/components/member/Register"
import Product from "@/components/product/Product"
import Order from "@/components/order/Order"

Vue.use(Router);

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
      name: 'Register',
      component: Register
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        name: "跳转主页",
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        {
          path: '/product',
          name: 'Product',
          component: Product
        },
        {
          path: '/order',
          name: 'Order',
          component: Order
        }
      ]
    }
  ]
})

