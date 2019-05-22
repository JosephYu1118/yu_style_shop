<template lang="pug">
#orders
  Loading(:active.sync="isLoading")
  table.table.mt-4
    thead
      tr
        th 顧客
        th 款項
        th 下單日期
        th 付款日期
        th 付款狀態
        th
    tbody
      tr(v-for="order in orders"
          :key="order.id")
        td.text-nowrap {{ order.user.name }}
        td {{ order.total | currency }}
        td
          span {{ getDate(order.create_at) }}
        td
          span(v-if="order.is_paid") {{ getDate(order.paid_date) }}
          span(v-else) -
        td
          i.fas.fa-check(v-if="order.is_paid")
          i.fas.fa-times(v-else)
        td
          button.btn_check.btn.btn-sm.text-nowrap(@click="openModal(order)") 查看訂單
  Pagination(:p_interface="'orders'")
  OrdersModal(:p_tempOrder="orderData")
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
import OrdersModal from '@/components/dashboard/OrdersModal'

export default {
  components: {
    Pagination, OrdersModal
  },
  data () {
    return {
      orderData: {
        products: {},
        user: {}
      }
    }
  },
  methods: {
    ...mapMutations(['updateLoading']),
    ...mapActions('ordersModule', ['loadOrders']),
    openModal (order) {
      this.orderData = Object.assign({}, order)
      this.$nextTick(() => {
        $('#orders_modal').modal('show')
      })
    },
    getDate (timestamp) {
      const date = new Date()
      date.setTime(timestamp * 1000)
      return date.toLocaleDateString()
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('ordersModule', ['orders'])
  },
  created () {
    this.updateLoading(true)
    this.loadOrders()
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#orders
  padding: 100px 0 50px 0
  +center_flex
  flex-direction: column
  table
    max-width: 1500px
    thead
      tr
        th
          border-top: 0
          border-bottom: 1px solid rgba(white, 0.8)
          text-align: center
          color: $c_blue
    tbody
      tr
        td
          border-bottom: 1px solid rgba(white, 0.4)
          text-align: center
          line-height: 200%
          .fa-check
            color: $c_green
          .fa-times
            color: $c_red
          .btn_check
            border-radius: 10px
            border-color: $c_green
            color: $c_green
            transition: 0.4s
            &:hover
              background-color: $c_green
              color: white

// ====================
//      RWD
// ==============================

// --------------------
//      LARGE MOBILE
// ------------------------------
@media screen and (max-width: 575.98px)
  #orders
    padding: 50px 0
    table
      thead
        tr
          th
            &:nth-child(3), &:nth-child(4)
              display: none
      tbody
        tr
          td
            &:nth-child(3), &:nth-child(4)
              display: none
</style>
