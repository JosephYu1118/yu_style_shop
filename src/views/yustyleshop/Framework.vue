<template lang="pug">
#framework
  Loading(:active.sync="isLoading")
  main.container-fluid
    Sidebar.col-sm-2
    transition(name="page"
                mode="out-in")
      router-view.col-sm-10.ml-sm-auto(:key="$route.path")
</template>

<script>
import { mapState } from 'vuex'
import Sidebar from '@/components/yustyleshop/Sidebar'

export default {
  components: {
    Sidebar
  },
  computed: {
    ...mapState(['isLoading'])
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#framework
  min-height: 90vh
  padding: 100px 0 50px 0
</style>
