import request from '@/utils/request'

/**
 * 获取阿里云图片上传凭证
 * @returns
 */
export const getAliyunImagUploadAddressAdnAuth = () => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json'
  })
}

/**
 * 获取阿里云视频上传凭证
 * @param params
 * @returns
 */
export const getAliyunVideoUploadAddressAdnAuth = (params: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params
  })
}

/**
 * 阿里云转码请求
 * @param data
 * @returns
 */
export const getAliyunTransCode = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload/aliyunTransCode.json',
    data
  })
}

/**
 * 阿里云转码进度
 * @param lessonId
 * @returns
 */
export const getAliyunTransCodePercent = (lessonId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/course/upload/aliyunTransCodePercent.json',
    params: {
      lessonId
    }
  })
}
