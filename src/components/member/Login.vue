<template>
  <div>
    <div>
      <div>
        <span>用户名：</span><input type="text" v-model="username" v-on:click="removeError">
        <p><span class="errormsg" v-if="errormsgname">{{errormsgname}}</span></p>
      </div>
      <div>
        <span>密　码：</span><input type="text" v-model="password" v-on:click="removeError">
        <p><span class="errormsg" v-if="errormsgpwd">{{errormsgpwd}}</span></p>
      </div>
        <p><span class="errormsg" v-if="errormsg">{{errormsg}}</span></p>
      <div>
        <button v-on:click="login">登　录</button>
        <button v-on:click="regist">注　册</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      username: "",
      password: "",
      errormsgname: "",
      errormsgpwd: "",
      errormsg: ""
    }
  },
  methods: {
    login: function () {
      this.$store.commit("set_login_time",new Date().getTime());
      if(this.validate()){
        this.$axios({
            method: 'post',
            url: 'http://127.0.0.1:8088/uaa/oauth/token',
            params:{
              username: this.username,
              password: this.password,
              grant_type: "password"
            }
          }).then(result=>{
          if(result.data.access_token){
            this.$store.commit("set_token",result.data.access_token);
            this.$store.commit("set_refresh_token",result.data.refresh_token);
            this.$store.commit("set_expires_in",result.data.expires_in);
            this.$store.commit("set_username",this.username);
            this.$store.commit("set_password",this.password);
            this.$router.replace({path: '/home'});//返回不了
          }else if(result.data == 401){
            this.errormsg = "用户名不存在";
          }else {
            this.errormsg = "密码错误";
          }
        });
      }
    },
    validate: function () {
      this.errormsg = "";
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
      this.$axios({
        method: 'post',
        url: 'http://127.0.0.1:8088/uaa/user'
      }).then(result=>{
        if(result){
          console.log(result)
        }
      });
    },
    regist: function () {
      this.$router.push({path: '/register'});
    },
    removeError: function () {
      this.errormsg = "";
      this.errormsgname = "";
      this.errormsgpwd = "";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .errormsg{color: red}
</style>
