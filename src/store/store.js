import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    state: {
      access_token: localStorage.getItem("access_token") ? localStorage.getItem("access_token") : "",//access_token
      refresh_token: localStorage.getItem("refresh_token") ? localStorage.getItem("refresh_token") : "",//refresh_token
      expires_in: localStorage.getItem("expires_in") ? localStorage.getItem("expires_in") : "",//失效时间expires_in
      login_time: localStorage.getItem("login_time") ? localStorage.getItem("login_time") : 0,//登录时间
      username: '',//用户名
      password: "" //密码
    },
    mutations: {
      set_token (state, token){
        state.access_token = token;
        localStorage.setItem("access_token", token)
      },
      del_token (state){
        state.access_token = "";
        localStorage.removeItem("access_token")
      },
      set_refresh_token (state, refresh_token){
        state.refresh_token = refresh_token;
        localStorage.setItem("refresh_token", refresh_token)
      },
      del_refresh_token (state){
        state.refresh_token = "";
        localStorage.removeItem("refresh_token")
      },
      set_expires_in (state, expires_in){
        state.expires_in = expires_in;
        localStorage.setItem("expires_in", expires_in)
      },
      del_expires_in (state){
        state.expires_in = "";
        localStorage.removeItem("expires_in")
      },
      set_login_time (state, login_time){
        state.login_time = login_time;
        localStorage.setItem("login_time", login_time)
      },
      set_username (state, username){
        state.username = username;
        localStorage.setItem("username", username)
      },
      del_username (state){
        state.username = "";
        localStorage.removeItem("username")
      },
      set_password (state, password){
        state.password = password;
        localStorage.setItem("password", password)
      },
      del_password (state){
        state.password = "";
        localStorage.removeItem("password")
      }
    }
  })
}
