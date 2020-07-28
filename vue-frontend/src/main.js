import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import Store from './store'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

const store = Store

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
