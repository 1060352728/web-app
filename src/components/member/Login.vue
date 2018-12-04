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
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

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
          url: '/api/oauth/token',
          headers: {
            Authorization: 'Basic b2F1dGg6b2F1dGg='
          },
          params:{
            username: this.username,
            password: this.password,
            grant_type: "password"
          }
        }).then(result=>{
          console.log(result.status);
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .errormsg{color: red}
</style>
