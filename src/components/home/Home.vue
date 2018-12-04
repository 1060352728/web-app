<template>
  <div>
    <Header></Header>
    <div>index</div>
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
