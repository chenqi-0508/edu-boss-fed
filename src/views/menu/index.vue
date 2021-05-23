<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button @click="createMenu">添加菜单</el-button>
    </div>
    <el-table
     :data="tableData"
      style="width: 100%"
      border
    >
      <el-table-column label="编号" type="index" width="80"></el-table-column>
      <el-table-column prop="name" label="菜单名称" min-width="180"></el-table-column>
      <el-table-column prop="level" label="菜单层级" min-width="180"></el-table-column>
      <el-table-column prop="createdBy" label="创建人" min-width="180"></el-table-column>
      <el-table-column prop="href" label="路径" min-width="280"></el-table-column>
      <el-table-column prop="icon" label="图标" min-width="180"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间" min-width="180"></el-table-column>
      <el-table-column prop="shown" label="是否显示" width="80"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllMenuInfo, deleteMenu } from '@/services/menu'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    /**
     * 添加菜单按钮
     */
    createMenu () {
      this.$router.push({
        name: 'menu-create'
      })
    },
    /**
     * 获取所有菜单
     */
    async loadAllMenus () {
      const { data } = await getAllMenuInfo()
      if (data.code === '000000') {
        this.tableData = data.data
      }
    },
    /**
     * 编辑菜单
     */
    handleEdit (row: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: row.id
        }
      })
    },
    /**
     * 删除菜单
     */
    handleDelete (row: any) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await deleteMenu(row.id)
        if (data.code === '000000') {
          this.$message.success('删除成功！')
          this.loadAllMenus()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
