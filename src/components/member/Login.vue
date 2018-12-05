<template>
  <div>
    <div>
      <div>
        <span>用户名：</span><input type="text" v-model="username">
        <p><span class="errormsg" v-if="errormsgname">{{errormsgname}}</span></p>
      </div>
      <div>
        <span>密　码：</span><input type="text" v-model="password">
        <p><span class="errormsg" v-if="errormsgpwd">{{errormsgpwd}}</span></p>
      </div>
      <div>
        <button v-on:click="login">登　录</button>
        <button v-on:click="testtoken">测试</button>
        <button v-on:click="logout">退出</button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
  name: 'Login',
  data () {
    return {
      username: "",
      password: "",
      errormsgname: "",
      errormsgpwd: ""
    }
  },
  methods: {
    login: function () {
      if(this.validate()){
        axios({
          method: 'post',
          url: this.HOST+'/uaa/oauth/token',
          headers: {
            Authorization: 'Basic b2F1dGg6b2F1dGg='
          },
          params:{
            username: this.username,
            password: this.password,
            grant_type: "password"
          }
        }).then(result=>{
          if(result.data.access_token){
            this.$store.commit("set_token",result.data.access_token)
          }
        });
      }
    },
    validate: function () {
      if(!this.username){
        this.errormsgname = "请输入用户名";
        return false;
      }
      this.errormsgname = "";
      if(!this.password){
        this.errormsgpwd = "请输入密码";
        return false;
      }
      this.errormsgpwd = "";
      return true;
    },
    testtoken: function () {
      console.log(this.$store.state.access_token);
      axios({
        method: 'post',
        url: this.HOST+'/uaa/user',
        headers: {
          "Authorization": "Bearer " + this.$store.state.access_token
        },
      }).then(result=>{
        if(result){
          console.log(result)
        }
      });
    },
    logout: function () {
      this.$store.commit("del_token")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .errormsg{color: red}
</style>
