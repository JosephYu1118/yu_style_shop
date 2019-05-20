<template lang="pug">
#cart_modal.modal.fade(tabindex="-1"
                        role="dialog"
                        aria-hidden="true")
  .modal-dialog.modal-lg(role="document")
    .modal-content
      .modal-header
        h5.modal-title 我的購物車
        button.close(type="button"
                      data-dismiss="modal"
                      aria-label="Close")
          span.text-white(aria-hidden="true") ×
      .modal-body
        table
          thead
            tr
              th(width="80") 縮圖
              th 產品
              th(width="80") 數量
              th(width="80") 售價
              th(width="80") 優惠價
              th(width="10")
          tbody
            .empty(v-if="!cart.length") 購物車是空的!
            tr.item(v-for="item in cart"
                    :key="item.id")
              td.thumbnail(:style="{ 'background-image': `url(${item.product.imageUrl})` }")
              td.title {{ item.product.title }}
              td.quantity x {{ item.qty }} {{ item.product.unit }}
              td.price {{ item.total | currency }}
              td.final_price(v-if="item.total === item.final_total") -
              td.final_price(v-else) {{ item.final_total | currency }}
              td
                button.btn_remove.btn(@click="removeFromCart(item.id)")
                  i.fas.fa-spinner.fa-spin(v-if="loadingItem === item.id")
                  i.far.fa-trash-alt(v-else)
      .modal-footer
        .line_01
          .coupon_box.input-group.input-group-sm
            input.form-control(type="text"
                                placeholder="輸入優惠碼"
                                v-model="coupon_code")
            .input-group-append
              button.btn_use_coupon.btn(type="button"
                                        @click="submitCoupon({ code: coupon_code })")
                span 套用
        .line_02
          .price_box
            .total_box
              span 總計:
              .total {{ getTotal | currency }}
            .total_box(v-if="getTotal !== getFinalTotal")
              span 套用優惠券:
              .total.final {{ getFinalTotal | currency }}
          .button_box
            button.btn_checkout.btn(@click="goCheckout(p_route)") 結帳
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: [
    'p_route'
  ],
  data () {
    return {
      coupon_code: ''
    }
  },
  methods: {
    ...mapActions('shopModule', ['loadCart', 'removeFromCart', 'submitCoupon']),
    goCheckout (route) {
      $('#cart_modal').modal('hide')
      this.$router.push(route)
    }
  },
  computed: {
    ...mapState(['loadingItem']),
    ...mapState('shopModule', ['cart']),
    getTotal () {
      return this.cart.reduce((total, item) => {
        return total + item.total
      }, 0)
    },
    getFinalTotal () {
      return this.cart.reduce((total, item) => {
        return total + item.final_total
      }, 0)
    }
  },
  created () {
    this.loadCart()
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#cart_modal
  .modal-dialog
    .modal-content
      border: 0
      border-radius: 10px
      background-color: darken(white, 5)
      .modal-header
        background-color: $c_blue
        color: white
        +center_flex
        .modal-title
          margin: 0 0 0 10px
      .modal-body
        height: 70vh
        padding: 20px 30px
        overflow: scroll
        table
          width: 100%
          thead
            tr
              th
                padding: 0 0 10px 0
                border-top: 0
                border-bottom: 1px solid rgba(white, 0.8)
                text-align: center
                color: $c_blue
          tbody
            .empty
              font-size: 1.2rem
              font-weight: 700
              +center_position
              top: 300%
            .item
              padding: 10px 0
              border-bottom: 1px solid rgba(black, 0.1)
              text-align: center
              .thumbnail
                +size(90px)
                background-size: 70%
                background-position: center
                background-repeat: no-repeat
              .title
                min-width: 80px
                font-size: 0.9rem
              .quantity, .price, .final_price
                font-size: 0.9rem
                font-weight: 300
                color: rgba($c_blue, 0.8)
              .final_price
                font-weight: 500
                color: $c_red
              .btn_remove
                &:hover
                  i
                    color: darken($c_red, 30)
                i
                  font-size: 1rem
                  color: $c_red
                  transition: 0.4s
      .modal-footer
        +center_flex
        flex-direction: column
        .line_01
          width: 100%
          margin: 0 0 15px 0
          +center_flex(flex-start)
          .coupon_box
            width: 250px
            input
              border-radius: 10px 0 0 10px
              &::placeholder
                font-size: 0.8rem
                color: rgba(black, 0.2)
            .input-group-append
              .btn_use_coupon
                border-radius: 0 10px 10px 0
                background-color: $c_green
                font-size: 0.8rem
                color: white
                transition: 0.4s
                &:hover
                  background-color: darken($c_green, 20)
        .line_02
          width: 100%
          .price_box
            width: 300px
            +center_flex(space-between)
            .total_box
              +center_flex
              span
                margin: 0 10px 0 0
                font-size: 0.9rem
              .total
                font-size: 0.9rem
                font-weight: 700
                color: $c_green
                &.final
                  color: $c_red
          .button_box
            +center_position
            top: 40%
            right: -20px
            left: auto
            .btn_checkout
              border-radius: 10px
              background-color: $c_green
              color: white
              transition: 0.4s
              &:hover
                background-color: darken($c_green, 20)

// ====================
//      RWD
// ==============================

// --------------------
//      MOBILE
// ------------------------------
@media screen and (max-width: 767.98px)
  #cart_modal
    .modal-dialog
      .modal-content
        .modal-footer
          .line_02
            .price_box
              +center_flex(flex-start)
              .total_box
                &:nth-child(1)
                  margin: 0 20px 0 0
            .button_box
              right: -30px
</style>
