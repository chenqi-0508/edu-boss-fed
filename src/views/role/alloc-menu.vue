<template>
  <el-card class="alloc-menu">
    <div slot="header" class="clearfix">
      <el-tree
        ref="menu-tree"
        :data="menu"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="[5]"
        :props="defaultProps"
      />
    </div>
    <el-button @click="handleSaveMenu" type="primary" size="small">保存</el-button>
    <el-button @click="handleClearMenu" type="text" size="small">清空</el-button>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getMenuNodeList, getRoleMenus, allocateRoleMenus } from '@/services/menu'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'alloc-menu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menu: [],
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
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId)
      if (data.code === '000000') {
        console.log(data.data)
      }
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
      } else {
        this.$message.warning(data.mesg)
      }
    },
    // 清空按钮
    handleClearMenu () {
      console.log('claer')
    }
  }
})
</script>

<style lang="scss" scoped>
.alloc-menu {
  // height: 100vh;
  // background-color: #fff;
  // padding: 20px;
}
</style>
