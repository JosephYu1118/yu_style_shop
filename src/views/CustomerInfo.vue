<template lang="pug">
#customer_info
  h3 請填入訂單資料
  form(@submit.prevent="createOrder()")
    .form-group
      label(for="email") Email
      input#email.form-control(type="email"
                                name="email"
                                placeholder="請輸入 email"
                                autofocus
                                v-model="form.user.email"
                                v-validate="'required|email'"
                                :class="{ invalid: errors.has('email') }")
      span(v-if="errors.has('email')") {{ errors.first('email') }}
    .form-group
      label(for="username") 收件人姓名
      input#username.form-control(type="text"
                                  name="name"
                                  placeholder="請輸入姓名"
                                  v-model="form.user.name"
                                  v-validate="'required'"
                                  :class="{ invalid: errors.has('name') }")
      span(v-if="errors.has('name')") 必須輸入收件人姓名。
    .form-group
      label(for="tel") 收件人電話
      input#tel.form-control(type="tel"
                              name="tel"
                              placeholder="請輸入電話"
                              v-model="form.user.tel"
                              v-validate="'required'"
                              :class="{ invalid: errors.has('tel') }")
      span(v-if="errors.has('tel')") 必須輸入收件人電話。
    .form-group
      label(for="address") 收件人地址
      input#address.form-control(type="text"
                                  name="address"
                                  placeholder="請輸入地址"
                                  v-model="form.user.address"
                                  v-validate="'required'"
                                  :class="{ invalid: errors.has('address') }")
      span(v-if="errors.has('address')") 必須輸入收件人地址。
    .form-group
      label(for="comment") 留言
      textarea#comment.form-control(name=""
                                    cols="30"
                                    rows="5"
                                    v-model="form.message")
    .text-right.mt-5
      button.btn_submit.btn 送出訂單
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    ...mapMutations(['updateAlertMessages']),
    createOrder () {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$http.post(apiUrl, { data: this.form }).then(response => {
            // console.log(response.data)
            if (response.data.success) {
              this.updateAlertMessages({
                text: response.data.message,
                status: 'successful'
              })
              this.$nextTick(() => {
                if (this.$route.path === '/customerinfo') {
                  this.$router.push(`/checkout/${response.data.orderId}`)
                } else if (this.$route.path === '/functions/customerinfo') {
                  this.$router.push(`/functions/checkout/${response.data.orderId}`)
                }
              })
            } else {
              this.updateAlertMessages({
                text: response.data.message,
                status: 'unsuccessful'
              })
            }
          })
        } else {
          this.updateAlertMessages({
            text: '您的欄位填寫不完整',
            status: 'unsuccessful'
          })
        }
      })
    }
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#customer_info
  padding: 100px 0 50px 0
  +center_flex
  flex-direction: column
  h3
    margin: 0 0 20px 0
    font-size: 1.5rem
  form
    width: 80%
    max-width: 500px
    .form-group
      label
        margin: 0 0 0 5px
        font-weight: 500
      input, textarea
        margin: 5px 0
        border-radius: 10px
        box-shadow: 5px 5px 10px rgba(black, 0.05)
        font-size: 0.9rem
        transition: 0.4s
        &:hover
          transform: translate(-0.5px, -0.5px)
          box-shadow: 5px 5px 15px rgba(black, 0.15)
        &::placeholder
          font-size: 0.8rem
          color: rgba(black, 0.2)
        &.invalid
          border: 1px solid $c_red
      span
        margin: 0 0 0 5px
        font-weight: 500
        font-size: 0.9rem
        color: $c_red
    .text-right
      .btn_submit
        border-radius: 10px
        background-color: $c_green
        color: white
        transition: 0.4s
        &:hover
          background-color: darken($c_green, 20)
</style>
