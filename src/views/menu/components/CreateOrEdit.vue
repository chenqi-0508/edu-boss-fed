<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ isEdit ? '编辑菜单' : '添加菜单' }}</span>
    </div>
    <div class="text item">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.href"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.parentId" placeholder="请选择上级菜单">
            <el-option label="无上级菜单" :value="-1"></el-option>
            <el-option
             :label="item.name"
             :value="item.id"
             v-for="item in parentMenuList"
             :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="前端图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch v-model="form.shown"></el-switch>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.orderNum" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{ isEdit ? '保存' : '立即创建' }}</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateMenu, getMenuInfo, getEditMenuInfo } from '@/services/menu'

export default Vue.extend({
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        parentId: -1,
        name: '',
        href: '',
        icon: '',
        orderNum: 0,
        description: '',
        shown: false
      },
      parentMenuList: []
    }
  },
  created () {
    this.loadMenuInfo()
  },
  methods: {
    /**
     * 提交
     */
    async onSubmit () {
      console.log('submit!')
      const { data } = await createOrUpdateMenu(this.form)
      if (data.code === '000000') {
        this.$message.success('添加成功！')
        this.$router.back()
      }
    },
    /**
     * 取消
     */
    cancel () {
      this.$router.back()
    },
    /**
     * 获取一级菜单列表
     */
    async loadMenuInfo () {
      if (this.isEdit) {
        const id = this.$route.params.id
        const { data } = await getEditMenuInfo(id)
        if (data.code === '000000') {
          this.form = data.data.menuInfo
          this.parentMenuList = data.data.parentMenuList
        }
      } else {
        const { data } = await getMenuInfo()
        if (data.code === '000000') {
          this.parentMenuList = data.data
        }
      }
    },

    handleChange () {
      console.log('handleChange!')
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
