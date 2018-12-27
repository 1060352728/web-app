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
      errormsgpwd: ""
    }
  },
  methods: {
    login: function () {
      if(this.validate()){
        this.$axios({
            method: 'post',
            url: this.HOST+'/uaa/oauth/token',
            params:{
              username: this.username,
              password: this.password,
              grant_type: "password"
            }
          }).then(result=>{
            console.log(result.data.access_token);
          if(result.data.access_token){
            this.$store.commit("set_token",result.data.access_token);
            this.$store.commit("set_username",this.username);
            this.$router.replace({path: '/home'});
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
      this.$axios({
        method: 'post',
        url: this.HOST+'/uaa/user'
      }).then(result=>{
        if(result){
          console.log(result)
        }
      });
    },
    regist: function () {
      this.$router.push({path: '/register'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .errormsg{color: red}
</style>
