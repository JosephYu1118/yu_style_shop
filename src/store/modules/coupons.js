import axios from 'axios'

export default {
  namespaced: true,
  state: {
    coupons: []
  },
  mutations: {
    getCoupons (state, payload) {
      state.coupons = payload
    }
  },
  actions: {
    loadCoupons (context, page = 1) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      axios.get(apiUrl).then(response => {
        // console.log(response.data)
        context.commit('getCoupons', response.data.coupons)
        context.commit('getPagination', response.data.pagination, { root: true })
        context.commit('updateLoading', false, { root: true })
      })
    },
    updateCoupon (context, data) {
      const target = [``, `/${data.coupon.id}`, `/${data.coupon.id}`]
      const action = ['post', 'put', 'delete']
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon` + target[data.mode]
      axios[action[data.mode]](apiUrl, { data: data.coupon }).then(response => {
        // console.log(response.data)
        if (response.data.success) {
          context.commit('updateAlertMessages', {
            text: response.data.message,
            status: 'successful'
          }, { root: true })
        } else {
          context.commit('updateAlertMessages', {
            text: response.data.message,
            status: 'unsuccessful'
          }, { root: true })
        }
        $('#coupons_modal').modal('hide')
        context.dispatch('loadCoupons')
      })
    }
  }
}
