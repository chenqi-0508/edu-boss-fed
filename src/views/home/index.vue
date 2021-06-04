<template>
    <div>
      <h1>home</h1>
      <el-tooltip class="item" effect="dark" :content="inputVal" placement="top-start" :disabled="!toolTipShow">
        <el-input :disabled="true" v-model="inputVal"></el-input>
      </el-tooltip>
      <el-button @click="toolTipShow = !toolTipShow">change toolTipShow</el-button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HomeIndex',
  data () {
    return {
      inputVal: '123',
      inputVal1: '',
      toolTipShow: false
    }
  }
  // watch: {
  //   toolTipShow() {

  //   }
  // }
})
</script>

<style lang="scss" scoped>

</style>
