<template>
  <swiper>
    <swiper-item v-for="item in banner" :key="item.id">
      <a :href="item.link">
        <img :src="item.image" @load="swiperImageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper/index.js"

  export default{
    name: "HomeSwiper",
    data() {
      return{
        isLoad:false
      }
    },
    props: {
      banner: {
        type:Array,
        default() {
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      swiperImageLoad(){
        /* console.log("111") */
        if(!this.isLoad){
          this.$emit("swiperImageLoad")
          this.isLoad = true
        }
        
      }
    }
  }
</script>

<style>
</style>
