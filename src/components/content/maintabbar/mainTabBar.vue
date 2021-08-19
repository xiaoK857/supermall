<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="red">
      <!-- 使用别名，标签的属性需要使用~ -->
      <img slot="item_icon" src="~assets/img/tabbar/home.svg" alt="" />
      <img slot="item_icon_active" src="~assets/img/tabbar/home_active.svg" alt="" />
      <div slot="item_txt">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img slot="item_icon" src="~assets/img/tabbar/category.svg" alt="" />
       <img slot="item_icon_active" src="~assets/img/tabbar/category_active.svg" alt="" />
      <div slot="item_txt">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shopcart">
      <img slot="item_icon" src="~assets/img/tabbar/shopcart.svg" alt="" />
       <img slot="item_icon_active" src="~assets/img/tabbar/shopcart_active.svg" alt="" />
      <div slot="item_txt">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item_icon" src="~assets/img/tabbar/profile.svg" alt="" />
       <img slot="item_icon_active" src="~assets/img/tabbar/profile_active.svg" alt="" />
      <div slot="item_txt">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "components/common/tabbar/TabBar.vue"
  import TabBarItem from "components/common/tabbar/TabBarItem.vue"

  export default{
    name:"mainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }

</script>

<style>
</style>
