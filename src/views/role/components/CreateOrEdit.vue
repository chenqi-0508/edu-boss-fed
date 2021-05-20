<template>
  <div class="">
    <el-form ref="role" :model="role">
      <el-form-item label="角色名称" prop="name" label-width="120px">
        <el-input v-model="role.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色编号" prop="code" label-width="120px">
        <el-input v-model="role.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description" label-width="120px">
        <el-input v-model="role.description" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getRoleById, saveOrUpdateRole } from '@/services/role'

export default Vue.extend({
  name: 'CreateOrEditRole',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      role: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  created () {
    if (this.isEdit) {
      this.loadRole()
    }
  },
  methods: {
    cancle () {
      (this.$refs.role as Form).resetFields()
      this.$emit('handleCancle')
    },
    async submit () {
      const { data } = await saveOrUpdateRole(this.role)
      if (data.code === '000000') {
        this.$message.success('保存成功！')
        this.$emit('handleSubmit');
        (this.$refs.role as Form).resetFields()
      } else {
        this.$message.warning(data.mesg)
      }
    },
    async loadRole () {
      const { data } = await getRoleById(this.id)
      if (data.code === '000000') {
        this.role = { ...data.data }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
