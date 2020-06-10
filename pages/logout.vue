<template>
  
</template>

<script>
export default {
    layout: 'authenticated',
    beforeCreate() {
        this.$store.dispatch('auth/logout')
        this.$router.push('/?message=logout')
    }
}
</script>

<style>

</style>