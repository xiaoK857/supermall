<template>
  <div class="shop-cart-list-item">
    <div class="item-selector">
      <check-button :isActive="product.checked" @click.native="checkClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ product.title }}</div>
      <div class="item-desc">{{ product.desc }}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{ product.price }}</div>
        <div class="item-count right">
          <button class="btn-left" @click="sub" :disabled="this.product.count <= 1">
            <span class="sub">-</span>
          </button>
          <span class="product-count">{{ product.count }}</span>
          <button class="btn-right" @click="add">
            <span class="add">+</span>
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import checkButton from "components/content/checkbutton/CheckButton.vue"

  export default {
    name: "shopCartListItem",
    data() {
      return {
        /* isDisabled: false */
      }
    },
    props: {
      product: {
        type: [],
        default () {
          return []
        }
      }
    },
    components: {
      checkButton,
    },
    methods: {
      checkClick() {
        this.product.checked = !this.product.checked
      },

      sub() {
        this.product.count--
      },

      add() {
        this.product.count++
      }
    }
  }
</script>

<style>
  .shop-cart-list-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title,
  .item-desc {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    align-items: center;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 15px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }

  .info-bottom .right,
  .info-bottom .left {
    display: inline-block;
  }

  .info-bottom .right {
    float: right;
  }

  .btn-left {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }

  .btn-right {
    width: 20px;
    height: 20px;
    margin-left: 8px;
  }

  .sub {
    position: relative;
    bottom: 3px;
  }

  .add{
    position: relative;
    bottom: 1px;
  }
  .product-count{
    position: relative;
    bottom: 1px;
  }
</style>
