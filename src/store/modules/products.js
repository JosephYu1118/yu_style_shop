import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: []
  },
  mutations: {
    getProducts (state, payload) {
      state.products = payload
    }
  },
  actions: {
    loadProducts (context, page = 1) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      axios.get(apiUrl).then(response => {
        // console.log(response.data)
        context.commit('getProducts', response.data.products)
        context.commit('getPagination', response.data.pagination, { root: true })
        context.commit('updateLoading', false, { root: true })
      })
    },
    updateProduct (context, data) {
      const target = [``, `/${data.product.id}`, `/${data.product.id}`]
      const action = ['post', 'put', 'delete']
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product` + target[data.mode]
      axios[action[data.mode]](apiUrl, { data: data.product }).then(response => {
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
        $('#products_modal').modal('hide')
        context.dispatch('loadProducts')
      })
    }
  }
}
