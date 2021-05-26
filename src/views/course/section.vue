<template>
  <div class="course-section">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-page-header @back="goBack" content="详情页面"/>
      </el-col>
      <el-col :span="6" :offset="12">
        <el-button type="primary">查询</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEditCourse from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'CourseSection',
  methods: {
    goBack () {
      this.$router.back()
    }
  }
})
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
</style>
