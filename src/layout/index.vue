<template>
  <el-container class="wrapper">
    <app-sidebar />
    <el-container direction="vertical">
      <app-navbar />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppSidebar from './components/sidebar.vue'
import AppNavbar from './components/navbar.vue'
@Component({
  name: 'Tets',
  components: {
    AppSidebar,
    AppNavbar
  }
})
export default class Test extends Vue {}
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
}
</style>
