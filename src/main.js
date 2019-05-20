import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VeeValidate, { Validator } from 'vee-validate'
import zhTWValidate from 'vee-validate/dist/locale/zh_TW'

import App from './App.vue'
import router from './router'
import store from './store'
import currency from './filters/currency'

Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true

Validator.localize('zh_TW', zhTWValidate)
Vue.use(VeeValidate, {
  locale: 'zh_TW',
  events: 'input|blur'
})

Vue.component('Loading', Loading)
Vue.filter('currency', currency)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // console.log('需要驗證')
    const apiUrl = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(apiUrl).then(response => {
      // console.log(response.data)
      if (response.data.success) {
        // console.log('驗證成功')
        next()
      } else {
        // console.log('驗證失敗')
        next({
          path: '/login'
        })
      }
    })
  } else {
    // console.log('不需要驗證')
    next()
  }
})
