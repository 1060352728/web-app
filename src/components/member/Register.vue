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
          password: ""
        }
      },
      methods: {
        registers: function () {
          this.$router.push({path: '/login'});
        }
      }
    }
</script>

<style scoped>

</style>
