import request from '@/utils/request'

/**
 * 获取课程章节
 * @param courseId
 * @returns
 */
export const getSectionAndLesson = (courseId: string | number) => {
  return request({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId
    }
  })
}
