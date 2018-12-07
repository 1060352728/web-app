<template>
  <div>
    <h1>我是订单</h1>
  </div>
</template>

<script>
    export default {
      name: "Order",
      data () {
        return {
          orderList: ""
        }
      },
      methods: {
        getOrderList: function () {
          this.$axios({
            method: 'post',
            url: this.HOST+'/api-omc/order/list'
          }).then(result=>{

          })
        }
      }
    }
</script>

<style scoped>

</style>
