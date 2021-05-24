<template>
  <div>
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <create-or-edit-course
      :is-edit="true"
      :course-id="courseId"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEditCourse from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'CourseEdit',
  components: {
    CreateOrEditCourse
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      isEdit: true
    }
  },
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
