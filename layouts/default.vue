<template>
  <el-container>
    <el-header>
      <app-navigation />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import AppNavigation from '@/components/Navigation'

export default{
  components: {
    AppNavigation
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(value) {
      this.$message.error(value.response.data.message)
    }
  }
}

</script>
