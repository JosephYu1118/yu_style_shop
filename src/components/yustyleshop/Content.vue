<template lang="pug">
#content
  section.latest_box
    .section_title
      h2 新品上市
    ul
      li.product_card(v-for="product in products.slice(0, 3)"
                      :key="product.id")
        .card_img(:style="{ 'background-image': `url(${product.imageUrl})` }")
        .card_content
          h5.card_title {{ product.title }}
          p.card_text {{ product.description }}
          del.origin_price 原價 {{ product.origin_price | currency }}
          .discount_price 售價 {{ product.price | currency }}
        .card_buttons
          button.btn_more.btn.btn-sm(type="button"
                                      @click="setProductDetail(product.id)")
            span 了解更多
  section.services_box
    .section_title
      h2 我們的服務
    ul
      li.service_item(v-for="service in services")
        .service_icon
          i(:class="service.serviceIcon")
        .service_title_eng {{ service.titleEng }}
        .service_title_ch {{ service.titleCh }}
  section.dialog_box(:style="{ 'background-image': `url(${dialog.dialogImg})` }")
    .dialog_overlay
    .dialog_content
      .dialog_title {{ dialog.title }}
      .dialog_text {{ dialog.content }}
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      services: [
        {
          serviceIcon: 'fas fa-shipping-fast',
          titleEng: 'FAST DELIVERY',
          titleCh: '快速出貨'
        }, {
          serviceIcon: 'fas fa-money-check-alt',
          titleEng: 'FREE SHIPPING',
          titleCh: '滿額免運'
        }, {
          serviceIcon: 'fas fa-plane',
          titleEng: 'JAPAN FASHION',
          titleCh: '日本同步'
        }, {
          serviceIcon: 'fas fa-gifts',
          titleEng: 'FREE REFUND',
          titleCh: '免費退貨'
        }
      ],
      dialog: {
        dialogImg: 'https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        title: '給您極上的衣著體驗',
        content: '我們致力於提升衣服的材質，精心打造兼具舒適及時尚的平價逸品。'
      }
    }
  },
  methods: {
    ...mapActions('shopModule', ['loadProductDetail']),
    setProductDetail (id) {
      this.loadProductDetail(id)
      this.$router.push(`/yustyleshop/${id}`)
    }
  },
  computed: {
    ...mapState('shopModule', ['products'])
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#content
  +center_flex
  flex-direction: column
  section
    width: 100%
    +center_flex
    flex-direction: column
    .section_title
      width: 100%
      margin: 0 0 30px 0
      +center_flex
      h2
        font-size: 1.5rem
        font-weight: 700
  .latest_box
    padding: 100px 0
    ul
      +center_flex(center, flex-start)
      .product_card
        +size(18rem, auto, 10px)
        margin: 10px
        padding: 15px 20px
        background-color: darken(white, 5)
        +center_flex
        flex-direction: column
        box-shadow: 5px 10px 20px rgba(black, 0.1)
        transition: 0.4s
        &:hover
          transform: translate(-2px, -2px)
          box-shadow: 5px 10px 25px rgba(black, 0.2)
        .card_img
          +size(100%, 200px)
          background-size: 70%
          background-position: center
          background-repeat: no-repeat
        .card_content
          width: 100%
          +center_flex(center, flex-start)
          flex-direction: column
          .card_title
            margin: 10px 0
          .card_text
            margin: 10px 0
            word-break: break-all
            font-size: 0.9rem
            font-weight: 300
            color: rgba(black, 0.7)
          .origin_price
            margin: 10px 0 0 0
            font-size: 0.8rem
            color: rgba(black, 0.3)
          .discount_price
            margin: 0 0 20px 0
            font-weight: 700
            color: $c_red
        .card_buttons
          width: 100%
          +center_flex
          .btn_more
            width: 100%
            border: 1px solid $c_green
            border-radius: 10px
            background-color: transparent
            color: $c_green
            transition: 0.4s
            &:hover
              background-color: $c_green
              color: white
  .services_box
    padding: 50px 0
    background-color: white
    ul
      width: 100%
      max-width: 1000px
      +center_flex(space-evenly)
      flex-wrap: wrap
      .service_item
        +center_flex
        flex-direction: column
        .service_icon
          i
            font-size: 2.2rem
            color: $c_green
        .service_title_eng
          margin: 20px 0 0 0
          font-size: 0.7rem
          font-weight: 300
          color: rgba($c_blue, 0.4)
        .service_title_ch
          font-size: 1rem
          font-weight: 500
  .dialog_box
    +size(100%, 500px)
    background-size: cover
    background-attachment: fixed
    background-position: center
    .dialog_overlay
      +size(100%)
      background-color: rgba(black, 0.3)
    .dialog_content
      +size(70%, auto, 5px)
      background-color: rgba(white, 0.8)
      padding: 60px 30px
      +center_position
      +center_flex
      flex-direction: column
      .dialog_title
        font-size: 1.5rem
        font-weight: 500
      .dialog_text
        margin: 10px 0 0 0
        font-size: 1rem
        font-weight: 300
        color: rgba($c_blue, 0.8)

// ====================
//      RWD
// ==============================

// --------------------
//      SMALL DESKTOP
// ------------------------------
@media screen and (max-width: 991.98px)
  #content
    .latest_box
      ul
        flex-direction: column

// --------------------
//      MEDIUM MOBILE
// ------------------------------
@media screen and (max-width: 419.98px)
  #content
    .services_box
      ul
        .service_item
          padding: 20px 25px
</style>
