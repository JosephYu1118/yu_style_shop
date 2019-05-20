<template lang="pug">
#shop
  .cards_box
    .product_card(v-for="(product, p_id) in getFilteredProducts")
      .card_img(:style="{ 'background-image': `url(${product.imageUrl})` }")
      .card_content
        h5.card_title {{ product.title }}
        p.card_text {{ product.description }}
        del.origin_price 原價 {{ product.origin_price | currency }}
        .discount_price 售價 {{ product.price | currency }}
      .card_buttons
        button.btn_more.btn.btn-sm(type="button"
                                    @click="setProductDetail(product.id)")
          i.fas.fa-spinner.fa-spin(v-if="loadingItem === product.id")
          i.fas.fa-list(v-else)
          span 了解更多
        button.btn_add.btn.btn-sm.ml-auto(type="button"
                                          @click="setCart(product.id)")
          i.fas.fa-cart-plus
          span 加入購物車
  Pagination.onlyOne(:p_interface="'shop'")
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'

export default {
  components: {
    Pagination
  },
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['updateLoading', 'getLoadingItem']),
    ...mapActions('shopModule', ['loadProductsInShop', 'loadProductDetail', 'addToCart', 'loadAllProductsData']),
    setCart (id, qty = 1) {
      let product = {
        product_id: id,
        qty
      }
      this.updateLoading(true)
      this.addToCart(product)
    },
    setProductDetail (id) {
      this.getLoadingItem(id)
      this.loadProductDetail(id)
      this.$router.push(`/yustyleshop/${id}`)
    }
  },
  computed: {
    ...mapState(['loadingItem']),
    ...mapState('shopModule', ['productDetail', 'products', 'allProductsData', 'category']),
    getFilteredProducts () {
      if (!this.category) {
        return this.products
      } else if (this.category === '其他') {
        return this.allProductsData.filter(product => {
          return product.category === '鞋子' ||
            product.category === '帽子' ||
            product.category === '背包' ||
            product.category === '襪子' ||
            product.category === '眼鏡'
        })
      } else {
        return this.allProductsData.filter(product => {
          return product.category === this.category
        })
      }
    }
  },
  watch: {
    category () {
      if (!this.category) {
        $('.onlyOne').css('opacity', '1')
      } else {
        $('.onlyOne').css('opacity', '0')
      }
    }
  },
  created () {
    this.updateLoading(true)
    this.loadProductsInShop()
    this.loadAllProductsData()
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#shop
  min-height: 100vh
  +center_flex(flex-start)
  flex-direction: column
  .cards_box
    max-width: 1500px
    +center_flex(center, flex-start)
    flex-wrap: wrap
    .product_card
      +size(18rem, auto, 10px)
      margin: 20px
      padding: 15px 20px
      background-color: darken(white, 5)
      +center_flex
      flex-direction: column
      box-shadow: 5px 10px 20px rgba(black, 0.1)
      transition: 0.4s
      &:hover
        transform: translate(-2px, -2px)
        box-shadow: 5px 10px 25px rgba(black, 0.2)
      .card_img
        +size(100%, 200px)
        background-size: 70%
        background-position: center
        background-repeat: no-repeat
      .card_content
        width: 100%
        +center_flex(center, flex-start)
        flex-direction: column
        .card_title
          margin: 10px 0
        .card_text
          margin: 10px 0
          word-break: break-all
          font-size: 0.9rem
          font-weight: 300
          color: rgba(black, 0.7)
        .origin_price
          margin: 10px 0 0 0
          font-size: 0.8rem
          color: rgba(black, 0.3)
        .discount_price
          margin: 0 0 20px 0
          font-weight: 700
          color: $c_red
      .card_buttons
        width: 100%
        +center_flex
        [class ^= "btn"]
          border-radius: 10px
          background-color: transparent
          transition: 0.4s
          &:hover
            color: white
          i
            margin: 0 5px 0 0
        .btn_more
          border: 1px solid $c_green
          color: $c_green
          &:hover
            background-color: $c_green
        .btn_add
          border: 1px solid $c_red
          color: $c_red
          &:hover
            background-color: $c_red
</style>
