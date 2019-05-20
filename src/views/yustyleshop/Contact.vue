<template lang="pug">
form#contact
  h2 聯絡我們
  .name_box
    input(name="name"
          placeholder="你的名字")
    span.input_focus
    label(for="name")
      i.far.fa-user
  .email_box
    input(name="email"
          placeholder="你的信箱")
    span.input_focus
    label(for="email")
      i.far.fa-envelope
  .topic_box
    select(name="option")
      option(value="0"
              disabled
              selected) 選擇主題
      option(value="1") 商品退換貨
      option(value="2") 訂單查詢
      option(value="3") 會員資料
      option(value="4") 其他
    label(for="option")
      i.fas.fa-align-left
    label.icon_chevron(for="option")
      i.fas.fa-chevron-down
  .comment_box
    textarea(name="comment"
              placeholder="請輸入內容"
              rows="6")
    span.input_focus
    label(for="comment")
      i.far.fa-comment
  button.btn_submit.btn 送出
</template>

<script>
export default {

}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#contact
  min-height: 100vh
  padding: 100px 0
  +center_flex
  flex-direction: column
  &>*
    margin: 0 0 1.5rem 0
  h2
    margin: 0 0 3rem 0
    font-size: 1.4rem
    color: $c_blue
  .input_focus
    +size(calc(100% + 2px), calc(100% + 2px), 10px)
    border: 2px solid rgba($c_green, 0.5)
    position: absolute
    top: -1px
    left: -1px
    transform: scale(1.1, 1.4)
    opacity: 0
    pointer-events: none
    transition: 0.4s
  .name_box, .email_box, .topic_box, .comment_box
    label
      +center_position
      left: 5%
      +center_flex
      i
        font-size: 1.2rem
        color: $c_green
  .topic_box
    select
      cursor: pointer
      transition: 0.5s
      &:hover
        background-color: lighten($c_green, 20)
        color: white
        transition: 0
    .icon_chevron
      right: 2.5%
      left: auto
      pointer-events: none
      i
        font-size: 1rem
  .comment_box
    .input_focus
      +size(calc(100% + 2px), calc(100% - 4px), 10px)
    label
      top: 13%
  input[name="name"], input[name="email"], select, textarea
    width: 50vw
    max-width: 500px
    min-width: 300px
    padding: 10px 50px
    border: 1px solid rgba($c_green, 0.5)
    border-radius: 10px
    background-color: white
    color: $c_blue
    outline: none
    &::placeholder
      color: rgba(black, 0.3)
    &:focus
      +.input_focus
        transform: scale(1)
        opacity: 1
  select
    appearance: none
  .btn_submit
    margin: 0
    border-radius: 10px
    background-color: $c_green
    color: white
    transition: 0.4s
    &:hover
      background-color: darken($c_green, 20)

// ====================
//      RWD
// ==============================

// --------------------
//      TABLET
// ------------------------------
@media screen and (max-width: 991.98px)
  #contact
    .name_box, .email_box, .topic_box, .comment_box
      label
        left: 8%
</style>
