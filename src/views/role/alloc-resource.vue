<template>
  <el-card class="alloc-resource">
    <div slot="header" class="clearfix">
      <span>分配资源</span>
    </div>
    <el-tree
      class="resource-tree"
      ref="resource-tree"
      :data="resource"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="checkedList"
      :props="defaultProps"
    />
    <el-button @click="handleSaveResource" type="primary" size="small">保存</el-button>
    <el-button @click="handleClearResource" type="text" size="small">清空</el-button>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourceNodeList, getRoleResources, allocateRoleResources } from '@/services/resource'
import { Tree } from 'element-ui'

export default Vue.extend({
  name: 'AllocResource',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      resource: [],
      checkedList: [],
      defaultProps: {
        children: 'subResourceList',
        label: 'name'
      }
    }
  },
  created () {
    this.loadResourceNodes()
    this.loadRoleResources()
  },
  methods: {
    async loadResourceNodes () {
      const { data } = await getResourceNodeList()
      if (data.code === '000000') {
        this.resource = data.data
      }
    },
    // 加载用户菜单
    async loadRoleResources () {
      const { data } = await getRoleResources(this.roleId)
      if (data.code === '000000') {
        this.getCheckedList(data.data)
      }
    },
    // 获取用户菜单id[]
    getCheckedList (resources: any) {
      resources.forEach((resource: any) => {
        if (resource.selected) {
          // this.checkedList.push(resource.id as never)
          this.checkedList = [...this.checkedList, resource.id] as never
        }
        // if (resource.subResourceList) {
        //   this.getCheckedList(resource.subResourceList)
        // }
      })
    },
    // 保存按钮
    async handleSaveResource () {
      const checkedKeys = (this.$refs['resource-tree'] as Tree).getCheckedKeys()
      const { data } = await allocateRoleResources({
        roleId: Number(this.roleId),
        resourceIdList: checkedKeys
      })
      if (data.code === '000000') {
        this.$message.success('保存成功！')
        this.$router.back()
      } else {
        this.$message.warning(data.mesg)
      }
    },
    // 清空按钮
    handleClearResource () {
      (this.$refs['resource-tree'] as Tree).setCheckedKeys([])
    }
  }
})
</script>

<style lang="scss" scoped>
.el-card {
  height: 90vh;
}
.resource-tree {
  height: 75vh;
  overflow: auto;
  margin-bottom: 20px;
}
</style>
