import Vue from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router'
// import routes from './routes'
import vuetify from './plugins/vuetify'
import  './plugins/axios'
import store from './vuex/index';

// Vue.use(VueRouter);
// const router = new VueRouter({
//   routes
// })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  vuetify,
  // router,
  store
}).$mount('#app')


// new Vue({
//   render: h => h(App),
// }).$mount('#app')
