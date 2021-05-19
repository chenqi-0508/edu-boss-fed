<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="资源名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资源路径">
              <el-input v-model="form.url"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资源分类">
              <el-select v-model="form.categoryId" placeholder="请选择资源分类" clearable>
                <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button @click="onReset">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table :data="recources" style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="资源名称" min-width="90">
      </el-table-column>
      <el-table-column prop="url" label="资源URL" min-width="120">
      </el-table-column>
      <el-table-column prop="description" label="资源描述"> </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.current"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getResourcePages, getResourceCategory } from '@/services/resource'

export default Vue.extend({
  data () {
    return {
      form: {
        name: '',
        url: '',
        categoryId: ''
      },
      page: {
        size: 10,
        total: 0,
        current: 1
      },
      recources: [],
      categoryList: [],
      loading: false
    }
  },
  created () {
    // 查询资源列表
    this.loadResourceList()
    // 查询资源分类列表
    this.loadResourceCategory()
  },
  methods: {
    /**
     * 查询按钮
     */
    onSubmit () {
      console.log('submit!')
      this.page.current = 1
      this.loadResourceList()
    },
    /**
     * 查询资源列表
     */
    async loadResourceList () {
      this.loading = true
      const { data } = await getResourcePages({
        ...this.form,
        ...this.page
      })
      if (data.code === '000000') {
        this.recources = data.data.records
        const { total, size, current } = data.data
        this.page = { total, size, current }
      }
      this.loading = false
    },
    /**
     * 查询资源分类列表
     */
    async loadResourceCategory () {
      const { data } = await getResourceCategory()
      if (data.code === '000000') {
        this.categoryList = data.data
      }
    },
    /**
     * 页数点击
     */
    handleCurrentChange (val: number) {
      this.page.current = val
      this.loadResourceList()
    },
    /**
     * 设置分页数
     */
    handleSizeChange (val: any) {
      console.log(`每页 ${val} 条`)
      this.page.size = val
      this.loadResourceList()
    },
    /**
     * 重置
     */
    onReset () {
      (this.$refs.form as Form).resetFields()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
