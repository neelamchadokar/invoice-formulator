import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFormulate from '@braid/vue-formulate'
import './styles/app.css'
// import '../node_modules/@braid/vue-formulate/themes/snow/snow.scss';
Vue.use(VueFormulate)
Vue.config.productionTip = false
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
/* eslint-disable */
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
