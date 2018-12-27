<template>
  <div>
    <span>你好</span><span class="namecolor">{{username}}</span><span>，欢迎使用网上商城购物系统</span>
    <span class="logout"><a v-on:click="logout">退出</a></span>
  </div>
</template>

<script>
    export default {
      name: "Header",
      data () {
        return {
          username: this.$store.state.username ? this.$store.state.username : ""
        }
      },
      methods: {
        logout: function () {
          this.$axios({
            method: 'delete',
            url: this.HOST+'/uaa/oauth/token',
            data: {"access_token":localStorage.getItem("access_token")}
          }).then(result=>{
            console.log(result);
            this.$store.commit("del_token");
            this.$store.commit("del_username");
            this.$router.push({path: '/'});
          });
        }
      }
    }
</script>

<style scoped>
  .namecolor{color: red}
  .logout{color: blue}
</style>
