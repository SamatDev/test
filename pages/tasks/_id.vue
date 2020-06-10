<template>
    <article class="post" :data='post'>
        <header class="post-header">
            <div class="post-title">
                <h1>{{ post.title }}</h1>
                <nuxt-link to="/tasks" prefetch><i class="el-icon-back"></i></nuxt-link>
            </div>
            <div class="post-info">
                <small>{{ new Date(post.deadline).toLocaleDateString() }} + 24 часа</small>
            </div>
            <div class="post-info">
                <h3>Статус: <p>{{ post.status }}</p></h3>
                <h3>Приоритет: <p>{{ post.priority }}</p></h3>
            </div>
        </header>
        <main class="post-content">  
            {{ post.content }}
        </main>
        <footer v-if="editable">
            <el-tooltip class="item" effect="dark" content="Редактировать задачу" placement="top-start">
                <el-button type="primary" class="add-post" icon="el-icon-edit" circle @click="drawer = true"></el-button>
            </el-tooltip>
            <el-drawer title="I am the title" :visible.sync="drawer" :with-header="false">
                <edit-post :data="post" @updated="updatePost" />
            </el-drawer>
            <el-button type="success" @click="startPost" >Запустить задачу</el-button>
        </footer>
        <el-button v-if="doneble" type="danger" @click="stopPost" :disabled="active">Завершить задачу</el-button>
    </article>
</template>

<script>
import EditPost from '@/components/EditPost'

export default {
    layout: 'authenticated',
    data() {
        return {
            drawer: false,
            editable: true,
            doneble: false,
            active: false,
            statusColor: ''
        }
    },
    async asyncData ({store, params}) {
        const post = await store.dispatch('post/fetchById', params.id)
        return {post}
    },
    created () {
        if(this.post.status !== 'New') {
            this.editable = false
        }
        if(this.post.status === 'Processed') {
            this.doneble = true
        }
        if(this.post.status === 'Done') {
            this.active = true
            this.doneble = true
        }
    },
    methods: {
        updatePost(newPost) {
            this.post = newPost
            
            this.drawer = false
        },
        async startPost () {
            const newStatus = {
                id: this.post._id,
                status: "Processed"
            }
            const postProcessed = await this.$store.dispatch('post/updateStatus', newStatus)

            this.editable = false
            this.doneble = true
            this.post = postProcessed
        },
        async stopPost () {
            const newStatus = {
                id: this.post._id,
                status: "Done"
            }
            const postDone = await this.$store.dispatch('post/updateStatus', newStatus)

            this.editable = false
            this.active = true
            this.post = postDone
        }
    },
    components: {
        EditPost
    },
    middleware: ['auth']
}
</script>

<style lang="scss" scoped>
    .post{
        max-width: 600px;
        margin: 0 auto;
    }

    .post-title{
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        align-items: center;
    }
    .post-info{
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 1rem;
        align-items: center;
        h3{
            width: 100%;
            max-width: 250px;
            p{
                display: contents;
            }
            &:nth-child(2) {
                text-align: right;
            }
        }
    }
    footer{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .post-content{
        margin-bottom: 2rem;
    }
</style>