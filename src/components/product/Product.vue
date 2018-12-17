<template>
  <div class="main">
    <h1>我是产品</h1>
    <table class="table">
      <thead>
        <tr>
          <th><input type="checkbox" v-model="checked" v-on:click='checkedAll'></th>
          <th>产品名称</th>
          <th>产品描述</th>
          <th>产品单价</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody v-for="item in product.data">
        <tr>
          <th>{{item.name}}</th>
        </tr>
        <tr v-for="food in item.foods">
          <td><input type="checkbox" v-model='checkedList' :value="food.id" v-on:click="checkedOne(food.id)"></td>
          <td>{{food.name}}</td>
          <td>{{food.description}}</td>
          <td>{{food.price}}</td>
          <td><button v-on:click="addno(food.id)">+</button><input readonly class="text" type="text" v-bind:value="productno[food.id]"><button v-on:click="subno(food.id)">-</button></td>
        </tr>
      </tbody>
    </table>
    <div><span class="address">请输入地址：</span><input type="text" v-model="orderMsg.address"><span class="address" v-if="addresserror">{{addresserror}}</span></div>
    <div><span class="address">请输入手机号：</span><input type="text" v-model="orderMsg.phone"><span class="address" v-if="phoneerror">{{phoneerror}}</span></div>
    <div><button v-on:click="creatOrder">下单</button></div>
  </div>
</template>

<script>
    export default {
      name: "product",
      data () {
        return {
          product: "",
          productno: {},
          productIds: [],
          checked: false,
          checkedList: [],
          addresserror: "",
          phoneerror: "",
          item: {"productId":"","productQuantity":""},
          orderMsg: {
            "name":"", "phone":"", "address":"", "openid":"","items":[]
          }
        }
      },
      created () {
        this.$axios({
          method: 'get',
          url: this.HOST+'/api-psc/product/list',
        }).then(result=>{
          if(result.data.code===0){
            this.product = result.data;
            result.data.data.forEach(v=>{
              v.foods.forEach(x=>{
                this.$set(this.productno,x.id,1);
                this.productIds.push(x.id);
              });
            });
          }
        })
      },
      methods: {
        addno: function (id) {
          this.productno[id] = this.productno[id] + 1;
        },
        subno: function (id) {
          if(this.productno[id]>1){
            this.productno[id] = this.productno[id] - 1;
          }
        },
        checkedAll: function () {
          this.checked = !this.checked;
          if (this.checked) {
            this.productIds.forEach(item=>{
                this.checkedList.push(item)
            });
          } else {
            this.checkedList = [];
          }
        },
        checkedOne: function (checkedId) {
          if(this.checkedList.indexOf(checkedId) > 0){
            this.checkedList.splice(checkedId, 1)
          }else{
            this.checkedList.push(checkedId)
          }
        },
        creatOrder: function () {
          this.orderMsg.items = [];
          this.addresserror = "";
          this.phoneerror = "";
          if(this.orderMsg.address === ""){
            this.addresserror = "请填写地址";
            return false;
          }
          if(this.orderMsg.phone === ""){
            this.phoneerror = "请填写手机号";
            return false;
          }
          this.$axios({
            method: 'post',
            url: this.HOST+'/api-uac/user/findbyusername',
            params:{
              username: "seller"
            }
          }).then(result=>{
            this.orderMsg.name = result.data.username;
            this.orderMsg.openid = result.data.openid;
            this.checkedList.forEach(items=>{
              this.item = {};
              this.item.productId = items;
              this.item.productQuantity = this.productno[items];
              this.orderMsg.items.push(this.item);
            });
            this.$axios({
              method: 'post',
              url: this.HOST+'/api-omc/order/creat',
              data: this.$qs.stringify({
                name: this.orderMsg.name,
                phone: this.orderMsg.phone,
                address: this.orderMsg.address,
                openid: this.orderMsg.openid,
                items: JSON.stringify(this.orderMsg.items)
              })
            }).then(result=>{
              alert(result.data.msg)
            });
          });
        }
      }
    }
</script>

<style scoped>
  .main{text-align: center}
  .text{width: 25px;}
  .table{margin: auto}
  .address{color: red}
</style>
