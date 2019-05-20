<template lang="pug">
#home
  Loading(:active.sync="isLoading")
  Carousel
  Content
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import Carousel from '@/components/yustyleshop/Carousel'
import Content from '@/components/yustyleshop/Content'

export default {
  components: {
    Carousel, Content
  },
  methods: {
    ...mapMutations(['updateLoading']),
    ...mapActions('shopModule', ['loadProductsInShop'])
  },
  computed: {
    ...mapState(['isLoading'])
  },
  created () {
    this.updateLoading(true)
    this.loadProductsInShop()
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================

</style>
