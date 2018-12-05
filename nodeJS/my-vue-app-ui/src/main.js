// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//import Buefy from 'buefy'
//import 'buefy/dist/buefy.css'
//Vue.use(Buefy)
Vue.config.productionTip  =  false
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
new Vue({
  el:'#app',
  router,
  template: '<App/>',
  components: { App }

})

