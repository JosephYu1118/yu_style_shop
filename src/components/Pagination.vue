<template lang="pug">
nav(aria-label="Page navigation")
  ul.pagination
    li.page-item(:class="{ 'disabled': !pagination.has_pre }")
      a.page-link(href="#"
                  aria-label="Previous"
                  @click.prevent="loadPage(p_interface, pagination.current_page - 1)")
        i.fas.fa-angle-left(aria-hidden="true")
    li.page-item(v-for="page in pagination.total_pages"
                  :key="page"
                  :class="{ 'active': pagination.current_page === page }")
      a.page-link(href="#"
                  @click.prevent="loadPage(p_interface, page)") {{ page }}
    li.page-item(:class="{ 'disabled': !pagination.has_next }")
      a.page-link(href="#"
                  aria-label="Next"
                  @click.prevent="loadPage(p_interface, pagination.current_page + 1)")
        i.fas.fa-angle-right(aria-hidden="true")
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: [
    'p_interface'
  ],
  computed: {
    ...mapState(['pagination'])
  },
  methods: {
    ...mapActions('productsModule', ['loadProducts']),
    ...mapActions('couponsModule', ['loadCoupons']),
    ...mapActions('ordersModule', ['loadOrders']),
    ...mapActions('shopModule', ['loadProductsInShop']),
    loadPage (pInterface, page) {
      if (pInterface === 'products') {
        this.loadProducts(page)
      } else if (pInterface === 'coupons') {
        this.loadCoupons(page)
      } else if (pInterface === 'orders') {
        this.loadOrders(page)
      } else if (pInterface === 'shop') {
        this.loadProductsInShop(page)
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
.pagination
  padding: 20px 0 0 0
  +center_flex
  .page-item
    &.active
      pointer-events: none
      .page-link
        font-weight: 700
        color: $c_blue
    &.disabled
      .page-link
        opacity: 0.2
    .page-link
      border: 0
      background-color: transparent
      color: $c_green
      &:hover
        color: $c_red
</style>
