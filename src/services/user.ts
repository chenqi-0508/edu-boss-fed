import request from '@/utils/request'
import qs from 'qs'

interface User {
  phone: string
  password: string
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

/**
 * 获取用户基本信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

/**
 * 分页查询用户信息
 */
interface userQueryParam {
  currentPage: number
  pageSize: number
  phone: number | string
  userId: number
  startCreateTime: string
  endCreateTime: string
}
export const getUserPages = (data: userQueryParam) => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}
