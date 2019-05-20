<template lang="pug">
#yu_style_shop
  Alert
  Navbar
  main
    transition(name="page"
                mode="out-in")
      router-view(:key="$route.path")
  CartModal(:p_route="'/customerinfo'")
  footer
    span © 2019
    span.logo Yu Style Shop
    span.text 純屬個人練習，無商業用途
</template>

<script>
import Alert from '@/components/Alert'
import Navbar from '@/components/Navbar'
import CartModal from '@/components/CartModal'

export default {
  components: {
    Alert, Navbar, CartModal
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#yu_style_shop
  width: 100%
  min-height: 100vh
  footer
    +size(100%, 80px)
    background-color: white
    +center_flex
    span
      margin: 0 5px
      font-size: 0.8rem
      &.logo
        color: $c_red

// ====================
//      RWD
// ==============================

// --------------------
//      SMALL MOBILE
// ------------------------------
@media screen and (max-width: 349.98px)
  #yu_style_shop
    footer
      span
        &.text
          margin: 0 0 0 10px
          width: 110px
</style>
