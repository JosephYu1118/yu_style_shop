<template lang="pug">
#products_modal.modal.fade(tabindex="-1"
                            role="dialog"
                            aria-hidden="true")
  .modal-dialog.modal-lg(role="document")
    .modal-content
      .modal-header
        h5.modal-title
          slot(name="title")
            span 新增產品
        button.close(type="button"
                      data-dismiss="modal"
                      aria-label="Close")
          span.text-white(aria-hidden="true") ×
      .modal-body
        slot(name="body"
              :p_tempProduct="p_tempProduct")
          .row
            .col-sm-4
              .form-group
                label(for="image_url") 輸入圖片網址
                input#image_url.form-control(type="text"
                                              placeholder="請輸入圖片連結"
                                              v-model="p_tempProduct.imageUrl")
              .form-group
                label.btn_upload_img.btn.btn-sm
                  i.far.fa-image
                  span 上傳圖片
                  input.form-control(type="file"
                                      ref="files"
                                      @change="uploadFile()")
              i.fas.fa-spinner.fa-spin(v-if="isFileUploading")
              img.img-fluid(:src="p_tempProduct.imageUrl"
                            v-else)
            .col-sm-8
              .form-group
                label(for="product_title") 產品名稱
                input#product_title.form-control(type="text"
                                                  placeholder="請輸入產品名稱"
                                                  v-model="p_tempProduct.title")
              .form-row
                .form-group.col-md-6
                  label(for="category") 分類
                  input#category.form-control(type="text"
                                              placeholder="請輸入分類"
                                              v-model="p_tempProduct.category")
                .form-group.col-md-6
                  label(for="unit") 單位
                  input#unit.form-control(type="text"
                                          placeholder="請輸入單位"
                                          v-model="p_tempProduct.unit")
              .form-row
                .form-group.col-md-6
                  label(for="origin_price") 原價
                  input#origin_price.form-control(type="number"
                                                  placeholder="請輸入原價"
                                                  v-model.number="p_tempProduct.origin_price")
                .form-group.col-md-6
                  label(for="price") 售價
                  input#price.form-control(type="number"
                                            placeholder="請輸入售價"
                                            v-model.number="p_tempProduct.price")
              .demarcation
              .form-group
                label(for="description") 產品描述
                textarea#description.form-control(type="text"
                                                  placeholder="請輸入產品描述"
                                                  v-model="p_tempProduct.description")
              .form-group
                label(for="content") 產品內容
                textarea#content.form-control(type="text"
                                              placeholder="請輸入產品內容"
                                              v-model="p_tempProduct.content")
              .form-group
                .form-check
                  input#product_enabled.form-check-input(type="checkbox"
                                                          v-model="p_tempProduct.is_enabled"
                                                          :true-value="1"
                                                          :false-value="0")
                  label.form-check-label(for="product_enabled") 是否啟用
      .modal-footer
        button.btn_cancel.btn(type="button"
                              data-dismiss="modal") 取消
        button.btn_confirm.btn(type="button"
                                @click="setProduct()") 確認
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: [
    'p_tempProduct'
  ],
  data () {
    return {
      isFileUploading: false
    }
  },
  methods: {
    ...mapMutations(['updateAlertMessages']),
    setProduct () {
      this.$emit('e_setProduct', this.p_tempProduct)
    },
    uploadFile () {
      const file = this.$refs.files.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', file)
      this.isFileUploading = true
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      this.$http.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        // console.log(response.data)
        this.isFileUploading = false
        if (response.data.success) {
          this.$set(this.p_tempProduct, 'imageUrl', response.data.imageUrl)
        } else {
          this.updateAlertMessages({
            text: response.data.message,
            status: 'unsuccessful'
          })
        }
      })
    }
  }
}
</script>

<style lang="sass">
@import "@/styles/global.sass"

// ====================
//      MAIN
// ==============================
#products_modal
  .modal-dialog
    .modal-content
      border: 0
      border-radius: 10px
      .modal-header
        background-color: $c_blue
        color: white
        +center_flex
        .modal-title
          margin: 0 0 0 10px
      .modal-body
        label
          margin: 5px
          font-size: 1rem
          &[for="product_enabled"]
            margin: 10px 0 0 5px
          .fas.fa-spinner
            margin: 0 0 0 10px
        input, textarea
          border-radius: 10px
          line-height: 150%
          font-size: 0.9rem
          &::placeholder
            font-size: 0.8rem
            color: rgba(black, 0.2)
          &[type="file"]
            display: none
        .btn_upload_img
          margin: 0 5px
          border-color: $c_green
          border-radius: 10px
          color: $c_green
          cursor: pointer
          transition: 0.3s
          &:hover
            background-color: $c_green
            color: white
          i
            margin: 0 6px 0 0
            font-size: 0.9rem
          span
            font-size: 0.9rem
        .fa-spinner
          margin: 10px 10px 20px 10px
          color: $c_green
        .img-fluid
          margin: 20px 0 30px 0
        .demarcation
          width: 100%
          margin: 20px 0
          border-bottom: 1px dashed rgba(black, 0.3)
        .form-check
          +center_flex(flex-start)
          margin: 0 0 0 5px
      .modal-footer
        [class ^= "btn"]
          border-radius: 10px
          color: white
          transition: 0.4s
        .btn_cancel
          background-color: $c_red
          &:hover
            background-color: darken($c_red, 20)
        .btn_confirm
          background-color: $c_green
          &:hover
            background-color: darken($c_green, 20)
</style>
