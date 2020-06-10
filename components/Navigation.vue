<template>
    <el-menu 
        router
        :default-active="$route.path" 
        class="el-menu-demo" 
        mode="horizontal"
    >
        <el-menu-item index="/">Главная</el-menu-item>
        <el-menu-item index="/signup">Регистрация</el-menu-item>
    </el-menu>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    nav{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        border-bottom: 1px solid #e6e6e6;
    }
</style>

