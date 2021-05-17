<template>
  <div class="menu-edit">
    <create-or-edit :is-edit="true"></create-or-edit>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'MenuEdit',
  data () {
    return {
    }
  },
  components: {
    CreateOrEdit
  }
})
</script>

<style lang="scss" scoped>
</style>
