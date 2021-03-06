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

/**
 * 保存或者更新角色
 */
export const saveOrUpdateRole = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

/**
 * 查询用户角色
 */
export const getRoleById = (id: number) => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}

/**
 * 删除用户角色
 */
export const delRoleById = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

/**
 * 查询用户角色
 */
export const getUserRole = (id: number) => {
  return request({
    method: 'GET',
    url: `/boss/role/user/${id}`
  })
}

/**
 * 获取所有角色
 */
export const getRolesAll = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

/**
 * 给用户分配角色
 */
interface allocateUserRoleForm {
  userId: number
  roleIdList: Array<any>
}
export const allocateUserRoles = (data: allocateUserRoleForm) => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}
