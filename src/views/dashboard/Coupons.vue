<template lang="pug">
#coupons
  Loading(:active.sync="isLoading")
  button.btn_add_coupon.btn(@click="openModal(0)")
    i.fas.fa-plus
    span 新增優惠券
  .coupons.mt-4
    .coupon_ticket(v-for="coupon in coupons"
                    :key="coupon.id")
      .ticket_stub(:style="getStubColor(coupon.is_enabled)")
        .spikes
          .spike(v-for="num in 10")
        .buttons_box
          button.btn.btn-sm(@click="openModal(1, coupon)")
            i.fas.fa-pencil-alt
          .demarcation
          button.btn.btn-sm(@click="openModal(2, coupon)")
            i.far.fa-trash-alt
      .ticket_body
        .ticket_body_sharp
        .ticket_body_cut.ticket_body_cut_1
        .ticket_body_cut.ticket_body_cut_2
        .ticket_body_tail
        .ticket_content
          .ticket_discount {{ coupon.percent / 10 }} 折
          .ticket_title {{ coupon.title }}
          .code_box
            h5 code
            h5.ticket_code {{ coupon.code }}
          .date_box
            .dash ―
            .date_head
              h5 啟用日期
              h5 使用期限
            .date_body
              h5.start_date {{ coupon.start_date }}
              h5.due_date {{ coupon.due_date }}
  Pagination(:p_interface="'coupons'")
  CouponsModal(:p_tempCoupon="couponData"
                @e_setCoupon="setCoupon"
                v-if="mode === 2")
    template(#title="slotProps")
      span 刪除優惠券
    template(#body="slotProps")
      | 是否刪除優惠券:
      strong.text-danger  {{ slotProps.p_tempCoupon.title }}
      p (刪除後將無法恢復)
  CouponsModal(:p_tempCoupon="couponData"
                @e_setCoupon="setCoupon"
                v-if="mode === 1")
    template(#title="slotProps")
      span 編輯優惠券
  CouponsModal(:p_tempCoupon="couponData"
                @e_setCoupon="setCoupon"
                v-if="mode === 0")
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
import CouponsModal from '@/components/dashboard/CouponsModal'

export default {
  components: {
    Pagination, CouponsModal
  },
  data () {
    return {
      couponData: {},
      mode: -1
    }
  },
  methods: {
    ...mapMutations(['updateLoading']),
    ...mapActions('couponsModule', ['loadCoupons', 'updateCoupon']),
    getStubColor (isEnabled) {
      if (isEnabled) {
        return { 'background-color': '#4f9da6' }
      } else {
        return { 'background-color': '#ff5959' }
      }
    },
    openModal (num, coupon) {
      this.mode = num
      if (this.mode === 0) {
        this.couponData = {}
      } else if (this.mode !== 0) {
        this.couponData = Object.assign({}, coupon)
      }
      this.$nextTick(() => {
        $('#coupons_modal').modal('show')
      })
    },
    setCoupon (coupon) {
      this.couponData = coupon
      this.updateLoading(true)
      let data = {
        coupon: this.couponData,
        mode: this.mode
      }
      this.updateCoupon(data)
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('couponsModule', ['coupons'])
  },
  created () {
    this.updateLoading(true)
    this.loadCoupons()
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#coupons
  padding: 100px 0 50px 0
  +center_flex
  flex-direction: column
  .btn_add_coupon
    border-radius: 10px
    background-color: $c_green
    color: white
    align-self: flex-end
    transition: 0.4s
    &:hover
      background-color: darken($c_green, 20)
    i
      margin: 0 5px 0 0
      font-size: 0.9rem
  .coupons
    max-width: 1500px
    +center_flex(center, flex-start)
    flex-wrap: wrap
    .coupon_ticket
      +size(370px, 200px, 10px)
      margin: 10px 20px
      overflow: hidden
      .ticket_stub
        +size(25%, 100%)
        position: absolute
        right: 0
        .spikes
          margin: 0 0 0 -15px
          position: absolute
          left: 0
          .spike
            +size(20px)
            background-color: lighten($c_yellow, 10)
            transform: rotate(45deg)
        .buttons_box
          +center_position
          +center_flex
          flex-direction: column
          .btn
            border-radius: 50%
            &:hover
              i
                color: white
            i
              font-size: 1.1rem
              color: $c_blue
              transition: 0.4s
          .demarcation
            width: 200%
            margin: 30px 0
            border-bottom: 1px dashed rgba(black, 0.3)
            transform: translate(3px, 0)
      .ticket_body
        +size(75%, 100%)
        background-color: lighten($c_yellow, 10)
        position: absolute
        &_cut
          +size(30px, 30px * 0.5)
          background-color: $c_white
          position: absolute
          left: 20%
          z-index: 5
          &_1
            border-radius: 0 0 100px 100px
            border-top: 0
            top: -1%
          &_2
            border-radius: 100px 100px 0 0
            border-bottom: 0
            bottom: -1%
        &_tail
          +size(20px, 100%)
          background-color: $c_blue
          position: absolute
          left: 0
        .ticket_content
          +center_position
          left: 55%
          +center_flex
          flex-direction: column
          .ticket_discount
            font-size: 2rem
            font-weight: 700
            color: $c_red
          .ticket_title
            margin: 5px 0 0 0
            font-size: 1.2rem
            font-weight: 700
          .code_box
            margin: 15px 0
            +center_flex
            h5
              padding: 4px 12px
              border-radius: 10px 0 0 10px
              background-color: $c_blue
              font-size: 0.8rem
              color: white
            .ticket_code
              border-radius: 0 10px 10px 0
              background-color: white
              color: $c_blue
          .date_box
            +center_flex
            flex-direction: column
            .dash
              +center_position
            .date_head, .date_body
              +center_flex
              h5
                width: 120px
                font-size: 0.5rem
                font-weight: 300
                color: $c_blue
                +center_flex
            .date_body
              margin: 3px 0
              h5
                font-size: 0.8rem
                font-weight: 500
              .due_date
                color: $c_red

// ====================
//      RWD
// ==============================

// --------------------
//      LARGE MOBILE
// ------------------------------
@media screen and (max-width: 575.98px)
  #coupons
    padding: 50px 0
    .coupons
      .coupon_ticket
        margin: 10px 0
        transform: scale(0.9)
</style>
