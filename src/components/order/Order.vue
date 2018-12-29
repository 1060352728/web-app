<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>序号</th>
          <th>地址</th>
          <th>会员名称</th>
          <th>手机号</th>
          <th>总价</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in orderList">
          <td>{{index + 1}}</td>
          <td>{{item.buyerAddress}}</td>
          <td>{{item.buyerName}}</td>
          <td>{{item.buyerPhone}}</td>
          <td>{{item.orderAmount}}</td>
          <td>{{item.orderStatus|capitalize}}</td>
          <td >
            <router-link :to="{path: '/orderdetail',query:{orderId:item.orderId}}">查看详情</router-link>
            <a v-if="item.orderStatus === 0" class="finishing" v-on:click="finishOrder(item.orderId)">完结订单</a>
            <a v-else class="finished">完结订单</a>
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
          url: 'http://127.0.0.1:8088/api-omc/order/list'
        }).then(result=>{
          this.orderList = result.data.data
        })
      },
      methods: {
        finishOrder: function (orderId) {
          this.$axios({
            method: 'post',
            url: 'http://127.0.0.1:8088/api-omc/order/finish',
            params: {"orderId":orderId}
          }).then(result=>{
            if(result.data.code===0){
              this.reload()
            }
          })
        }
      },
      filters: {
        capitalize: function (value) {
          return value === 0 ? "未完结" : "已完结";
        }
      }
    }
</script>

<style scoped>
  .finishing{color: blue}
  .finished{color: red}
  .table{margin: auto}
</style>
