<template lang="pug">
#alert
  .alert.alert-dismissible(v-for="(message, m_id) in alertMessages"
                            :class="message.status"
                            :key="m_id")
    span {{ message.text }}
    button.close(type="button"
                  aria-label="Close"
                  @click="removeAlertMessage(m_id)")
      i.fas.fa-times(aria-hidden="true")
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {}
  },
  methods: {
    ...mapMutations(['removeAlertMessage'])
  },
  computed: {
    ...mapState(['alertMessages'])
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#alert
  max-width: 50%
  position: fixed
  top: 60px
  right: 20px
  z-index: 5000
  .alert
    border-radius: 10px
    font-weight: 500
    box-shadow: 5px 5px 10px rgba(black, 0.05)
    &.successful
      background-color: lighten($c_green, 20)
      color: white
    &.unsuccessful
      background-color: $c_red
    button
      +center_position
      right: -30px
      left: auto
      outline: none
      i
        font-size: 1rem
        top: -1px
</style>
