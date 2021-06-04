<template>
  <div class="course-video">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h1>课程</h1>
        <h1>阶段</h1>
        <h1>课时</h1>
      </div>
      <el-form class="video-form" label-width="80px">
        <el-form-item label="视频上传">
          <input ref="video-file" type="file"/>
          <el-progress v-if="isVideoUpload" :percentage="videoPer"></el-progress>
        </el-form-item>
        <el-form-item label="封面上传">
          <input ref="image-file" type="file"/>
          <el-progress v-if="isImageUpload" :percentage="imagePer"></el-progress>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpload" :disabled="isStart">开始上传</el-button>
          <el-button type="primary" @click="$router.back()">返回</el-button>
        </el-form-item>
        <p v-if="isTranCode" style="color: red;">{{isTranCodeFinish ? '完成' : '正在转码，请稍后...'}}</p>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getAliyunImagUploadAddressAdnAuth,
  getAliyunVideoUploadAddressAdnAuth,
  getAliyunTransCode,
  getAliyunTransCodePercent
} from '@/services/aliyun-upload'

export default Vue.extend({
  name: 'CourseVideo',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      uploader: null,
      imageUrl: '',
      videoName: '',
      videoId: '',
      isStart: false,
      isVideoUpload: false,
      videoPer: 0,
      isImageUpload: false,
      imagePer: 0,
      isTranCode: false,
      isTranCodeFinish: false
    }
  },
  computed: {
    video (): any {
      return this.$refs['video-file']
    },
    image (): any {
      return this.$refs['image-file']
    }
  },
  created () {
    this.initUploader()
  },
  methods: {
    // 点击上传
    handleUpload () {
      this.isStart = true
      // 获取上传的文件
      const videoFile = this.video.files[0]
      const imageFile = this.image.files[0]
      this.videoName = videoFile.name
      // 获取到用户选择的文件后，添加到上传列表中。
      const uploader = (this.uploader as any)
      const paramData = '{"Vod":{}}'
      uploader.addFile(imageFile, null, null, null, paramData)
      uploader.addFile(videoFile, null, null, null, paramData)
      // 开始上传 会执行 onUploadstarted 回调函数
      uploader.startUpload()
    },
    initUploader () {
      this.uploader = new window.AliyunUpload.Vod({
        // 阿里账号ID，必须有值
        userId: '122',
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: '',
        // 分片大小默认1 MB，不能小于100 KB
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async (uploadInfo: any) => {
          console.log('onUploadstarted', uploadInfo)
          // 调用后端接口，获取上传凭证和上传地址
          let uploadAddressAndAuth
          //
          if (uploadInfo.isImage) {
            this.isImageUpload = true
            const { data } = await getAliyunImagUploadAddressAdnAuth()
            console.log('上传图片', data)
            this.imageUrl = data.data.imageURL
            uploadAddressAndAuth = data.data
          } else {
            // 上传视频
            this.isVideoUpload = true
            const { data } = await getAliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageUrl
            })
            console.log('上传视频', data)
            uploadAddressAndAuth = data.data
            this.videoId = data.data.videoId
          }
          // 调用uploader.setUploadAuthAndAddress设置上传凭证和上传地址
          (this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploadAddressAndAuth.uploadAuth,
            uploadAddressAndAuth.uploadAddress,
            uploadAddressAndAuth.imageId || uploadAddressAndAuth.videoId
          )
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo: any) {
          console.log('onUploadSucceed', uploadInfo)
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo: any, code: any, message: any) {
          console.log('onUploadFailed', uploadInfo)
        },
        // 文件上传进度，单位：字节
        onUploadProgress: (uploadInfo: any, totalSize: any, loadedPercent: any) => {
          console.log('onUploadProgress', uploadInfo, totalSize, loadedPercent)
          if (uploadInfo.isImage) {
            this.imagePer = loadedPercent * 100
          } else {
            this.videoPer = loadedPercent * 100
          }
        },
        // 上传凭证或STS token超时
        onUploadTokenExpired: function (uploadInfo: any) {
          console.log('onUploadTokenExpired', uploadInfo)
        },
        // 全部文件上传结束
        onUploadEnd: async (uploadInfo: any) => {
          console.log('onUploadEnd', uploadInfo)
          // 开始请求转码
          this.isTranCode = true
          const { data } = await getAliyunTransCode({
            lessonId: this.$route.query.lessonId,
            coverImageUrl: this.imageUrl,
            fileName: this.videoName,
            fileId: this.videoId
          })
          console.log('请求转码', data)
          // 轮询转码进度
          const timer = setInterval(async () => {
            const { data } = await getAliyunTransCodePercent(this.$route.query.lessonId as string)
            console.log(data.data)
            if (data.data === 100) {
              console.log('转码完成')
              this.isTranCodeFinish = true
              window.clearInterval(timer)
              this.isStart = false
            }
          }, 3000)
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.video-form {
  width: 20%;
}
</style>
