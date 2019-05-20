<template lang="pug">
#campaign
  .message {{ message }}
  .coupons(:class="{ pile: isPile }")
    .coupon_ticket(v-for="coupon in coupons"
                    :data-order="coupon.order"
                    :class="{ opened: coupon.isOpen }"
                    @click="turnOver(coupon)")
      .face.back
        .ticket_stub
          .spikes
            .spike(v-for="num in 10")
        .ticket_body
          .ticket_body_sharp
          .ticket_body_cut.ticket_body_cut_1
          .ticket_body_cut.ticket_body_cut_2
          .ticket_body_tail
            h5 code
          .ticket_content(v-if="coupon.percent")
            .ticket_discount {{ coupon.percent / 10 }} 折
            .ticket_code {{ coupon.code }}
            .date_box
              h5 使用期限:
              h5.due_date {{ coupon.due }}
          .gratitude(v-else)
            h5 謝謝您支持我們，祝您明日中獎！
      .face.front
        .ticket_body
          .ticket_body_cut.ticket_body_cut_1
          .ticket_body_cut.ticket_body_cut_2
          .content_box
</template>

<script>
export default {
  data () {
    return {
      coupons: [
        {
          percent: 90,
          code: 'dailyCampaign_9',
          due: '2019-10-31',
          order: 1,
          isOpen: false
        }, {
          percent: 80,
          code: 'dailyCampaign_8',
          due: '2019-10-31',
          order: 2,
          isOpen: false
        }, {
          order: 3,
          isOpen: false
        }, {
          order: 4,
          isOpen: false
        }, {
          order: 5,
          isOpen: false
        }
      ],
      isPile: true,
      mode: '',
      count: 0,
      message: '點擊紙牌，試試您的今日運勢!'
    }
  },
  methods: {
    turnOver (coupon) {
      if (this.mode === 'choosing phase') {
        coupon.isOpen = !coupon.isOpen
        if (coupon.percent === 90) {
          this.message = '恭喜您抽中了 9 折優惠券!'
        } else if (coupon.percent === 80) {
          this.message = '哇! 您中了本日大獎 — 8 折優惠券'
        } else {
          this.message = '謝謝您的參與，明天再來試試吧!'
        }
        this.mode = ''
      } else {
        this.startGame()
      }
    },
    shuffle () {
      let order = [1, 2, 3, 4, 5]
      order.sort((a, b) => Math.random() > 0.5 ? 1 : -1)
      this.coupons.forEach((coupon, id) => {
        coupon.order = order[id]
      })
    },
    startGame () {
      if (this.coupons.every(coupon => !coupon.isOpen)) {
        this.mode = ''
        this.isPile = false
        this.count = 0
        setTimeout(() => {
          let startShuffle = () => {
            this.shuffle()
            if (this.count++ < 6) {
              setTimeout(startShuffle, 300)
            } else {
              this.mode = 'choosing phase'
            }
          }
          startShuffle()
        }, 1500)
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
#campaign
  min-height: 100vh
  padding: 100px 0
  .message
    font-size: 1.8rem
    font-weight: 700
    +center_flex
  .coupons
    width: 100%
    +center_position
    &.pile
      .coupon_ticket
        @for $i from 1 through 5
          &[data-order="#{$i}"]
            left: 50%
            transform: rotate(0) translate(-50%, -50%) rotate(-90deg)
      &:hover
        .coupon_ticket
          @for $i from 1 through 5
            &[data-order="#{$i}"]
              transform: translate(-50%, -50%) rotate(#{(5 - $i) * 10 + -100}deg)
    .coupon_ticket
      +size(220px, 120px, 10px)
      +center_position
      transform-style: preserve-3d
      backface-visibility: hidden
      cursor: pointer
      transition: all 0.3s, transform 0.7s
      @for $i from 1 through 5
        &[data-order="#{$i}"]
          left: calc(50% - 110px)
          transform: rotate((360deg / 5) * $i) translate(-50%, -50%) rotate(45deg)
      &.opened
        @for $i from 1 through 5
          &[data-order="#{$i}"]
            left: 50%
            z-index: 1
            transform: rotate(360deg) translate3d(-50%, 200%, 120px) rotate(0) rotateY(180deg)
      .face
        +size(100%, 100%, 10px)
        background-color: $c_green
        +center_position
        backface-visibility: hidden
        overflow: hidden
        &.back
          transform: translate(-50%, -50%) rotateY(180deg)
        &.front
          background-color: $c_blue
          transform: translate(-50%, -50%) rotateZ(180deg)
          .ticket_body
            padding: 10px
            background-color: $c_blue
            .content_box
              +size(120%, 100%, 10px)
              background-image: repeating-linear-gradient(60deg, rgba(white, 0.5) 0, rgba(white, 0.5) 10px, transparent 10px, transparent 30px, rgba(white, 0.5) 30px, rgba(white, 0.5) 45px, transparent 45px, transparent 60px, rgba(white, 0.5) 60px, rgba(white, 0.5) 70px, transparent 70px, transparent 85px, rgba(white, 0.5) 0), repeating-linear-gradient(-45deg, rgba(white, 0.5) 0, rgba(white, 0.5) 20px, transparent 20px, transparent 30px, rgba(white, 0.5) 30px, rgba(white, 0.5) 45px, transparent 45px, transparent 60px, rgba(white, 0.5) 60px, rgba(white, 0.5) 70px, transparent 70px, transparent 85px, rgba(white, 0.5) 0), linear-gradient(to bottom right, $c_green, $c_blue)
        .ticket_stub
          +size(15%, 100%)
          position: absolute
          right: 0
          .spikes
            margin: 0 0 0 -15px
            position: absolute
            left: 0
            .spike
              +size(20px)
              background-color: lighten($c_yellow, 10)
              transform: rotate(45deg)
        .ticket_body
          +size(85%, 100%)
          background-color: lighten($c_yellow, 10)
          position: absolute
          &_cut
            +size(35px, 35px * 0.5)
            background-color: $c_white
            position: absolute
            left: 20%
            z-index: 5
            &_1
              border-radius: 0 0 100px 100px
              border-top: 0
              top: -1%
            &_2
              border-radius: 100px 100px 0 0
              border-bottom: 0
              bottom: -1%
          &_tail
            +size(20px, 100%)
            background-color: $c_blue
            position: absolute
            left: 0
            h5
              font-size: 1rem
              font-weight: 700
              color: white
              +center_position
              transform: translate(-50%, -50%) rotate(-90deg)
          .ticket_content
            +center_position
            left: 55%
            +center_flex
            flex-direction: column
            .ticket_discount
              font-size: 1.5rem
              font-weight: 700
              color: $c_red
            .ticket_code
              margin: 5px 0 10px 0
              padding: 3px 12px
              border-radius: 5px
              background-color: white
              font-size: 0.7rem
              color: $c_blue
            .date_box
              width: 120%
              transform: scale(0.9)
              +center_flex
              h5
                word-break: keep-all
                font-size: 0.7rem
                font-weight: 300
                color: $c_blue
                +center_flex
                &.due_date
                  margin: 0 0 0 5px
                  font-weight: 700
                  color: $c_red
          .gratitude
            +size(100%)
            h5
              width: 70%
              line-height: 180%
              font-size: 1.1rem
              font-weight: 700
              +center_position
              left: 60%

// ====================
//      RWD
// ==============================

// --------------------
//      MOBILE
// ------------------------------
@media screen and (max-width: 767.98px)
  #campaign
    .message
      width: 60%
      margin: 0 auto
      font-size: 1.4rem
</style>
