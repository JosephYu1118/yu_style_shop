import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
    productDetail: {},
    cart: [],
    allProductsData: [],
    category: ''
  },
  mutations: {
    getProductsInShop (state, payload) {
      state.products = payload
    },
    getProductDetail (state, payload) {
      state.productDetail = payload
    },
    getCart (state, payload) {
      state.cart = payload
    },
    getAllProductsData (state, payload) {
      payload.forEach(product => {
        state.allProductsData.push(product)
      })
    },
    setCategory (state, payload) {
      if (payload === '全部') {
        state.category = ''
      } else {
        state.category = payload
      }
    }
  },
  actions: {
    loadProductsInShop (context, page = 1) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      axios.get(apiUrl).then(response => {
        // console.log(response.data)
        context.commit('getProductsInShop', response.data.products)
        context.commit('getPagination', response.data.pagination, { root: true })
        context.commit('updateLoading', false, { root: true })
      })
    },
    loadProductDetail (context, id) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      context.commit('getLoadingItem', id, { root: true })
      axios.get(apiUrl).then(response => {
        // console.log(response.data)
        context.commit('getProductDetail', response.data.product)
        context.commit('getLoadingItem', '', { root: true })
      })
    },
    loadCart (context) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.get(apiUrl).then(response => {
        // console.log(response.data)
        context.commit('getCart', response.data.data.carts.reverse())
        context.commit('updateLoading', false, { root: true })
        context.commit('getLoadingItem', '', { root: true })
      })
    },
    addToCart (context, product) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      axios.post(apiUrl, { data: product }).then(response => {
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
        $('#shop_modal').modal('hide')
        context.dispatch('loadCart')
      })
    },
    removeFromCart (context, id) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('getLoadingItem', id, { root: true })
      axios.delete(apiUrl).then(response => {
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
        context.dispatch('loadCart')
      })
    },
    submitCoupon (context, coupon) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      axios.post(apiUrl, { data: coupon }).then(response => {
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
        context.dispatch('loadCart')
      })
    },
    loadAllProductsData (context, page = 1) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      let numberOfPages = 0
      axios.get(apiUrl).then(response => {
        numberOfPages = response.data.pagination.total_pages
        context.commit('getAllProductsData', response.data.products)
      }).then(() => {
        if (page < numberOfPages) {
          context.dispatch('loadAllProductsData', ++page)
        }
      })
    }
  }
}
