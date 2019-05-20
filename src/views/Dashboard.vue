<template lang="pug">
#dashboard
  Alert
  Navbar
  .container-fluid
    Sidebar.col-sm-2
    main.col-sm-10.ml-sm-auto
      transition(name="page"
                  mode="out-in")
        router-view(:key="$route.path")
  CartModal(:p_route="'/functions/customerinfo'")
</template>

<script>
import Alert from '@/components/Alert'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/dashboard/Sidebar'
import CartModal from '@/components/CartModal'

export default {
  components: {
    Alert, Navbar, Sidebar, CartModal
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================

</style>
