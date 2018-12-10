<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>地址</th>
          <th>会员名称</th>
          <th>手机号</th>
          <th>总价</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orderList">
          <td>{{item.buyerAddress}}</td>
          <td>{{item.buyerName}}</td>
          <td>{{item.buyerPhone}}</td>
          <td>{{item.orderAmount}}</td>
          <td>{{item.orderStatus|capitalize}}</td>
          <td v-if="item.orderStatus === 0">
            <a class="finishing" v-on:click="finishOrder(item.orderId)">完结订单</a>
          </td>
          <td v-else>
            <a class="finished">完结订单</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
    export default {
      name: "Order",
      inject: ["reload"],
      data () {
        return {
          orderList: ""
        }
      },
      created () {
        console.log("订单列表初始化。。。。。");
        this.$axios({
          method: 'get',
          url: this.HOST+'/api-omc/order/list'
        }).then(result=>{
          this.orderList = result.data.data
        })
      },
      methods: {
        finishOrder: function (orderId) {
          this.$axios({
            method: 'post',
            url: this.HOST+'/api-omc/order/finish',
            params: {"orderId":orderId}
          }).then(result=>{
            if(result.data.data.code==200){
              this.reload()
            }
          })
        }
      },
      filters: {
        capitalize: function (value) {
          return value == 0 ? "未完结" : "已完结";
        }
      }
    }
</script>

<style scoped>
  .finishing{color: blue}
  .finished{color: red}
</style>
