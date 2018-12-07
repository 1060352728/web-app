// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router'
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


axios.interceptors.response.use((res) => {
  if (res.status === 200) {
    return res;
  } else {
    alert(res.statusText);
    return Promise.reject(res);
  }
}, (error) => {
  if (error.response) {
    console.error('error: ', error.response);
    if (error.response.status === 500) {
      alert(error.response.data.message);
    } else if (error.response.status === 401) {
      alert('您无访问权限');
    } else {
      console.log('Error', error.message);
      alert('接口请求失败或超时！请刷新重试');
    }
  } else {
    alert('接口请求失败或超时！请刷新重试');
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem("access_token")) {
      next()
    }else {
      next({ path: '/login' })
    }
  }else {
    next()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
