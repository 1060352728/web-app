// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'

Vue.prototype.$axios = axios;
Vue.prototype.HOST = '/api';
Vue.config.productionTip = false;

axios.interceptors.request.use(
  config => {
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    if(config.url.indexOf("/uaa/oauth/token") != -1){
      config.headers.Authorization = 'Basic b2F1dGg6b2F1dGg='
    }else{
      if(localStorage.getItem("access_token")){
        config.headers.Authorization = "Bearer " + localStorage.getItem("access_token")
      }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
