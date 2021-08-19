<template>
  <div class="check-btn" :class="{active:isActive}">
    <img src="~assets/img/cart/tick.svg" alt=""/>
  </div>
</template>

<script>
  export default{
    name:"checkButton",
    props:{
      isActive:{
        type:Boolean,
        default:false
      }
    },

  }
</script>

<style scoped="scoped">
  .check-btn {
    border: 1px solid #ccc;
    border-radius: 50%;
    /* padding: 2px; */
  }
  /* 选中的样式 */
  .active {
    background: var(--color-high-text);
    border-color: var(--color-high-text);
  }
</style>
