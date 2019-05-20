<template lang="pug">
#functions_shop
  Loading(:active.sync="isLoading")
  .cards_box
    .product_card(v-for="product in products"
                  :key="product.id")
      .card_img(:style="{ 'background-image': `url(${product.imageUrl})` }")
      .card_content
        .badge {{ product.category }}
        h5.card_title {{ product.title }}
        p.card_text {{ product.description }}
        del.origin_price 原價 {{ product.origin_price | currency }}
        .discount_price 售價 {{ product.price | currency }}
      .card_buttons
        button.btn_more.btn.btn-sm(type="button"
                                    @click="openModal(product.id)")
          i.fas.fa-spinner.fa-spin(v-if="loadingItem === product.id")
          i.fas.fa-list(v-else)
          span 查看更多
        button.btn_add.btn.btn-sm.ml-auto(type="button"
                                          @click="setCart(product.id)")
          i.fas.fa-cart-plus
          span 加入購物車
  Pagination(:p_interface="'shop'")
  ShopModal(@e_setCart="setCart")
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
import ShopModal from '@/components/dashboard/ShopModal'

export default {
  components: {
    Pagination, ShopModal
  },
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['updateLoading']),
    ...mapActions('shopModule', ['loadProductsInShop', 'loadProductDetail', 'addToCart']),
    openModal (id) {
      this.loadProductDetail(id)
      this.$nextTick(() => {
        $('#shop_modal').modal('show')
      })
    },
    setCart (id, qty = 1) {
      let product = {
        product_id: id,
        qty
      }
      this.updateLoading(true)
      this.addToCart(product)
    }
  },
  computed: {
    ...mapState(['isLoading', 'loadingItem']),
    ...mapState('shopModule', ['products'])
  },
  created () {
    this.updateLoading(true)
    this.loadProductsInShop()
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#functions_shop
  padding: 100px 0 50px 0
  +center_flex
  flex-direction: column
  .cards_box
    max-width: 1500px
    +center_flex(center, flex-start)
    flex-wrap: wrap
    .product_card
      +size(18rem, auto, 10px)
      margin: 10px
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
        .badge
          padding: 5px 7.5px
          background-color: rgba(black, 0.5)
          font-weight: 400
          color: white
          +center_position
          top: 1.3rem
          left: 90%
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

// ====================
//      RWD
// ==============================

// --------------------
//      MOBILE
// ------------------------------
@media screen and (max-width: 575.98px)
  #functions_shop
    padding: 50px 0
</style>
