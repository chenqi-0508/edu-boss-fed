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
        src="https://edu-lagou.oss-cn-beijing.aliyuncs.com/images/2020/07/10/15943594999396473.png"
      />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="profile">Admin</el-dropdown-item>
        <el-dropdown-item command="logout" divided>登出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'AppAside'
})
export default class Test extends Vue {}
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
