<template>
  <div class="tab_bar_item" @click="itemClick">
    <!-- 使用具名插槽 -->
    <div v-if="!isActive">
      <slot name="item_icon"></slot>
    </div>
    <div v-else>
       <slot name="item_icon_active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item_txt"></slot>
    </div>
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="" />
    <div>首页</div> -->
  </div>
</template>

<script>
  export default{
    name:"TabBarItem",
    props:{
      path:String,
      activeColor:{
        type:String,
        default:"red"
      }
    },
    data() {
      return{
       /* isActive:true */
      }
    },
    methods:{
      itemClick(){
        /* console.log("11") */
        this.$router.push(this.path)
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
        return this.isActive ? {color:this.activeColor}:{}
      },
    },
  }
</script>

<style scoped>
  .tab_bar_item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab_bar_item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
