<template>
  <div class="shop-cart-list">
    <div class="list">
      <shop-cart-list-item v-for="(item,index) in cartList" :key=index :product="item"></shop-cart-list-item>
    </div>
  </div>
</template>

<script>
  import shopCartListItem from "./ShopCartListItem.vue"

  export default {
    name: "shopCartList",
    data() {
      return {
        cartList: []
      }
    },
    components: {
      shopCartListItem
    },
    computed: {
      getCartList() {
        if (this.$store.state.cartList != null) {
          this.cartList = this.$store.state.cartList
          /* console.log(this.cartList) */
          return this.cartList
        } else {
          this.cartList = []
        }
      }
    },
    created() {
      this.getCartList
    }
  }
</script>

<style scoped="scoped">

</style>
