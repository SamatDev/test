<template>
    <el-card
        shadow="always"
    >   
        <el-form 
            :model="controls" 
            :rules="rules" 
            ref="form" 
            @submit.native.prevent="onSubmit"
        >
            <h1>Создание задачи</h1>
            <el-form-item label="Название задачи" prop="title">
                <el-input v-model="controls.title" />
            </el-form-item>
            <el-form-item label="Описание задачи" prop="content">
                <el-input v-model="controls.content" :rows="2" type="textarea" />
            </el-form-item>
            <el-form-item label="Дедлайн + 24 часа" prop="deadline">
                <el-date-picker
                    v-model="controls.deadline"
                    type="date"
                    placeholder="Выберите день">
                </el-date-picker>
            </el-form-item>
            <el-form-item label='Укажите приоритет' prop="priority">
                <template>
                    <el-radio v-model="controls.priority" label="Low">Low</el-radio>
                    <el-radio v-model="controls.priority" label="Medium">Medium</el-radio>
                    <el-radio v-model="controls.priority" label="High">High</el-radio>
                </template>
            </el-form-item>

            <el-form-item>
                <el-button 
                    type="primary" 
                    round
                    native-type="submit"
                    :loading="loading"
                >
                    Сохранить
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
                title: this.$attrs.data.title,
                content: this.$attrs.data.content,
                deadline: this.$attrs.data.deadline,
                priority: this.$attrs.data.priority,
                author: this.$store.state.auth.userId
            },
            rules: {
                title: [
                    { required: true, message: 'Введите Название!', trigger: 'blur' },
                ],
                content: [
                    { required: true, message: 'Введите Описание', trigger: 'blur' },
                    { min: 6, message: 'Описание должно быть не менее 6 символов', trigger: 'blur' }
                ],
                deadline: [
                    { required: true, message: 'Укажите дедлайн', trigger: 'blur' }
                ],
                priority: [
                    {required: true, message: 'Укажите приоритет!', trigger: 'blur'}
                ]
            }
        }
    },
    async asyncData ({store, params}) {
        const post = await store.dispatch('post/fetchById', params.id)
        return {post}
    },
    methods: {
        onSubmit () {
            this.$refs.form.validate(async valid => {
                if (valid) {
                    this.loading = true
                    try {
                        const formData = {
                            title: this.controls.title,
                            content: this.controls.content,
                            deadline: this.controls.deadline,
                            priority: this.controls.priority,
                            author: this.controls.author,
                            id: this.$attrs.data._id
                        }
                        const postUpdated = await this.$store.dispatch('post/update', formData)
                        console.log(postUpdated)
                        this.$message.success('Задача обновлена!')
                        this.loading = false

                        this.$emit('updated', postUpdated)
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