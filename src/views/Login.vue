<template lang="pug">
#login
  Alert
  form.form-signin(@submit.prevent="signIn(user)")
    h2 Sign In
    .form-group
      input.form-control(type="email"
                          name="email"
                          placeholder="Account"
                          autofocus
                          v-model.trim="user.username"
                          v-validate="'required|email'"
                          :class="{ invalid: errors.has('email') }")
      i.fas.fa-user
      span(v-if="errors.has('email')") 請輸入帳號。
    .form-group
      input.form-control(type="password"
                          name="password"
                          placeholder="Password"
                          v-model.trim="user.password"
                          v-validate="'required'"
                          :class="{ invalid: errors.has('password') }")
      i.fas.fa-lock
      span(v-if="errors.has('password')") 請輸入密碼。
    .form-group
      label.remember
        input(type="checkbox")
        h6 Remember me
    .button_box
      button.btn_sign_in.btn(type="submit") 登入
  .hint_box
    table
      tbody
        tr
          td Email:
          td.hint asdf123@gmail.com
        tr
          td Password:
          td.hint asdf123
</template>

<script>
import { mapActions } from 'vuex'
import Alert from '@/components/Alert'

export default {
  components: {
    Alert
  },
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(['signIn'])
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#login
  width: 100%
  min-height: 100vh
  +center_flex
  flex-direction: column
  .form-signin
    +size(100%, auto, 10px)
    max-width: 400px
    min-width: 250px
    padding: 30px
    background-color: white
    box-shadow: 5px 10px 20px rgba(black, 0.05)
    h2
      margin: 0 0 30px 0
      text-align: center
    .form-group
      +center_flex(center, flex-start)
      flex-direction: column
      input
        padding: 5px 0
        border: 1px solid $c_yellow
        padding: 0 0 0 35px
        border-radius: 10px
        &::placeholder
          font-size: 0.9rem
          color: rgba(black, 0.2)
        &.invalid
          border: 1px solid $c_red
      i
        color: $c_yellow
        +center_position
        top: 18px
        left: 20px
      span
        margin: 10px 0 0 5px
        font-weight: 500
        font-size: 0.9rem
        color: $c_red
      .remember
        +center_flex
        cursor: pointer
        input
          margin: 0 10px
          cursor: pointer
        h6
          font-size: 0.9rem
          font-weight: 400
          color: rgba($c_blue, 0.8)
    .button_box
      padding: 0 20px
      +center_flex(flex-end)
      .btn_sign_in
        width: 100%
        border-radius: 10px
        background-color: $c_yellow
        color: white
        transition: 0.4s
        &:hover
          border: 1px solid darken($c_yellow, 10)
          background-color: transparent
          color: darken($c_yellow, 10)
  .hint_box
    border-radius: 10px
    background-color: lighten($c_white, 3)
    margin: 50px 0 0 0
    padding: 10px 30px
    table
      tbody
        tr
          td
            padding: 5px
            font-size: 0.8rem
            font-weight: 500
            color: rgba($c_blue, 0.5)
            &.hint
              padding: 5px 5px 5px 15px
              font-weight: 300

// ====================
//      RWD
// ==============================

// --------------------
//      TABLET
// ------------------------------
@media screen and (max-width: 767.98px)
  #login
    .form-signin
      max-width: 300px
      padding: 30px
      h2
        font-size: 1.4rem
      .form-group
        input
          font-size: 0.9rem
          &::placeholder
            font-size: 0.8rem
        i
          font-size: 0.9rem
        span
          font-size: 0.9rem
        .remember
          h6
            font-size: 0.8rem
      .button_box
        .btn_sign_in
          font-size: 0.9rem
</style>
