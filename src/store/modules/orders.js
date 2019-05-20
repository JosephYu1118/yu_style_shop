import axios from 'axios'

export default {
  namespaced: true,
  state: {
    orders: [],
    orderDetail: {
      products: {},
      user: {}
    }
  },
  mutations: {
    getOrders (state, payload) {
      state.orders = payload
    },
    getOrderDetail (state, payload) {
      state.orderDetail = payload
    }
  },
  actions: {
    loadOrders (context, page = 1) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      axios.get(apiUrl).then(response => {
        // console.log(response.data)
        context.commit('getOrders', response.data.orders)
        context.commit('getPagination', response.data.pagination, { root: true })
        context.commit('updateLoading', false, { root: true })
      })
    },
    updateOrder (context, order) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/order/${order.id}`
      context.commit('updateLoading', true, { root: true })
      axios.put(apiUrl, { data: order }).then(response => {
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
        $('#orders_modal').modal('hide')
        context.dispatch('loadOrders')
      })
    },
    loadOrderDetail (context, id) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${id}`
      axios.get(apiUrl).then(response => {
        // console.log(response.data)
        context.commit('getOrderDetail', response.data.order)
        context.commit('updateLoading', false, { root: true })
      })
    },
    checkOut (context, id) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${id}`
      context.commit('updateLoading', true, { root: true })
      axios.post(apiUrl).then(response => {
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
        context.dispatch('loadOrderDetail', id)
        context.commit('updateLoading', false, { root: true })
      })
    }
  }
}
