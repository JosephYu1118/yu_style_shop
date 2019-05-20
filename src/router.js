import Vue from 'vue'
import Router from 'vue-router'

import YuStyleShop from './views/YuStyleShop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
      // 防止使用者進入不存在的網址頁面
    }, {
      path: '/',
      component: YuStyleShop,
      children: [
        {
          path: '/',
          name: 'Home',
          component: () => import('./views/yustyleshop/Home')
        }, {
          path: '/',
          component: () => import('./views/yustyleshop/Framework'),
          children: [
            {
              path: 'yustyleshop',
              name: 'YuStyleShop',
              component: () => import('./views/yustyleshop/Shop')
            }, {
              path: 'yustyleshop/:productId',
              name: 'ProductDetail',
              component: () => import('./views/yustyleshop/ProductDetail')
            }
          ]
        }, {
          path: 'customerinfo',
          name: 'CustomerInfo',
          component: () => import('./views/CustomerInfo')
        }, {
          path: 'checkout/:orderId',
          name: 'Checkout',
          component: () => import('./views/Checkout')
        }, {
          path: 'campaign',
          name: 'Campaign',
          component: () => import('./views/yustyleshop/Campaign')
        }, {
          path: 'contact',
          name: 'Contact',
          component: () => import('./views/yustyleshop/Contact')
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: () => import('./views/Login')
    }, {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('./views/Dashboard'),
      children: [
        {
          path: 'products',
          name: 'Products',
          component: () => import('./views/dashboard/Products'),
          meta: { requiresAuth: true }
        }, {
          path: 'coupons',
          name: 'Coupons',
          component: () => import('./views/dashboard/Coupons'),
          meta: { requiresAuth: true }
        }, {
          path: 'orders',
          name: 'Orders',
          component: () => import('./views/dashboard/Orders'),
          meta: { requiresAuth: true }
        }
      ]
    }, {
      path: '/functions',
      name: 'Functions',
      component: () => import('./views/Dashboard'),
      children: [
        {
          path: 'shop',
          name: 'Functions/Shop',
          component: () => import('./views/dashboard/Shop')
        }, {
          path: 'customerinfo',
          name: 'Functions/CustomerInfo',
          component: () => import('./views/CustomerInfo')
        }, {
          path: 'checkout/:orderId',
          name: 'Functions/Checkout',
          component: () => import('./views/Checkout')
        }
      ]
    }
  ]
})
