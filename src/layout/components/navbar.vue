<template>
  <el-header class="navbar" height="auto">
    <!-- :icon="sidebar.collapse ? 'el-icon-s-unfold' : 'el-icon- s-fold'" -->
    <el-button
      class="hamburger"
      type="text"
      icon="el-icon-s-unfold"
    ></el-button>
    <el-breadcrumb separator="/" replace>
      <el-breadcrumb-item :to="{ name: 'Home' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>Item 1</el-breadcrumb-item>
      <el-breadcrumb-item>Item 2</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <img
        class="avatar"
        :src="userInfo.portrait"
      />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="profile">
          <span>{{ userInfo.userName }}</span>
        </el-dropdown-item>
        <el-dropdown-item command="logout" divided>
          <span @click="logoutHandle">登出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'

export default Vue.extend({
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.getUserInfoHandle()
  },
  methods: {
    logoutHandle (): void {
      console.log('logoutHandle')
      this.$emit('logout')
    },
    async getUserInfoHandle () {
      const { data } = await getUserInfo()
      console.log(data)
      this.userInfo = data.content
    }
  }
})
</script>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 !important;
  background-color: $navbar-bg;

  .hamburger {
    margin-right: 10px;
    padding: 15px;
    font-size: 20px;
    border: 0;
    border-radius: 0;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .el-dropdown {
    margin-left: auto;
  }

  .avatar {
    display: block;
    margin: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-sizing: border-box;
  }
}
</style>
