<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button @click="createMenu">添加菜单</el-button>
    </div>
    <div class="text item">
      {{ "列表内容 "}}
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'menu',
  methods: {
    createMenu () {
      this.$router.push({
        name: 'create-menu'
      })
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
