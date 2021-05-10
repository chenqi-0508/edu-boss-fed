<template>
  <div class="login">
    <el-form
      class="login-form"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
    >
      <el-form-item label="用户名" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="loginHandle"
          :loading="logining"
          >登陆</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'login',
  data () {
    return {
      logining: false,
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    async loginHandle () {
      try {
        this.logining = true
        await (this.$refs.form as Form).validate()
        const { data } = await login(this.form)
        if (data.state !== 1 && data.state !== 200) {
          this.$message({
            showClose: true,
            message: data.message,
            type: 'error'
          })
        } else {
          this.$message({
            showClose: true,
            message: data.message,
            type: 'success'
          })
          // 将登录信息全局保存
          this.$store.commit('setUser', data.content)
          this.$router.push(this.$route.query.redirect as string || '/')
        }
      } catch (error) {
        console.log('error submit!!', error)
      } finally {
        this.logining = false
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
