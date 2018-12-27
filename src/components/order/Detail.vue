<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>买家姓名</th>
          <th>买家电话</th>
          <th>买家地址</th>
          <th>订单编号</th>
          <th>订单金额</th>
          <th>订单状态</th>
          <th>支付状态</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{orderDetails.buyerName}}</td>
          <td>{{orderDetails.buyerPhone}}</td>
          <td>{{orderDetails.buyerAddress}}</td>
          <td>{{orderDetails.orderId}}</td>
          <td>{{orderDetails.orderAmount}}</td>
          <td>{{orderDetails.orderStatus}}</td>
          <td>{{orderDetails.payStatus}}</td>
        </tr>
      </tbody>
    </table>
    <table class="table">
      <thead>
        <tr>
          <th>产品名称</th>
          <th>产品数量</th>
          <th>产品单价</th>
          <th>产品价格</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orderDetails.orderDetailList">
          <td>{{item.productName}}</td>
          <td>{{item.productQuantity}}</td>
          <td>{{item.productPrice}}</td>
          <td>{{item.productQuantity * item.productPrice}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
      name: "Detail",
      data() {
        return {
          orderId: this.$route.query.orderId,
          orderDetails: ""
        };
      },
      created () {
        this.$axios({
          method: 'get',
          url: this.HOST+'/api-omc/order/findbyid',
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
  .table{margin: auto}
</style>
