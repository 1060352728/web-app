<template>
  <div>
    <h1>我是产品</h1>
  </div>
</template>

<script>
    export default {
      name: "product",
      data () {
        return {

        }
      },
      created () {
        this.$axios({
          method: 'get',
          url: this.HOST+'/api-psc/order/findbyid',
          params: {"orderId":this.orderId}
        }).then(result=>{
          console.log(result)
          if(result.data.code===0){
            this.orderDetails = result.data.data
          }
        })
      }
    }
</script>

<style scoped>

</style>
