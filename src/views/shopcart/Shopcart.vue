<template>
  <div class="shop-cart">
    <div class="cart-nav-bar">
      <nav-bar>
        <div slot="center">
          购物车({{shopCartLength}})
        </div>
      </nav-bar>
    </div>
    <b-scroll class="content" :pull-up-load="true" :probetype="3" ref="content">
      <shop-cart-list></shop-cart-list>
    </b-scroll>
    <shop-cart-bottom-bar></shop-cart-bottom-bar>
  </div>
</template>

<script>
  import navBar from "components/common/navbar/NavBar.vue"
  import bScroll from "components/common/scroll/bscroll.vue"

  import shopCartList from "./shopcartcomps/ShopCartList.vue"
  import shopCartBottomBar from "./shopcartcomps/ShopCartBottomBar.vue"

  /* import {
    mapGetters
  } from "vuex" */

  export default {
    name: "shopCart",
    components: {
      navBar,
      bScroll,
      shopCartList,
      shopCartBottomBar
    },
    computed: {
      shopCartLength() {
        return this.$store.state.cartList.length
      },

      /* 把getters转为计算属性的两种方法
      1. 数组形式
      ...mapGetters(['getCount'])
      2. 对象形式
      ...mapGetters({
          count: "getCount"
        }
      } */
    },
    activated() {
      console.log(this.$refs.content.scroll)
      this.$refs.content.refresh()
    }
  }
</script>

<style scoped="scoped">
  .shop-cart {
    height: 100vh;
  }

  .cart-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
   /* position: relative;
    z-index: 9; */
  }

  .content {
    height: calc(100% - 44px - 49px - 49px);
    overflow: hidden;
  }
</style>
