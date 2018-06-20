import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {
    app,
    user
} from './modules'

export default new Vuex.Store({
    modules: {
        app,
        user
    }
})
