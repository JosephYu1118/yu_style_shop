import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import router from './router'
import productsModule from './store/modules/products'
import couponsModule from './store/modules/coupons'
import ordersModule from './store/modules/orders'
import shopModule from './store/modules/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus: false,
    isLoading: false,
    loadingItem: '',
    pagination: {},
    alertMessages: []
  },
  mutations: {
    getLoginStatus (state, payload) {
      state.loginStatus = payload
    },
    updateLoading (state, payload) {
      state.isLoading = payload
    },
    getLoadingItem (state, payload) {
      state.loadingItem = payload
    },
    getPagination (state, payload) {
      state.pagination = payload
    },
    updateAlertMessages (state, payload) {
      let timestamp = Math.floor(new Date() / 1000)
      state.alertMessages.push({
        text: payload.text,
        status: payload.status,
        timestamp
      })
      setTimeout(() => {
        state.alertMessages.forEach((item, index) => {
          if (item.timestamp === timestamp) {
            state.alertMessages.splice(index, 1)
          }
        })
      }, 5000)
    },
    removeAlertMessage (state, payload) {
      state.alertMessages.splice(payload, 1)
    }
  },
  actions: {
    signIn (context, user) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/admin/signin`
      axios.post(apiUrl, user).then(response => {
        // console.log(response.data)
        if (response.data.success) {
          router.push('/dashboard/products')
        } else {
          context.commit('updateAlertMessages', {
            text: response.data.message,
            status: 'unsuccessful'
          })
        }
      })
    },
    signOut (context) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/logout`
      axios.post(apiUrl).then(response => {
        // console.log(response.data)
        if (response.data.success) {
          router.push('/')
          context.dispatch('checkLoginStatus')
          context.commit('updateAlertMessages', {
            text: response.data.message,
            status: 'successful'
          })
        }
      })
    },
    checkLoginStatus (context) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/user/check`
      axios.post(apiUrl).then(response => {
        // console.log(response.data)
        context.commit('getLoginStatus', response.data.success)
      })
    }
  },
  modules: {
    productsModule, couponsModule, ordersModule, shopModule
  }
})
