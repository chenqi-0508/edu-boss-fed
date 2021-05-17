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
              <el-select v-model="form.categoryId" placeholder="请选择资源分类">
                <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table :data="recources" style="width: 100%">
      <el-table-column prop="name" label="资源名称" min-width="90">
      </el-table-column>
      <el-table-column prop="url" label="资源URL" min-width="120">
      </el-table-column>
      <el-table-column prop="description" label="资源描述"> </el-table-column>
    </el-table>
    <el-pagination
     layout="prev, pager, next"
     :page-size="page.size"
     :total="page.total"
     :current-page="page.current"
     @current-change="handleCurrentChange"
     @prev-click="handlePrevClick"
     @next-click="handleNextClick"
    > </el-pagination>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages, getResourceCategory } from '@/services/resource'

export default Vue.extend({
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        categoryId: ''
      },
      page: {
        size: 10,
        total: 0,
        current: 1
      },
      recources: [],
      categoryList: []
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
      this.loadResourceList()
    },
    /**
     * 查询资源列表
     */
    async loadResourceList () {
      const { data } = await getResourcePages({
        ...this.form,
        ...this.page
      })
      if (data.code === '000000') {
        this.recources = data.data.records
        const { total, size, current } = data.data
        this.page = { total, size, current }
      }
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
     * 上一页
     */
    handlePrevClick () {
      this.page.current--
      this.loadResourceList()
    },
    /**
     * 下一页
     */
    handleNextClick () {
      this.page.current++
      this.loadResourceList()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
