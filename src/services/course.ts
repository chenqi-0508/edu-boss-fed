import request from '@/utils/request'
import qs from 'qs'

/**
 * 课程上下架
 * @param data
 * @returns
 */
export const changeState = (data: any) => {
  return request({
    method: 'GET',
    url: '/boss/course/changeState',
    params: data
  })
}

/**
 * 通过课程Id获取课程信息
 * @param courseId 课程Id
 * @returns
 */
export const getCourseById = (courseId: number | string) => {
  return request({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}

/**
 * 分页查询课程信息
 */
interface courseQueryParam {
  currentPage: number
  pageSize: number
  courseName: string
  status: number
}
export const getQueryCourses = (data: courseQueryParam) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

/**
 * 保存或者更新课程信息
 * @param data
 * @returns
 */
export const saveOrUpdateCourse = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}

/**
 * 课程上传图片
 * @param data
 * @returns
 */
export const CourseImgUpload = (data: any, onUploadProgress?: (progressEvent: any) => void) => {
  return request({
    method: 'POST',
    url: '/boss/course/upload',
    data,
    onUploadProgress
  })
}
