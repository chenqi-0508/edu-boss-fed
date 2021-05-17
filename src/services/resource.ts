import request from '@/utils/request'

/**
 * 获取用户基本信息
 */
export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

/**
 * 获取用户基本信息
 */
export const getResourceCategory = (resourceId?: any) => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll',
    params: {
      resourceId
    }
  })
}
