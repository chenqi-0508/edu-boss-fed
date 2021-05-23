import request from '@/utils/request'

/**
 * 按条件分页查询资源
 */
export const getResourcePages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

/**
 * 查询资源分类列表
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

/**
 * 获取所有资源
 */
export const getResourceNodeList = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

/**
 * 获取角色拥有的资源列表
 */
export const getRoleResources = (roleId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/resource/getRoleResources',
    params: {
      roleId
    }
  })
}

/**
 * 给角色分配资源
 */
interface allocateRoleResourceForm {
  roleId: number | string
  resourceIdList: Array<any>
}
export const allocateRoleResources = (data: allocateRoleResourceForm) => {
  return request({
    method: 'POST',
    url: '/boss/resource/allocateRoleResources',
    data
  })
}
