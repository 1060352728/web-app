<template>
  <div>
    <p><input type="text" v-model="username" placeholder="请填写用户名"></p>
    <p><input type="text" v-model="password" placeholder="请填写密码"></p>
    <button v-on:click="registers">确认注册</button>
  </div>
</template>

<script>
    export default {
      name: "Register",
      data() {
        return {
          username: "",
          password: "",
          errormsgname: "",
          errormsgpwd: ""
        }
      },
      methods: {
        registers: function () {
          if(this.validate()){
            this.$axios({
              method: 'post',
              url: 'http://127.0.0.1:8088/api-uac/user/register',
              params:{
                username: this.username,
                password: this.password,
              }
            });
          }
          this.$router.push({path: '/login'});
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

<style scoped>

</style>
