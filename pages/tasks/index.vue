<template>
    <div class="posts-wrap">
        <h1>Задачи</h1>
        <el-table
        :data="posts"
        style="width: 100%">
            <el-table-column 
                prop="title"
                label="Название"
            />
            <el-table-column label="Дедлайн">
            <template slot-scope="{row: {deadline}}">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ new Date(deadline).toLocaleDateString() }} + 24 часа</span>
            </template>
            </el-table-column>
            <el-table-column 
                prop="priority"
                label="Статус"
            />
            <el-table-column label="Приоритет"> 
                <template slot-scope="{row: {status}}">
                    <span style="margin-left: 10px">{{ status }}</span>
                </template>
            </el-table-column>
            <el-table-column
            label="Действия">
            <template slot-scope="{row}">
                    <el-tooltip class="item" effect="dark" content="Открыть задачу" placement="top-start">
                        <el-button
                        type="primary"
                        circle
                        icon='el-icon-caret-right'
                        @click="openPost(row._id)" />
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="Удалить задачу" placement="top-start">
                        <el-button
                        icon='el-icon-delete'
                        type="danger"
                        circle
                        @click="remove(row._id)" />
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <el-tooltip class="item" effect="dark" content="Добавить задачу" placement="top-start">
            <el-button type="primary" class="add-post" icon="el-icon-plus" circle @click="drawer = true"></el-button>
        </el-tooltip>
        <el-drawer title="I am the title" :visible.sync="drawer" :with-header="false">
            <add-post @created="newPostAdd" />
        </el-drawer>
    </div>
  
</template>



<script>
import AddPost from '@/components/AddPost'

export default {
    layout: 'authenticated',
    data() {
        return{
            drawer: false
        }
    },
    async asyncData ({store}) {
        const posts = await store.dispatch('post/fetchPosts')
        return {posts}
    },
    methods: {
        handleClose () {
            console.log(this.drawer)
            this.drawer = false
        },
        openPost(id) {
            // const id = this.post._id
            this.$router.push(`/tasks/${id}`)
        },
        async remove(id) {
            try{
                await this.$confirm('Удалить пост?', 'Внимание!', {
                    confirmButtonText: 'Подтвердить',
                    cancelButtonText: 'Отменить',
                    type: 'warning'
                })

                await this.$store.dispatch('post/remove', id)
                this.posts = this.posts.filter(p => p._id !== id)

                this.$message.success('Пост успешно удален!')
            }catch (e) {console.log(e)}
        },
        newPostAdd(newpost) {

            this.posts.unshift(newpost)

            this.drawer = false
            
        }
    },
    components: {
        AddPost
    },
    middleware: ['auth']
}
</script>


<style lang="scss" scoped>
    .posts-wrap{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }
    .add-post{
        margin-top: 2rem;
    }
</style>