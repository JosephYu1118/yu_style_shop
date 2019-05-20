<template lang="pug">
#coupons_modal.modal.fade(tabindex="-1"
                          role="dialog"
                          aria-hidden="true")
  .modal-dialog.modal-lg(role="document")
    .modal-content
      .modal-header
        h5.modal-title
          slot(name="title")
            span 新增優惠券
        button.close(type="button"
                      data-dismiss="modal"
                      aria-label="Close")
          span.text-white(aria-hidden="true") ×
      .modal-body
        slot(name="body"
              :p_tempCoupon="p_tempCoupon")
          .form-group
            label(for="coupon_title") 優惠券名稱
            input#coupon_title.form-control(type="text"
                                            placeholder="請輸入優惠券名稱"
                                            v-model="p_tempCoupon.title")
          .form-row
            .form-group.col-md-6
              label(for="code") 優惠碼
              input#code.form-control(type="text"
                                      placeholder="請輸入優惠碼"
                                      v-model="p_tempCoupon.code")
            .form-group.col-md-6
              label(for="discount") 折扣
              input#discount.form-control(type="number"
                                          placeholder="請輸入折扣"
                                          v-model="p_tempCoupon.percent")
          .form-row
            .form-group.col-md-6
              label(for="start_date") 啟用日期
              input#start_date.form-control(type="date"
                                            placeholder="請輸入啟用日期"
                                            v-model="p_tempCoupon.start_date")
            .form-group.col-md-6
              label(for="due_date") 使用期限
              input#due_date.form-control(type="date"
                                          placeholder="請輸入使用期限"
                                          v-model="p_tempCoupon.due_date")
          .form-group
            .form-check
              input#coupon_enabled.form-check-input(type="checkbox"
                                                    v-model="p_tempCoupon.is_enabled"
                                                    :true-value="1"
                                                    :false-value="0")
              label.form-check-label(for="coupon_enabled") 是否啟用
      .modal-footer
        button.btn_cancel.btn(type="button"
                              data-dismiss="modal") 取消
        button.btn_confirm.btn(type="button"
                                @click="setCoupon()") 確認
</template>

<script>
export default {
  props: [
    'p_tempCoupon'
  ],
  data () {
    return {}
  },
  methods: {
    setCoupon () {
      this.$emit('e_setCoupon', this.p_tempCoupon)
    }
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#coupons_modal
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
          &[for="coupon_enabled"]
            margin: 10px 0 0 5px
        input
          border-radius: 10px
          line-height: 150%
          font-size: 0.9rem
          &::placeholder
            font-size: 0.8rem
            color: rgba(black, 0.2)
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
