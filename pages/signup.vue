<template>
  <div class="login">
    <reg />
  </div>
    
</template>

<script>
import Reg from '@/components/Reg'

export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  components: {
    Reg
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