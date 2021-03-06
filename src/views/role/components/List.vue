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
              <el-button type="primary" @click="onSubmit" :disabled="loading"
                >查询</el-button
              >
              <el-button @click="onReset" :disabled="loading">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button @click="handleAdd" type="primary" size="small"
        >添加角色</el-button
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
          <el-button @click="handleEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >
          <el-button @click="handleDelete(scope.row)" type="text" size="small"
            >删除</el-button
          >
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

    <el-dialog :title="isEdit ? '编辑角色' : '添加角色'" :visible.sync="dialogFormVisible">
      <CreateOrEdit
        v-if="dialogFormVisible"
        :is-edit="isEdit"
        :role-id="roleId"
        @handleCancle="cancleForm"
        @handleSubmit="submitForm"
      />
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getRolePages, delRoleById } from '@/services/role'
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
      dialogFormVisible: false,
      isEdit: false,
      roleId: -1
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
      this.$router.push({
        name: 'alloc-menu',
        params: {
          roleId: row.id
        }
      })
    },
    /**
     * 分配资源
     */
    allotResource (row: any) {
      this.$router.push({
        name: 'alloc-resource',
        params: {
          roleId: row.id
        }
      })
    },
    /**
     * 提交弹窗表单
     */
    submitForm () {
      this.dialogFormVisible = false
      this.loadAllRoles() // 重新加载数据
    },
    /**
     * 弹窗取消按钮
     */
    cancleForm () {
      this.dialogFormVisible = false
    },
    /**
     * 编辑按钮
     */
    handleEdit (row: any) {
      this.isEdit = true
      this.roleId = row.id
      this.dialogFormVisible = true
    },
    /**
     * 删除按钮
     */
    handleDelete (row: any) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await delRoleById(row.id)
        if (data.code === '000000') {
          this.loadAllRoles() // 重新加载数据
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message.warning(data.mesg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /**
     * 添加按钮
     */
    handleAdd () {
      this.dialogFormVisible = true
      this.isEdit = false
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
