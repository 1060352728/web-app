<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    console.log("页面重新加载。。。。。");
    if (localStorage.getItem("access_token")) {
      this.$store.commit("set_token",localStorage.getItem("access_token"));
    }
    if (localStorage.getItem("username")) {
      this.$store.commit("set_username",localStorage.getItem("username"));
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
