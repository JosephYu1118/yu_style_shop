<template lang="pug">
#products
  Loading(:active.sync="isLoading")
  button.btn_add_product.btn(@click="openModal(0)")
    i.fas.fa-plus
    span 新增產品
  table.table.mt-4
    thead
      tr
        th(width="60") 分類
        th 產品
        th(width="100") 原價
        th(width="100") 售價
        th(width="80") 狀態
        th(width="40")
    tbody
      tr(v-for="product in products"
          :key="product.id")
        td {{ product.category }}
        td.title {{ product.title }}
        td {{ product.origin_price | currency }}
        td {{ product.price | currency }}
        td
          i.fas.fa-check(v-if="product.is_enabled")
          i.fas.fa-ban(v-else)
        td
          .btn-group(role="group")
            button.btn.btn-sm.text-nowrap(@click="openModal(1, product)") 編輯
            button.btn.btn-sm.text-nowrap(@click="openModal(2, product)") 刪除
  Pagination(:p_interface="'products'")
  ProductsModal(:p_tempProduct="productData"
                @e_setProduct="setProduct"
                v-if="mode === 2")
    template(#title="slotProps")
      span 刪除產品
    template(#body="slotProps")
      | 是否刪除產品:
      strong.text-danger  {{ slotProps.p_tempProduct.title }}
      p (刪除後將無法恢復)
  ProductsModal(:p_tempProduct="productData"
                @e_setProduct="setProduct"
                v-if="mode === 1")
    template(#title="slotProps")
      span 編輯產品
  ProductsModal(:p_tempProduct="productData"
                @e_setProduct="setProduct"
                v-if="mode === 0")
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Pagination from '@/components/Pagination'
import ProductsModal from '@/components/dashboard/ProductsModal'

export default {
  components: {
    Pagination, ProductsModal
  },
  data () {
    return {
      productData: {},
      mode: -1
    }
  },
  methods: {
    ...mapMutations(['updateLoading']),
    ...mapActions('productsModule', ['loadProducts', 'updateProduct']),
    openModal (num, product) {
      this.mode = num
      if (this.mode === 0) {
        this.productData = {}
      } else if (this.mode !== 0) {
        this.productData = Object.assign({}, product)
        // 如果是 this.productData = product ，會是傳物件參考，兩個物件將指向相同的內容，
        // 為避免錯誤，必須使用 Object.assign({}, product) 將 product 的值一個一個代入空的物件，
        // 再回傳給 this.productData
      }
      this.$nextTick(() => {
        $('#products_modal').modal('show')
      })
    },
    setProduct (product) {
      this.productData = product
      this.$set(this.productData, 'qty', '')
      this.updateLoading(true)
      let data = {
        product: this.productData,
        mode: this.mode
      }
      this.updateProduct(data)
    }
  },
  computed: {
    ...mapState(['isLoading']),
    ...mapState('productsModule', ['products'])
  },
  created () {
    this.updateLoading(true)
    this.loadProducts()
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#products
  padding: 100px 0 50px 0
  +center_flex
  flex-direction: column
  .btn_add_product
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
          &.title
            min-width: 100px
          .fa-check
            color: $c_green
          .fa-ban
            color: $c_red
          .btn-group
            .btn
              font-size: 0.8rem
              transition: 0.4s
              &:nth-child(1)
                border-radius: 10px 0 0 10px
                border-color: $c_green
                color: $c_green
                &:hover
                  background-color: $c_green
                  color: white
              &:nth-child(2)
                border-radius: 0 10px 10px 0
                border-color: $c_red
                color: $c_red
                &:hover
                  background-color: $c_red
                  color: white

// ====================
//      RWD
// ==============================

// --------------------
//      MOBILE
// ------------------------------
@media screen and (max-width: 575.98px)
  #products
    padding: 50px 0
</style>
