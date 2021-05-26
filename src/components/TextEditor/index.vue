<template>
  <div id="text-editor">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { CourseImgUpload } from '@/services/course'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.initTextEditor()
  },
  methods: {
    initTextEditor () {
      const editor = new E('#text-editor')
      editor.config.onchange = (newHtml: string) => {
        this.$emit('input', newHtml)
      }
      editor.config.onchangeTimeout = 500
      // 配置 server 接口地址
      editor.config.uploadImgServer = '/upload-img'
      editor.create()
      editor.txt.html(this.value)
      // 图片上传
      editor.config.customUploadImg = async (resultFiles: any, insertImgFn: any) => {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法

        // 上传图片，返回结果，将图片插入到编辑器中
        const imgUrl = await this.courseImgUpload(resultFiles[0])
        console.log(imgUrl)
        insertImgFn(imgUrl)
      }
    },
    async courseImgUpload (option: any) {
      const fd = new FormData()
      fd.append('file', option)
      const { data } = await CourseImgUpload(fd)
      if (data.code === '000000') {
        return data.data.name
      }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
