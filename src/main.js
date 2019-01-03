// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import router from './router'
import axios from 'axios'
import qs from 'qs';

Vue.prototype.$qs = qs;
Vue.prototype.$axios = axios;
Vue.prototype.HOST = '/api';
Vue.config.productionTip = false;

axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  config => {
    config.headers.contentType = 'application/x-www-form-urlencoded';
    if(config.url.indexOf("/uaa/oauth/token") != -1){
      config.headers.Authorization = 'Basic b2F1dGg6b2F1dGg='
    }else{
      //判断access_token是否过期
      if((new Date().getTime() - localStorage.getItem("login_time")) / 1000 - localStorage.getItem("expires_in") >= 0){
        //需要刷新token
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8088/uaa/oauth/token',
          params:{
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
            grant_type: "refresh_token",
            refresh_token: localStorage.getItem("refresh_token")
          }
        }).then(result=>{
          if(result.data.access_token){
            localStorage.setItem("access_token",result.data.access_token);
            localStorage.setItem("refresh_token",result.data.refresh_token);
            localStorage.setItem("expires_in",result.data.expires_in);
          }else{
            router.replace({path: '/'});//返回不了
          }
        })
      }
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
    if (error.response.status === 500) {
      alert(error.response.data.message);
    } else if (error.response.status === 401) {
      alert('您无访问权限');
    }else if (error.response.status === 403) {
      alert('您无访问权限');
    } else {
      alert('接口请求失败或超时！请刷新重试');
    }
  } else {
    alert('您无访问权限');
  }
  return error.response;
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
