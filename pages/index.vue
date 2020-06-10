<template>
  <div class="login">
    <login />
  </div>
    
</template>

<script>
import Login from '@/components/Login'

export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    Login
  },
  middleware: ['redirect']
}
</script>

<style lang="scss" scoped>
  .login{
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>
