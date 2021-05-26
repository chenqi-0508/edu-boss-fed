<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="课程名称" prop="courseName">
              <el-input v-model="form.courseName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-input v-model="form.status"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="loading">查询</el-button>
              <el-button @click="onReset">重置</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset="2">
            <el-form-item>
              <el-button type="primary" @click="$router.push({name: 'course-create'})">添加课程</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table :data="courseList" style="width: 100%" v-loading="loading">
      <el-table-column prop="courseName" label="课程名称"> </el-table-column>
      <el-table-column prop="price" label="价格">
        <template slot-scope="scope">
          {{'$' + scope.row.price}}
        </template>
      </el-table-column>
      <el-table-column prop="sortNum" label="排序"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            :disabled="scope.row.isStatusLoading"
            @change="handleChangeState(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">内容管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      :disabled="loading"
    >
    </el-pagination>

    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-select v-model="courseRoles" multiple placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveCourseRole">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/services/course'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'CourseList',
  data () {
    return {
      loading: false,
      dialogVisible: false,
      form: {
        courseName: '',
        status: ''
      },
      courseList: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      courseRoles: [],
      currentCourseId: 0,
      options: []
    }
  },
  created () {
    // 加载课程信息
    this.loadCourseList()
  },
  methods: {
    handleCurrentChange (val: any) {
      this.page.currentPage = val
      this.loadCourseList()
    },
    handleSizeChange (val: any) {
      this.page.pageSize = val
      this.loadCourseList()
    },
    onSubmit () {
      this.loadCourseList()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
    },
    // 上下架
    async handleChangeState (row: any) {
      console.log(row)
      row.isStatusLoading = true
      await changeState({
        courseId: row.id,
        status: row.status === 0 ? 1 : 0
      })
      row.isStatusLoading = false
      this.$message.success(`${row.status === 0 ? '下架' : '上架'}成功！`)
    },
    // 分配角色按钮
    // handleAllocRole (row: any) {
    //   this.currentCourseId = row.id
    //   this.loadRolesAll()
    //   this.loadCourseRole()
    //   this.dialogVisible = true
    // },
    // // 加载所有角色
    // async loadRolesAll () {
    //   const { data } = await getRolesAll()
    //   this.options = data.data
    // },
    // // 加载该用户的角色
    // async loadCourseRole () {
    //   const { data: { data: courseRoleList } } = await getCourseRole(this.currentCourseId)
    //   this.courseRoles = courseRoleList.map((role: any) => role.id)
    // },
    // 加载用户信息
    async loadCourseList () {
      this.loading = true
      const { data } = await getQueryCourses({
        ...this.form,
        ...this.page
      } as any)
      data.data.records.forEach((course: any) => {
        course.isStatusLoading = false
      })
      this.courseList = data.data.records
      const { current, total } = data.data
      this.page.currentPage = current
      this.page.total = total
      this.loading = false
    },
    // 保存分配的角色
    async handleSaveCourseRole () {
      // const { data } = await allocateCourseRoles({
      //   courseId: this.currentCourseId,
      //   roleIdList: this.courseRoles
      // })
      // if (data.code === '000000') {
      //   this.$message.success('操作成功！')
      //   this.dialogVisible = false
      // }
    },
    handleClose () {
      console.log('object')
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
