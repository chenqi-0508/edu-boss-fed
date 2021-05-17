import request from '@/utils/request'

interface Menu {
  id?: number
  parentId: number
  name: string
  href: string
  icon?: string
  orderNum?: number
  description?: string
  shown?: boolean
}

/**
 * 保存或新增菜单
 * @param data
 * @returns
 */
export const createOrUpdateMenu = (data: Menu) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

/**
 * 获取所有菜单并按层级展示
 * @returns
 */
export const getMenuInfo = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuNodeList'
  })
}

/**
 * 获取所有菜单
 * @returns
 */
export const getAllMenuInfo = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

/**
 * 删除菜单
 * @param id 菜单id
 * @returns
 */
export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: '/boss/menu/' + id
  })
}

/**
 * 获取编辑菜单页面信息
 * @param id
 * @returns
 */
export const getEditMenuInfo = (id: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

/**
 * 根据ID查询菜单
 * @param id
 * @returns
 */
export const getMenuInfoById = (id: number) => {
  return request({
    method: 'GET',
    url: `/boss/menu/${id}`
  })
}
