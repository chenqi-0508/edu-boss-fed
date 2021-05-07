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
import qs from 'qs'

export default Vue.extend({
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      }
    }
  },

  methods: {
    async loginHandle () {
      const { data } = await (this as any).$request({
        method: 'POST',
        url: '/front/user/login',
        data: qs.stringify(this.form)
      })
      if (data.state !== 1 && data.state !== 200) {
        this.$message({
          showClose: true,
          message: data.message,
          type: 'error'
        })
      }
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
