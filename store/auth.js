import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export const state = () => ({
    token: null
})

export const mutations = {
    setToken(state, token) {
        state.token = token
    },
    clearToken(state) {
        state.token = null
    },
    getLogin(state, login) {
        state.userId = login
    }
}

export const actions = {
    async login ({commit, dispatch}, formData) {
        try{
            const {token} = await this.$axios.$post('/api/auth/login', formData)
            dispatch('setToken', token)
            const data = jwtDecode(token)
            dispatch('getLogin', data.userId)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
        
    },
    logout({commit}) {
        this.$axios.setToken(false)
        commit('clearToken')
        Cookies.remove('jwt-token')
    },

    async createUser ({commit}, formData) {
        try {
            await this.$axios.$post('/api/auth/signup', formData)
        } catch (e) {
            commit('setError', e, {root: true})
            throw e
        }
    },
    setToken({commit}, token) {
        this.$axios.setToken(token, 'Bearer')
        commit('setToken', token)
        Cookies.set('jwt-token', token)
    },
    getLogin({commit}, login) {
        commit('getLogin', login)
    },
    autoLogin ({dispatch}) {
        const cookieStr = process.browser
            ? document.cookie
            : this.app.context.req.headers.cookie
        
        const cookies = Cookie.parse(cookieStr || '') || {}
        const token = cookies['jwt-token']
        
        if (isJWTValid(token).status) {
            dispatch('setToken', token)
            dispatch('getLogin', isJWTValid(token).getUserId)
        } else {
            dispatch('logout')
        }
    }
}

export const getters = {
    isAuthenticated: state => Boolean(state.token),
    token: state => state.token,
    userId: state => state.userId
}

function isJWTValid (token) {
    if(!token) {
        return false
    }

    const jwtData = jwtDecode(token) || {}
    const expires = jwtData.exp || 0
    // console.log(jwtData)

    return {
        status: Boolean((new Date().getTime() / 1000) < expires),
        getUserId: jwtData.userId
    }
}