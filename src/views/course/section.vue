<template>
  <div class="course-section">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-page-header @back="goBack" content="详情页面"/>
          </el-col>
          <el-col :span="6" :offset="12">
            <el-button type="primary">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        draggable
        :allow-drop="allowDrop"
      >
        <div class="tree-item" slot-scope="{ node, data }">
          <template v-if="data.sectionName">
            <span>{{ data.sectionName }}</span>
            <span>
              <el-button type="primary">编辑</el-button>
              <el-button type="primary">添加课时</el-button>
              <el-button type="primary">状态</el-button>
            </span>
          </template>
          <template v-else>
            <span>{{ data.theme }}</span>
            <span>
              <el-button type="primary">编辑</el-button>
              <el-button type="success" @click="$router.push({
                name: 'course-video',
                params: {
                  courseId: courseId
                },
                query: {
                  sectionId: node.parent.id,
                  lessonId: data.id
                }
              })">上传视频</el-button>
              <el-button type="primary">状态</el-button>
            </span>
          </template>
        </div>
      </el-tree>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSectionAndLesson } from '@/services/section'

export default Vue.extend({
  name: 'CourseSection',
  data () {
    return {
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label (data: any) {
          return data.sectionName || data.theme
        }
      }
    }
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.loadSectionAndLesson()
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    async loadSectionAndLesson () {
      const { data } = await getSectionAndLesson(this.courseId)
      console.log(data)
      this.sections = data.data
    },
    allowDrop (draggingNode: any, dropNode: any, type: string) {
      console.log(draggingNode, dropNode, type)
      return draggingNode.data.sectionId === dropNode.data.sectionId && type !== 'inner'
    }
  }
})
</script>

<style lang="scss" scoped>
.tree-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}
::v-deep .el-tree-node__content {
  padding: 10px 0;
}
</style>
