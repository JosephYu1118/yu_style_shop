<template lang="pug">
nav.navbar.navbar-expand-lg.fixed-top
  router-link.navbar-brand(to="/") Yu Style Shop
  button.navbar-toggler(type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation")
    i.fas.fa-bars
  #navbarNav.collapse.navbar-collapse
    ul.navbar-nav
      li.nav-item(v-for="(link, l_id) in linksData")
        router-link.mobile.nav-link(:to="link.url"
                                    data-toggle="collapse"
                                    data-target="#navbarNav") {{ link.title }}
        router-link.desktop.nav-link(:to="link.url"
                                      :class="{ 'home': l_id === 0 }") {{ link.title }}
  .buttons_box
    .login_box(v-if="!loginStatus")
      router-link.btn_sign_in(to="/login") 登入
    .logout_box(v-else)
      a.btn_sign_out(@click="signOut()") 登出
    .favourite_box
      i.far.fa-heart(@click="updateAlertMessages({ text: '很抱歉，此功能尚未開放', status: 'unsuccessful' })")
      //- i.fas.fa-heart
    .cart_box
      button.btn_open_cart(@click="openCart()")
        i.fas.fa-shopping-cart
        span.number {{ cart.length }}
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      linksData: [
        {
          title: '首頁',
          url: '/'
        }, {
          title: '所有商品',
          url: '/yustyleshop'
        }, {
          title: '優惠專區',
          url: '/campaign'
        }, {
          title: '聯絡我們',
          url: '/contact'
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['updateAlertMessages']),
    ...mapActions(['signOut', 'checkLoginStatus']),
    openCart () {
      $('#cart_modal').modal('show')
    }
  },
  computed: {
    ...mapState(['loginStatus']),
    ...mapState('shopModule', ['cart'])
  },
  watch: {
    '$route' () {
      this.checkLoginStatus()
    }
  },
  created () {
    this.checkLoginStatus()
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
.navbar
  padding: 15px 20px
  background-color: white
  .navbar-brand
    color: $c_green
  .navbar-toggler
    border: 0
    .fa-bars
      font-size: 1.8rem
      color: $c_green
  #navbarNav
    +center_position
    .navbar-nav
      +center_flex
      .nav-item
        .nav-link
          color: $c_green
          transition: 0.4s
          &:hover
            font-weight: 500
            color: darken($c_green, 20)
          &.mobile
            display: none
          &.desktop
            display: block
          &.home
            display: none
  .buttons_box
    position: fixed
    top: 20px
    right: 0
    +center_flex
    [class *= "box"]
      padding: 0 10px
      +center_flex
      [class ^= "btn"]
        text-decoration: none
        font-size: 1.1rem
        color: $c_green
        cursor: pointer
        transition: 0.4s
        &:hover
          color: darken($c_green, 20)
      .btn_open_cart
        border: 0
        background-color: transparent
        +center_flex
      i
        font-size: 1.3rem
        color: $c_green
        cursor: pointer
        transition: 0.4s
        &:hover
          color: darken($c_green, 20)
      .number
        margin: 0 0 0 5px
        +size(20px, 20px, 50%)
        background-color: rgba(black, 0.1)
        font-size: 0.8rem
        font-weight: 700
        color: $c_blue
        +center_flex
    .favourite_box
      border-left: 1px solid rgba($c_green, 0.3)
      border-right: 1px solid rgba($c_green, 0.3)

// ====================
//      RWD
// ==============================

// --------------------
//      TABLET
// ------------------------------
@media screen and (max-width: 991.98px)
  .navbar
    .navbar-brand
      display: none
    #navbarNav
      position: static
      transform: translate(0)
      .navbar-nav
        width: 100%
        .nav-item
          margin: 0
          .nav-link
            &.mobile
              display: block
            &.desktop
              display: none
</style>
