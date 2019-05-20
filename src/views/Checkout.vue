<template lang="pug">
#checkout
  Loading(:active.sync="isLoading")
  form(@submit.prevent="checkOut($route.params.orderId)")
    table.products_table.table
      thead
        tr
          th 產品
          th 數量
          th 總價
      tbody
        tr(v-for="product in orderDetail.products"
            :key="product.id")
          td {{ product.product.title }}
          td {{ product.qty }} {{ product.product.unit }}
          td {{ product.final_total | currency }}
      tfoot
        tr
          td
          td 總計
          td.total {{ orderDetail.total | currency }}
    table.customer_info_table.table.table-striped
      tbody
        tr
          th Email
          td {{ orderDetail.user.email }}
        tr
          th 姓名
          td {{ orderDetail.user.name }}
        tr
          th 收件人電話
          td {{ orderDetail.user.tel }}
        tr
          th 收件人地址
          td {{ orderDetail.user.address }}
        tr
          th 付款狀態
          td
            span.undone(v-if="!orderDetail.is_paid") 尚未付款
            span.done(v-else) 付款完成
    .button_box(v-if="!orderDetail.is_paid")
      button.btn_checkout.btn 立即付款
    .button_box(v-else)
      router-link.btn_back.btn(to="/") 回首頁
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['updateLoading']),
    ...mapActions('ordersModule', ['loadOrderDetail', 'checkOut'])
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('ordersModule', ['orderDetail'])
  },
  created () {
    this.updateLoading(true)
    this.loadOrderDetail(this.$route.params.orderId)
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#checkout
  padding: 100px 0 50px 0
  +center_flex
  form
    width: 100%
    +center_flex
    flex-direction: column
    .products_table
      max-width: 700px
      margin: 50px 0
      thead
        tr
          th
            border-bottom: 1px solid rgba(white, 0.8)
            text-align: center
            color: $c_blue
      tbody
        tr
          td
            border-bottom: 1px solid rgba(white, 0.4)
            text-align: center
            color: $c_blue
      tfoot
        tr
          td
            text-align: center
            font-size: 1.2rem
            font-weight: 700
            color: $c_blue
            &.total
              color: $c_red
    .customer_info_table
      max-width: 500px
      tbody
        tr
          th
            border-radius: 10px 0 0 10px
            text-align: center
            font-weight: 500
            color: $c_blue
          td
            border-radius: 0 10px 10px 0
            text-align: center
            .undone
              font-weight: 700
              color: $c_red
            .done
              font-weight: 700
              color: $c_green
    .button_box
      margin: 50px 0
      [class ^= "btn"]
        border-radius: 10px
        color: white
        transition: 0.4s
      .btn_checkout
        background-color: $c_red
        color: white
        &:hover
          background-color: darken($c_red, 20)
      .btn_back
        background-color: $c_green
        color: white
        &:hover
          background-color: darken($c_green, 20)
</style>
