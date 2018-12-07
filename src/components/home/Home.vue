<template>
  <div>
    <Header></Header>
    <div>
      <router-link to="/product">产品列表</router-link>
      <router-link to="/order">订单列表</router-link>
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

  import Header from '@/components/include/Header';
  import Footer from '@/components/include/Footer';

  export default {
    name: "index",
    data() {
      return {
        msg: ""
      }
    },
    components: {
        Header,
        Footer
    }
  }

</script>

<style scoped>

</style>
