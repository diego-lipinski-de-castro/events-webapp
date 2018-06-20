import './registerServiceWorker'

import Vue from 'vue'

Vue.config.silent = false
Vue.config.devtools = true
Vue.config.productionTip = true

Vue.config.keyCodes = {
  // v: 86,
  // f1: 112,
  // "media-play-pause": 179,
  // up: [38, 87]
}

// Vue.config.errorHandler = (err, vm, info) => {
//     console.log('------------------')
//     console.log('*** Vue error log ***')
//     console.error('err: ' + err)
//     console.warn('vm: ' + vm)
//     console.warn('info: ' + info)
//     console.log('------------------')
// }

// Vue.config.warnHandler = (msg, vm, trace) => {
//     console.log('------------------')
//     console.log('*** Vue warn log ***')
//     console.warn('msg: ' + msg)
//     console.warn('vm: ' + vm)
//     console.error('trace: ' + trace)
//     console.log('------------------')
// }

import lodash from 'lodash'
Vue.prototype.$lodash = lodash

import qs from 'qs'
Vue.prototype.$qs = qs

import store from './store'
import router from './router'

import { sync } from 'vuex-router-sync'
sync(store, router, { moduleName: 'router' })

import LoadingOverlayPlugin from './packages/vue-loading-overlay/src'
Vue.use(LoadingOverlayPlugin)

import httpClient from './http'
Vue.prototype.$axios = httpClient

import App from './App.vue'

new Vue({
    name: 'root',
    router,
    store,
    render: h => h(App)
}).$mount('#app')
