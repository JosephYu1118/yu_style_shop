<template lang="pug">
#product_detail
  .row
    .col-md-5
      .product_img(:style="{ 'background-image': `url(${this.productDetail.imageUrl})` }")
    .col-md-5
      .product_title {{ productDetail.title }}
      del.origin_price 原價 {{ productDetail.origin_price | currency }}
      .discount_price 售價 {{ productDetail.price | currency }}
      .select_box
        select.form-control(name="quantity"
                            v-model.number="productDetail.qty")
          option(value=""
                  disabled) --- 請選擇數量 ---
          option(v-for="num in 10"
                  :key="num"
                  :value="num") 選購 {{ num }} {{ productDetail.unit }}
        i.fas.fa-chevron-down
      .final_price
        span 共
        h6 {{ productDetail.qty * productDetail.price | currency }}
        span 元
      button.btn_add.btn.btn-sm(type="button"
                                @click="setCart(productDetail.id, productDetail.qty)")
        i.fas.fa-spinner.fa-spin(v-if="loadingItem === productDetail.id")
        i.fas.fa-cart-plus(v-else)
        span 加入購物車
  .row
    .col-md-10
      label 產品描述
      .product_description {{ productDetail.description }}
      label 產品內容
      .product_content {{ productDetail.content }}
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['getLoadingItem', 'updateAlertMessages']),
    ...mapActions('shopModule', ['addToCart', 'loadProductDetail']),
    setCart (id, qty) {
      if (!qty) {
        this.updateAlertMessages({
          text: '請選擇購買數量',
          status: 'unsuccessful'
        })
      } else {
        let product = {
          product_id: id,
          qty
        }
        this.getLoadingItem(id)
        this.addToCart(product)
      }
    }
  },
  computed: {
    ...mapState(['loadingItem']),
    ...mapState('shopModule', ['productDetail'])
  },
  created () {
    this.loadProductDetail(this.$route.params.productId)
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#product_detail
  min-height: 100vh
  .row
    max-width: 1500px
    margin: 0 auto
    .col-md-5
      background-color: darken(white, 5)
      +center_flex(center, flex-start)
      flex-direction: column
      &:nth-child(1)
        margin: 0 0 0 auto
        border-radius: 10px 0 0 10px
      &:nth-child(2)
        margin: 0 auto 0 0
        border-radius: 0 10px 10px 0
      .product_img
        +size(300px)
        background-size: 80%
        background-position: center
        background-repeat: no-repeat
        align-self: center
      .product_title
        margin: 20px 0
        font-size: 1.5rem
        font-weight: 700
      .origin_price
        font-size: 0.8rem
        color: rgba(black, 0.3)
      .discount_price
        font-size: 1.1rem
        font-weight: 700
        color: $c_red
      .select_box
        margin: 20px 0
        .form-control
          +size(200px, 40px, 10px)
          padding: 5px 15px
          appearance: none
          cursor: pointer
        i
          font-size: 0.9rem
          +center_position
          right: 5px
          left: auto
          pointer-events: none
      .final_price
        +center_flex
        span
          margin: 0 5px
          font-size: 1.2rem
          &:last-child
            margin: 0 30px 0 5px
        h6
          font-size: 1.2rem
          font-weight: 700
          color: $c_red
      .btn_add
        margin: 20px 15px 20px 0
        padding: 5px 15px
        border: 1px solid $c_red
        border-radius: 10px
        background-color: $c_red
        font-size: 1rem
        color: white
        align-self: flex-end
        transition: 0.4s
        &:hover
          background-color: transparent
          color: $c_red
        i
          margin: 0 5px 0 0
    .col-md-10
      margin: 50px auto 0 auto
      padding: 50px
      border-radius: 10px
      background-color: darken(white, 5)
      +center_flex(center, flex-start)
      flex-direction: column
      label
        margin: 10px 0
        font-size: 1.3rem
        font-weight: 500
      [class ^= "product"]
        width: 90%
        word-break: break-all
        font-weight: 300
      .product_description
        margin: 0 0 20px 0

// ====================
//      RWD
// ==============================

// --------------------
//      MOBILE
// ------------------------------
@media screen and (max-width: 767.98px)
  #product_detail
    .row
      .col-md-5
        &:nth-child(1)
          border-radius: 10px 10px 0 0
        &:nth-child(2)
          border-radius: 0 0 10px 10px
</style>
