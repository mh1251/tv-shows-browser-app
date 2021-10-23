import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from '../router.js'

Vue.use(VueRouter)

Vue.config.productionTip = false;

export const bus = new Vue();

new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')
