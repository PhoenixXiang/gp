import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/iview.js'
// import apiConfig from '../config'
import Axios from 'axios'

const isPro = Object.is(process.env.NODE_ENV, 'production')

Axios.defaults.baseURL = isPro ? '' : '/api'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
