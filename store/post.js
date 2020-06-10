
export const actions = {
    async fetchPosts ({commit}) {
        try{
            return await this.$axios.$get('/api/post')
        }catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async remove ({commit}, id) {
        try{
            await this.$axios.$delete(`/api/post/${id}`)
        }catch (e) {
            commit('setError', e, {root: true})
        }
    },
    async fetchById({commit}, id) {
        try{
            return await this.$axios.$get(`/api/post/${id}`)
        }catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    async update ({commit}, formData) {
        try {
          return await this.$axios.$put(`/api/post/${formData.id}`, formData)
        } catch (e) {
          commit('setError', e, {root: true})
          throw e
        }
    },
    async updateStatus ({commit}, formData) {
        try {
          return await this.$axios.$put(`/api/post/status/${formData.id}`, formData)
        } catch (e) {
          commit('setError', e, {root: true})
          throw e
        }
    },
    async Create({commit}, formData) {
        try {
            return await this.$axios.$post('/api/post/add', formData)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    }
}