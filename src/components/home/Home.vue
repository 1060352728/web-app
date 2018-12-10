<template>
  <div>
    <Header></Header>
    <div>
      <router-link to="/product">产品列表</router-link>
      <router-link to="/order">订单列表</router-link>
      <router-view v-if="isRouterAlive"/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>

  import Header from '@/components/include/Header';
  import Footer from '@/components/include/Footer';

  export default {
    name: "index",
    provide () {
      return{
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
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
