<template>
  <div class="goods">
    <goods-lists-item v-for="item in goods" :goods-item="item" :key="item.id"/>
  </div>
</template>

<script>
  import goodsListsItem from "./goodsListsItem.vue"

  export default{
    name:"goodsLists",
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      goodsListsItem
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }
</style>
