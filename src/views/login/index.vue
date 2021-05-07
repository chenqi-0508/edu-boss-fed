<template>
  <div class="login">
    <el-form class="login-form" ref="form" :model="form" label-width="80px" label-position="top">
      <el-form-item label="用户名">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="loginHandle">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      form: {
        phone: '',
        password: ''
      }
    }
  },

  methods: {
    loginHandle (): void {
      console.log('object')
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-form {
    width: 300px;
    border-radius: 5px;
    background-color: #fff;
    padding: 20px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
