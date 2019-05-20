<template lang="pug">
#orders_modal.modal.fade(tabindex="-1"
                          role="dialog"
                          aria-hidden="true")
  .modal-dialog.modal-lg(role="document")
    .modal-content
      .modal-header
        h5.modal-title
          span 訂單資料
        button.close(type="button"
                      data-dismiss="modal"
                      aria-label="Close")
          span.text-white(aria-hidden="true") ×
      .modal-body
        .form-row
          .form-group.col-md-6
            label(for="order_user") 姓名
            input#order_user.form-control(type="text"
                                          placeholder="請輸入姓名"
                                          v-model="p_tempOrder.user.name")
          .form-group.col-md-6
            label(for="order_address") 地址
            input#order_address.form-control(type="text"
                                              placeholder="請輸入地址"
                                              v-model="p_tempOrder.user.address")
        .form-row
          .form-group.col-md-6
            label(for="order_email") Email
            input#order_email.form-control(type="text"
                                            placeholder="請輸入 Email"
                                            v-model="p_tempOrder.user.email")
          .form-group.col-md-6
            label(for="order_tel") 電話
            input#order_tel.form-control(type="text"
                                          placeholder="請輸入電話"
                                          v-model="p_tempOrder.user.tel")
        .demarcation
        table
          thead
            tr
              th 產品
              th 數量
              th 優惠券
              th 價格
          tbody
            tr(v-for="product in p_tempOrder.products"
                :key="product.id")
              td {{ product.product.title }}
              td {{ product.qty }} {{ product.product.unit }}
              td
                span(v-if="product.coupon") {{ product.coupon.title }}
                span(v-else) -
              td {{ product.final_total | currency }}
        .demarcation
        .form-group
          .form-check
            input#order_paid.form-check-input(type="checkbox"
                                              v-model="p_tempOrder.is_paid")
            label.form-check-label(for="order_paid") 完成付款
      .modal-footer
        button.btn_cancel.btn(type="button"
                              data-dismiss="modal") 取消
        button.btn_confirm.btn(type="button"
                                @click="updateOrder(p_tempOrder)") 更新資料
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: [
    'p_tempOrder'
  ],
  data () {
    return {}
  },
  methods: {
    ...mapActions('ordersModule', ['updateOrder'])
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#orders_modal
  .modal-dialog
    .modal-content
      border: 0
      border-radius: 10px
      .modal-header
        background-color: $c_blue
        color: white
        +center_flex
        .modal-title
          margin: 0 0 0 10px
      .modal-body
        label
          margin: 5px
          font-size: 1rem
          &[for="order_paid"]
            margin: 10px 0 0 5px
        input
          border-radius: 10px
          line-height: 150%
          font-size: 0.9rem
          &::placeholder
            font-size: 0.8rem
            color: rgba(black, 0.2)
        .demarcation
          width: 100%
          margin: 20px 0
          border-bottom: 1px dashed rgba(black, 0.3)
        table
          width: 100%
          margin: 0 0 0 15px
          thead
            tr
              th
                text-align: left
                font-weight: 700
                color: $c_blue
          tbody
            tr
              td
                text-align: left
                color: rgba($c_blue, 0.8)
        .form-check
          +center_flex(flex-start)
          margin: 0 0 0 5px
      .modal-footer
        [class ^= "btn"]
          border-radius: 10px
          color: white
          transition: 0.4s
        .btn_cancel
          background-color: $c_red
          &:hover
            background-color: darken($c_red, 20)
        .btn_confirm
          background-color: $c_green
          &:hover
            background-color: darken($c_green, 20)
</style>
