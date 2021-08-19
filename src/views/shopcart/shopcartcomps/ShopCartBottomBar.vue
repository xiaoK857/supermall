<template>
  <div class="shop-cart-bottom-bar">
    <div class="check-area">
      <check-button class="check-btn" :isActive="isChecked" @click.native="selectAll"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计:￥<span>{{totalPrice}}</span>
    </div>
    <div class="pay">
      <span @click="payClick">去支付({{shopCartCounter}})</span>
    </div>
  </div>
</template>

<script>
  import checkButton from "components/content/checkbutton/CheckButton.vue"

  export default {
    name: "shopCartBottomBar",

    data() {
      return {
        cartList: [],
        goodsCounter: 0
      }
    },

    created() {
      this.cartList = this.$store.state.cartList

    },

    mounted() {

    },

    components: {
      checkButton
    },

    computed: {
      totalPrice() {
        let item = this.cartList
        let counter = 0
        for (let i = 0; i < item.length; i++) {
          if (item[i].checked == true) {
            /* console.log(item[i]) */
            counter += item[i].price * item[i].count
          }
        }
        return counter.toFixed(2)
      },

      shopCartCounter() {
        /* return this.cartList.length */
        let item = this.cartList
        let counter = 0
        for (let i = 0; i < item.length; i++) {
          if (item[i].checked == true) {
            counter += item[i].count
          }
        }
        this.goodsCounter = counter
        /* console.log(this.goodsCounter) */
        return counter
      },

      isChecked() {
        //用来判断购物车是否有商品，让全选按钮不显示
        if (this.cartList.length === 0) {
          return false
        }

        /* 1. 使用filter
         return !(this.cartList.filter(item => !item.checked).length)

         2. 使用find
         return !this.cartList.find(item => !item.checked) */

        for (let item of this.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    },

    methods: {
      selectAll() {
        if (this.isChecked) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      payClick() {
        if (this.goodsCounter === 0) {
          this.$toast.show("请选择商品购买!")
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .shop-cart-bottom-bar {
    height: 49px;
    background-color: #eee;
    /* position: relative;
    z-index: 9; */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
  }

  .check-area {
    display: flex;
    align-items: center;
    margin-top: 16px;
    font-size: 13px;
  }

  .check-btn {
    width: 18px;
    height: 18px;
    margin-left: 5px;
    margin-right: 10px;
  }

  .total-price {
    position: fixed;
    left: 90px;
    bottom: 64px;
    font-size: 13px;
    color: rgb(255, 83, 19);
  }

  .total-price span {
    font-size: 18px;
    margin-left: 4px;
    color: rgb(255, 83, 19);
    position: fixed;
    bottom: 59px;
    font-size: 25px;
  }

  .pay {
    height: 38px;
    width: 90px;
    position: fixed;
    right: 4px;
    bottom: 54px;
    font-size: 14px;
    border-radius: 10%;
    color: #fff;
    background-color: rgb(255, 83, 19);
  }

  .pay span {
    position: relative;
    bottom: -12px;
    right: -15px;
  }
</style>
