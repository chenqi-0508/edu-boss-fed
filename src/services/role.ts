import request from '@/utils/request'

interface User {
  phone: string
  password: string
}

/**
 * 获取所有角色
 */
export const getAllRoles = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

/**
 * 获取所有角色
 */
export const getRolePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}
