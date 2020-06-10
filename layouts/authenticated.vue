<template>
  <el-container>
    <el-header>
      <app-navigation-auth />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
import AppNavigationAuth from '@/components/NavigationAuth'

export default{
  components: {
    AppNavigationAuth
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