<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>添加菜单</span>
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
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
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
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateMenu } from '@/services/menu'

export default Vue.extend({
  name: 'create-menu',
  data () {
    return {
      form: {
        parentId: -1,
        name: '1',
        href: '2',
        icon: '3',
        orderNum: 4,
        description: '5',
        shown: false
      }
    }
  },
  methods: {
    async onSubmit () {
      console.log('submit!')
      const { data } = await createOrUpdateMenu(this.form)
      console.log(data)
    },
    handleChange () {
      console.log('handleChange!')
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
