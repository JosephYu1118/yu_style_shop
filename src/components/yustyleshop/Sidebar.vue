<template lang="pug">
#sidebar
  label.classification_box
    input(type="checkbox"
          v-model="isHidden")
    span 分類方式
  .sidebar-sticky(v-if="!isHidden")
    h6.sidebar-heading.px-3.mt-4.mb-1 男裝
    .links_box
      label(v-for="category in categories")
        input(type="radio"
              name="category"
              :value="category"
              @click="setCategory(category), detectRoute()")
        span {{ category }}
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      categories: [
        '全部', '上衣', '襯衫', '外套', '褲子', '其他'
      ],
      isHidden: false
    }
  },
  methods: {
    ...mapMutations('shopModule', ['setCategory']),
    detectRoute () {
      if (this.$route !== '/yustyleshop') {
        this.$router.push('/yustyleshop')
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
#sidebar
  padding: 30px 0
  border-radius: 0 10px 10px 0
  background-color: white
  position: fixed
  left: 0
  overflow: hidden
  box-shadow: 5px 10px 10px rgba(black, 0.03)
  .classification_box
    margin: -30px 0 0 0
    padding: 15px
    background-color: $c_green
    +center_flex
    user-select: none
    cursor: pointer
    transition: 0.4s
    &:hover
      background-color: darken($c_green, 20)
    input
      display: none
    span
      font-size: 1rem
      color: white
      word-break: keep-all
  .sidebar-sticky
    +center_flex
    flex-direction: column
    .sidebar-heading
      width: 70%
      padding: 0 0 10px 0
      border-bottom: 1px dashed rgba(black, 0.1)
      font-size: 1rem
      font-weight: 700
      color: $c_blue
      +center_flex
    .links_box
      width: 100%
      +center_flex
      flex-direction: column
      label
        width: 100%
        cursor: pointer
        input
          display: none
        span
          width: 100%
          padding: 10px 0
          font-size: 0.9rem
          font-weight: 500
          color: $c_blue
          +center_flex
          transition: 0.4s
          &:hover
            background-color: $c_yellow
            color: white

// ====================
//      RWD
// ==============================

// --------------------
//      MOBILE
// ------------------------------
@media screen and (max-width: 575.98px)
  #sidebar
    width: 90%
    margin: 0 auto
    padding: 30px 0 15px 0
    border-radius: 10px
    position: static
    .classification_box
      padding: 10px
    .sidebar-sticky
      .sidebar-heading
        width: 90%
      .links_box
        flex-direction: row
        label
          span
            padding: 5px
</style>
