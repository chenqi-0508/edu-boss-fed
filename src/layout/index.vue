<template>
  <el-container class="wrapper">
    <app-sidebar />
    <el-container direction="vertical">
      <app-navbar @logout="logout" />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppSidebar from './components/sidebar.vue'
import AppNavbar from './components/navbar.vue'

export default Vue.extend({
  components: {
    AppSidebar,
    AppNavbar
  },
  methods: {
    logout (): void {
      console.log('logout')
      // 清除缓存登录信息
      this.$store.commit('removeUser')
      // 返回登录页面
      this.$router.push({
        name: 'login'
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
}
</style>
