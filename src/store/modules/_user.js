const state = {
  user: null
}

const mutations = {
    SET_USER (state, user) {
        state.user = user
    }
}

const actions = {
}

const getters = {
    user: state => state.user
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
