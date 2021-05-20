<template>
  <div class="">
    <el-form :model="form">
      <el-form-item label="角色名称" label-width="120px">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色编号" label-width="120px">
        <el-input v-model="form.code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="120px">
        <el-input v-model="form.description" autocomplete="off"></el-input>
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
export default Vue.extend({
  name: 'CreateOrEditRole',
  data () {
    return {
      form: {
        name: '',
        code: '',
        description: ''
      }
    }
  },
  methods: {
    cancle () {
      this.$emit('handleCancle')
    },
    submit () {
      this.$emit('handleSubmit')
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
