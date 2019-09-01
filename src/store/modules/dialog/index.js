const state = {
    dialog_service: false,
    dialog_map: false,
    dialog_question: false
}

const getters = {
    getDialogService: (state) => {
        return state.dialog_service
    },
    getDialogMap: (state) => {
        return state.dialog_map
    },
    getDialogQuestion: (state) => {
        return state.dialog_question
    }
}

const mutations = {
    updateDialogService: (state,payload) => {
        state.dialog_service = payload
    },
    updateDialogMap: (state,payload) => {
        state.dialog_map = payload
    },
    updateDialogQuestion: (state,payload) => {
        state.dialog_question = payload
    }
}

const actions = {
    commitDialogService : ({commit},payload) => {
        commit("updateDialogService",payload)
    },
    commitDialogMap: ({commit},payload) => {
        commit("updateDialogMap",payload)
    },
    commitDialogQuestion: ({commit},payload) => {
        commit("updateDialogQuestion",payload)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}