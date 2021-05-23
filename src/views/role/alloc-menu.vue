<template>
  <el-card class="alloc-menu">
    <div slot="header" class="clearfix">
      <span>分配菜单</span>
    </div>
    <el-tree
      class="menu-tree"
      ref="menu-tree"
      :data="menu"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="checkedList"
      :props="defaultProps"
    />
    <el-button @click="handleSaveMenu" type="primary" size="small">保存</el-button>
    <el-button @click="handleClearMenu" type="text" size="small">清空</el-button>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, getRoleMenus, allocateRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menu: [],
      checkedList: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      }
    }
  },
  created () {
    this.loadMenuNodes()
    this.loadRoleMenus()
  },
  methods: {
    async loadMenuNodes () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menu = data.data
      }
    },
    // 加载用户菜单
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      if (data.code === '000000') {
        this.getCheckedList(data.data)
      }
    },
    // 获取用户菜单id[]
    getCheckedList (menus: any) {
      menus.forEach((menu: any) => {
        if (menu.selected) {
          // this.checkedList.push(menu.id as never)
          this.checkedList = [...this.checkedList, menu.id] as never
        }
        if (menu.subMenuList) {
          this.getCheckedList(menu.subMenuList)
        }
      })
    },
    // 保存按钮
    async handleSaveMenu () {
      const checkedKeys = (this.$refs['menu-tree'] as Tree).getCheckedKeys()
      const { data } = await allocateRoleMenus({
        roleId: Number(this.roleId),
        menuIdList: checkedKeys
      })
      if (data.code === '000000') {
        this.$message.success('保存成功！')
        this.$router.back()
      } else {
        this.$message.warning(data.mesg)
      }
    },
    // 清空按钮
    handleClearMenu () {
      (this.$refs['menu-tree'] as Tree).setCheckedKeys([])
    }
  }
})
</script>

<style lang="scss" scoped>
.el-card {
  height: 90vh;
}
.menu-tree {
  height: 75vh;
  overflow: auto;
  margin-bottom: 20px;
}
</style>
