import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state: {
      access_token: localStorage.getItem("access_token") ? localStorage.getItem("access_token") : ""
    },
    mutations: {
      set_token (state, token){
        state.access_token = token
        localStorage.setItem("access_token", token)
      },
      del_token (state){
        state.access_token = ""
        localStorage.removeItem("access_token")
      }
    }
  })
}
