<template lang="pug">
#dashboard_sidebar
  .sidebar-sticky
    .links_box(v-for="data in linksData")
      label.sidebar-heading
        input(type="checkbox"
              v-model="data.isHidden")
        i.fas.fa-plus-circle(v-if="data.isHidden")
        i.fas.fa-minus-circle(v-else)
        span {{ data.title }}
      ul.nav(v-if="!data.isHidden")
        li.nav-item(v-for="link in data.links")
          router-link.nav-link(:to="link.url")
            i(:class="link.icon")
            span {{ link.target }}
</template>

<script>
export default {
  data () {
    return {
      linksData: {
        administratorData: {
          title: '管理員',
          links: [
            {
              target: '產品列表',
              url: '/dashboard/products',
              icon: 'fas fa-box-open'
            }, {
              target: '優惠券',
              url: '/dashboard/coupons',
              icon: 'fas fa-ticket-alt'
            }, {
              target: '訂單列表',
              url: '/dashboard/orders',
              icon: 'fas fa-list'
            }
          ],
          isHidden: false
        },
        functionsData: {
          title: '模擬功能',
          links: [
            {
              target: '模擬商城',
              url: '/functions/shop',
              icon: 'fas fa-shopping-cart'
            }, {
              target: '模擬訂單',
              url: '/functions/customerinfo',
              icon: 'far fa-credit-card'
            }
          ],
          isHidden: false
        }
      }
    }
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#dashboard_sidebar
  padding: 0
  position: fixed
  top: 0
  left: 0
  .sidebar-sticky
    height: 100vh
    padding: 80px 0 0 10px
    background-color: $c_black
    .links_box
      .sidebar-heading
        margin: 10px 0 0 0
        user-select: none
        cursor: pointer
        &:hover
          i, span
            font-weight: 700
            color: $c_yellow
        input
          display: none
        i, span
          font-size: 0.7rem
          color: darken(white, 50)
          word-break: keep-all
          transition: 0.4s
        i
          margin: 0 5px 0 0
          transform: scale(0.8)
      .nav
        +center_flex(center, flex-start)
        flex-direction: column
        .nav-item
          .nav-link
            color: $c_white
            transition: 0.4s
            &:hover
              color: $c_yellow
            i
              margin: 0 5px 0 0
              font-size: 0.9rem
            span
              font-size: 1rem
              word-break: keep-all

// ====================
//      RWD
// ==============================

// --------------------
//      LARGE MOBILE
// ------------------------------
@media screen and (max-width: 575.98px)
  #dashboard_sidebar
    width: 90%
    margin: 0 auto -50px auto
    position: static
    .sidebar-sticky
      height: auto
      margin: 100px 0 50px 0
      padding: 30px 0
      border-radius: 10px
      +center_flex
      flex-direction: column
      .links_box
        +center_flex
        flex-direction: column
        &:nth-child(1)
          margin: 0 0 30px 0
        .sidebar-heading
          width: 200px
          margin: 0 0 10px 0
          padding: 0 0 10px 0
          border-bottom: 1px dashed darken(white, 50)
          +center_flex
          i, span
            font-size: 1rem
        .nav
          flex-direction: row
          .nav-item
            .nav-link
              padding: 0 10px
              i
                font-size: 0.7rem
              span
                font-size: 0.8rem

// --------------------
//      SMALL MOBILE
// ------------------------------
@media screen and (max-width: 349.98px)
  #dashboard_sidebar
    .sidebar-sticky
      .links_box
        .nav
          flex-direction: column
          .nav-item
            .nav-link
              padding: 0
</style>
