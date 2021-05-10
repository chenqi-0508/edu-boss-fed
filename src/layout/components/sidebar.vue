<template>
  <el-aside class="sidebar" width="auto">
    <!-- 如果已收起，则作⽤ collapse 类名 -->
    <router-link class="logo" :to="{ name: 'home' }" title="Back to Home">
      <!-- <img src="@/assets/logo.png" alt="LagouEdu" /> -->
      <h1>Edu Boss</h1>
    </router-link>
    <!-- 如果菜单已收起，则给 el-submenu 作⽤ collapse 属性 -->
    <el-menu router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-lock"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="role">
          <i class="el-icon-lock"></i>
          <span>⻆⾊列表</span>
        </el-menu-item>
        <el-menu-item index="menu">
          <i class="el-icon-lock"></i>
          <span>菜单列表</span>
        </el-menu-item>
        <el-menu-item index="resource">
          <i class="el-icon-lock"></i>
          <span>资源列表</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="course">
        <i class="el-icon-film"></i>
        <span slot="title">课程管理</span>
      </el-menu-item>
      <el-menu-item index="user">
        <i class="el-icon-user"></i>
        <span slot="title">⽤户管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>⼴告管理</span>
        </template>
        <el-menu-item index="advert">
          <i class="el-icon-menu"></i>
          <span>⼴告列表</span>
        </el-menu-item>
        <el-menu-item index="advert-space">
          <i class="el-icon-menu"></i>
          <span>⼴告位列表</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'Sidebar'
})
export default class Test extends Vue {}
</script>

<style lang="scss" scoped>
.sidebar {
  position: sticky;
  top: 0;
  max-height: 100vh;
  background-color: $sidebar-bg;
  user-select: none;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 2em;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 2em;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #495057;
    line-height: 50px;
    text-decoration: none;
    text-align: center;

    &:hover {
      color: #343a40;
      background-color: rgba(0, 0, 0, 0.05);
    }

    img {
      margin: 10px;
      width: 30px;
    }

    h1 {
      display: inline-block;
      margin: 0;
      width: 95px;
      overflow: hidden;
      font-size: 20px;
      white-space: nowrap;
      transition: width 0.3s;
    }

    &.collapse {
      h1 {
        width: 0;
      }
    }
  }

  .el-menu {
    border-right: 0 !important;
    background-color: transparent;

    &:not(.el-menu--collapse) {
      width: 200px;
    }

    .el-menu-item:hover,
    .el-menu-item:focus,
    .el-submenu__title:hover {
      background-color: $body-bg;
    }
  }
}
</style>
