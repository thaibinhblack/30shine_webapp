import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import BookingModule from './modules/booking'
import DialogModule from './modules/dialog'
const state = {
    overlay: true,
    message: {
        type: null,
        text: null
    },
    BASE_URL: 'http://127.0.0.1:8000/api/v1/',
    PUBLIC_URL: 'http://127.0.0.1:8000/'
}

const getters = {
    getOverlay: (state) => {
        return state.overlay
    },
    getMessage: (state) => {
        return state.message
    },
    BASE_URL: (state) => {
        return state.BASE_URL
    },
    PUBLIC_URL: (state) => {
        return state.PUBLIC_URL
    }
}

const mutations = {
    updateOverlay: (state,payload) => {
        state.overlay = payload
    },
    updateMessage: (state,payload) => {
        state.message = payload
    }
}

const actions = {
    commitOverlay: ({commit},payload) => {
        commit("updateOverlay",payload)
    },
    commitMessage: ({commit},payload) => {
        commit("updateMessage",payload)
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        BookingModule,
        DialogModule
    }
})