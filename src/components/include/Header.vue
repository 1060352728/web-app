<template>
  <div>
    <span>你好{{username}}，欢迎使用网上商城购物系统</span>
  </div>
</template>

<script>
    export default {
      name: "Header",
      data () {
        return {
          username: this.$store.state.username ? this.$store.state.username : ""
        }
      }
    }
</script>

<style scoped>

</style>
