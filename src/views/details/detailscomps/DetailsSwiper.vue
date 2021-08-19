<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="item in imageSwiper" :key="item.id">
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>
</template>

<script>
  import {
    Swiper,
    SwiperItem
  } from "components/common/swiper/index.js"

  export default {
    name: "detailsSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      imageSwiper: {
        type: Array,
        default () {
          return []
        }
      }
    },
  }
</script>

<style>
  .detail-swiper{
    height: 300px;
    overflow: hidden;
  }
</style>
