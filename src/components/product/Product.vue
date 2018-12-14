<template>
  <div class="main">
    <h1>我是产品</h1>
    <table class="table" v-for="item in product.data">
      <thead>
        <tr>
          <th>{{item.name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="checkbox"></td>
          <td>产品名称</td>
          <td>产品描述</td>
          <td>产品单价</td>
          <td>操作</td>
        </tr>
        <tr v-for="food in item.foods">
          <td><input type="checkbox" :value="food.id"></td>
          <td>{{food.name}}</td>
          <td>{{food.description}}</td>
          <td>{{food.price}}</td>
          <td><button>+</button><input class="text" type="text"><button>-</button></td>
        </tr>
      </tbody>
    </table>
    <div><button>下单</button></div>
  </div>
</template>

<script>
    export default {
      name: "product",
      data () {
        return {
          product: ""
        }
      },
      created () {
        this.$axios({
          method: 'get',
          url: this.HOST+'/api-psc/product/list',
        }).then(result=>{
          console.log(result);
          if(result.data.code===0){
            this.product = result.data;
          }
        })
      }
    }
</script>

<style scoped>
  .main{text-align: center}
  .text{width: 25px}
</style>
