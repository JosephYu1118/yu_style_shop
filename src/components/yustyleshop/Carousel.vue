<template lang="pug">
#carousel.carousel.slide(data-ride="carousel")
  ol.carousel-indicators
    li(v-for="num in 3"
        data-target="#carousel"
        :data-slide-to="num - 1"
        :class="{ 'active': num === 1 }")
  .carousel-inner
    .carousel-item(v-for="(item, i_id) in carousel"
                    :style="{ 'background-image': 'url(' + item.coverImg + ')' }"
                    :class="{ 'active': i_id === 0 }")
      .carousel-caption.d-none.d-md-block
        h5 {{ item.title }}
        p {{ item.content }}
  a.carousel-control-prev(href="#carousel"
                          role="button"
                          data-slide="prev")
    span.carousel-control-prev-icon(aria-hidden="true")
    span.sr-only Previous
  a.carousel-control-next(href="#carousel"
                          role="button"
                          data-slide="next")
    span.carousel-control-next-icon(aria-hidden="true")
    span.sr-only Next
</template>

<script>
export default {
  data () {
    return {
      carousel: [
        {
          coverImg: 'https://images.unsplash.com/photo-1543023177-2ef21c4a514e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
          title: '歡慶母親節',
          content: '獻給生命中最親愛的母親，讓溫情的五月，充滿最真摯的感恩。'
        }, {
          coverImg: 'https://images.unsplash.com/photo-1477901492169-d59e6428fc90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          title: '台北新店舖開幕優惠',
          content: '現在加入會員，即刻取得 5 折禮券'
        }, {
          coverImg: 'https://images.unsplash.com/photo-1524275461690-a79bfeaf1f3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
          title: '夏季選品搶先購',
          content: '精選男裝、女裝，通通 8.5 折'
        }
      ]
    }
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#carousel
  .carousel-inner
    .carousel-item
      height: 100vh
      background-size: cover
      background-position: center center
      &.active
        .carousel-caption
          opacity: 1
          transform: translate(0px, -100px)
      .carousel-caption
        margin: 0 100px
        padding: 25px 50px
        border-radius: 20px
        background-color: rgba($c_blue, 0.5)
        color: white
        opacity: 0
        transition: 0.8s
        h5
          margin: 10px 0
        p
          font-weight: 300
</style>
