<template lang="pug">
#shop_modal.modal.fade(tabindex="-1"
                        role="dialog"
                        aria-hidden="true")
  .modal-dialog.modal-lg(role="document")
    .modal-content
      .modal-header
        h5.modal-title {{ productDetail.title }}
        button.close(type="button"
                      data-dismiss="modal"
                      aria-label="Close")
          span.text-white(aria-hidden="true") ×
      .modal-body
        .product_img(:style="{ 'background-image': `url(${this.productDetail.imageUrl})` }")
        .product_description {{ productDetail.description }}
        .product_content {{ productDetail.content }}
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
      .modal-footer
        .total_price
          span 共
          h6 {{ productDetail.qty * productDetail.price | currency }}
          span 元
        button.btn_add.btn.btn-sm(type="button"
                                  @click="setCart(productDetail.id, productDetail.qty)")
          i.fas.fa-spinner.fa-spin(v-if="loadingItem === productDetail.id")
          i.fas.fa-cart-plus(v-else)
          span 加入購物車
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['getLoadingItem']),
    setCart (id, qty = 1) {
      this.getLoadingItem(id)
      this.$emit('e_setCart', id, qty)
    }
  },
  computed: {
    ...mapState(['loadingItem']),
    ...mapState('shopModule', ['productDetail'])
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#shop_modal
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
        padding: 20px
        +center_flex(center, flex-start)
        flex-direction: column
        .product_img
          +size(100%, 300px)
          max-width: 400px
          margin: 10px 0
          background-size: 70%
          background-position: center
          background-repeat: no-repeat
          align-self: center
        .product_description
          width: 90%
          margin: 20px 0 10px 0
          word-break: break-all
          font-size: 1rem
          font-weight: 500
        .product_content
          width: 90%
          word-break: break-all
          font-size: 0.9rem
          font-weight: 300
          color: rgba(black, 0.7)
        .origin_price
          margin: 20px 0 0 0
          font-size: 0.8rem
          color: rgba(black, 0.3)
        .discount_price
          margin: 0 0 20px 0
          font-weight: 700
          color: $c_red
        .select_box
          .form-control
            +size(250px, 40px, 10px)
            padding: 5px 15px
            appearance: none
            cursor: pointer
          i
            font-size: 0.9rem
            +center_position
            right: 5px
            left: auto
            pointer-events: none
      .modal-footer
        .total_price
          +center_flex
          span
            margin: 0 5px
            &:last-child
              margin: 0 30px 0 5px
          h6
            color: $c_red
        .btn_add
          border: 1px solid $c_red
          border-radius: 10px
          background-color: $c_red
          color: white
          transition: 0.4s
          &:hover
            background-color: transparent
            color: $c_red
          i
            margin: 0 5px 0 0
</style>
