<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="角色编码" prop="code">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="角色描述" prop="description">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="loading">查询</el-button>
              <el-button @click="onReset" :disabled="loading">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button @click="dialogFormVisible = true" type="primary" size="small">添加角色</el-button
      >
    </div>
    <el-table :data="roles" style="width: 100%" v-loading="loading">
      <el-table-column prop="code" label="角色编码" min-width="90">
      </el-table-column>
      <el-table-column prop="name" label="角色名称" min-width="120">
      </el-table-column>
      <el-table-column prop="description" label="角色描述" min-width="120">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="allotMenu(scope.row)" type="text" size="small"
            >分配菜单</el-button
          >
          <el-button @click="allotResource(scope.row)" type="text" size="small"
            >分配资源</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      :disabled="loading"
    >
    </el-pagination>

    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <CreateOrEdit
        @handleCancle="cancleForm"
        @handleSubmit="submitForm"
      />
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getRolePages } from '@/services/role'
import CreateOrEdit from './CreateOrEdit.vue'

export default Vue.extend({
  name: 'RoleList',
  data () {
    return {
      form: {
        name: '',
        code: '',
        description: ''
      },
      page: {
        size: 10,
        total: 0,
        current: 1
      },
      roles: [],
      loading: false,
      dialogFormVisible: false
    }
  },
  components: {
    CreateOrEdit
  },
  created () {
    this.loadAllRoles()
  },
  methods: {
    /**
     * 查询按钮
     */
    onSubmit () {
      console.log('submit!')
      this.page.current = 1
      this.loadAllRoles()
    },
    /**
     * 获取角色列表
     */
    async loadAllRoles () {
      this.loading = true
      const { data } = await getRolePages({
        ...this.form,
        ...this.page
      })
      console.log(data)
      if (data.code === '000000') {
        this.roles = data.data.records
        const { total } = data.data
        this.page.total = total
      }
      this.loading = false
    },
    /**
     * 页数点击
     */
    handleCurrentChange (val: number) {
      this.page.current = val
      this.loadAllRoles()
    },
    /**
     * 设置分页数
     */
    handleSizeChange (val: any) {
      console.log(`每页 ${val} 条`)
      this.page.size = val
      this.loadAllRoles()
    },
    /**
     * 重置
     */
    onReset () {
      (this.$refs.form as Form).resetFields()
    },
    /**
     * 分配菜单
     */
    allotMenu (row: any) {
      console.log(row)
    },
    /**
     * 分配资源
     */
    allotResource (row: any) {
      console.log(row)
    },
    /**
     * 提交弹窗表单
     */
    submitForm () {
      this.dialogFormVisible = false
    },
    /**
     * 弹窗取消按钮
     */
    cancleForm () {
      this.dialogFormVisible = false
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
