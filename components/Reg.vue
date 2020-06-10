<template>
    <el-card
        shadow="always"
        :style="{width: '500px'}"
    >   
        <el-form 
            :model="controls" 
            :rules="rules" 
            ref="form" 
            @submit.native.prevent="onSubmit"
        >
            <h1>Зарегистрироваться</h1>
            <el-form-item label="Логин" prop="login">
                <el-input v-model.trim="controls.login" />
            </el-form-item>
            <el-form-item label="Имя" prop="name">
                <el-input v-model.trim="controls.name" />
            </el-form-item>
            <el-form-item label="Пароль" prop="password">
                <el-input v-model="controls.password" type="password" />
            </el-form-item>
            <el-form-item>
                <el-button 
                    type="primary" 
                    round
                    native-type="submit"
                    :loading="loading"
                >
                    Зарегистрироваться
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    data () {
        return {
            loading: false,
            controls: {
                login: '',
                name: '',
                password: ''
            },
            rules: {
                login: [
                    { required: true, message: 'Введите логин!', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: 'Введите имя!', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: 'Введите пароль!', trigger: 'blur' },
                    { min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        onSubmit () {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.loading = true
                    try {
                        const formData = {
                            login: this.controls.login,
                            name: this.controls.name,
                            password: this.controls.password
                        }
                        await this.$store.dispatch('auth/createUser', formData)
                        this.$message.success('Вы успешно зарегестрировались')
                        this.$router.push('/?message=login')
                    }catch (e) {
                        console.log(e)
                        this.loading = false
                    }
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    h1{
        font-size: 20px;
    }
</style>