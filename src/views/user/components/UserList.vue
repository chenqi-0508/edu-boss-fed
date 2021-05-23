<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="用户编号" prop="userId">
              <el-input v-model="form.userId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="注册时间" prop="dateRange">
              <el-date-picker
                v-model="form.dateRange"
                format="yyyy/MM/dd"
                value-format="yyyy-MM-dd"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary" @click="onSubmit" :disabled="loading">查询</el-button>
              <el-button @click="onReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table :data="userList" style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="用户名"> </el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
      <el-table-column prop="createTime" label="注册时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleAllocRole(scope.row)" type="text" size="small">分配角色</el-button>
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
      <el-select v-model="userRoles" multiple placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveUserRole">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages } from '@/services/user'
import { getUserRole, getRolesAll, allocateUserRoles } from '@/services/role'
import { Form } from 'element-ui'

export default Vue.extend({
  name: 'UserList',
  data () {
    return {
      loading: false,
      dialogVisible: false,
      form: {
        userId: '',
        phone: '',
        startCreateTime: '',
        endCreateTime: '',
        dateRange: []
      },
      userList: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      userRoles: [],
      currentUserId: 0,
      options: []
    }
  },
  watch: {
    'form.dateRange' (newVal) {
      if (!newVal) {
        this.form.dateRange = []
        this.form.startCreateTime = ''
        this.form.endCreateTime = ''
      } else {
        this.form.startCreateTime = newVal[0]
        this.form.endCreateTime = newVal[1]
      }
    }
  },
  created () {
    // 加载用户信息
    this.loadUserList()
  },
  methods: {
    handleCurrentChange (val: any) {
      this.page.currentPage = val
      this.loadUserList()
    },
    handleSizeChange (val: any) {
      this.page.pageSize = val
      this.loadUserList()
    },
    onSubmit () {
      this.loadUserList()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.startCreateTime = ''
      this.form.endCreateTime = ''
    },
    // 分配角色按钮
    handleAllocRole (row: any) {
      this.currentUserId = row.id
      this.loadRolesAll()
      this.loadUserRole()
      this.dialogVisible = true
    },
    // 加载所有角色
    async loadRolesAll () {
      const { data } = await getRolesAll()
      this.options = data.data
    },
    // 加载该用户的角色
    async loadUserRole () {
      const { data: { data: userRoleList } } = await getUserRole(this.currentUserId)
      this.userRoles = userRoleList.map((role: any) => role.id)
    },
    // 加载用户信息
    async loadUserList () {
      this.loading = true
      const { data } = await getUserPages({
        ...this.form,
        ...this.page
      } as any)
      this.userList = data.data.records
      const { current, total } = data.data
      this.page.currentPage = current
      this.page.total = total
      this.loading = false
    },
    // 保存分配的角色
    async handleSaveUserRole () {
      const { data } = await allocateUserRoles({
        userId: this.currentUserId,
        roleIdList: this.userRoles
      })
      if (data.code === '000000') {
        this.$message.success('操作成功！')
        this.dialogVisible = false
      }
    },
    handleClose () {
      console.log('object')
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
