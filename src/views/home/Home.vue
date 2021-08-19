<template>
  <div id="home">
    <!-- <h2>首页</h2> -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabcontrol1" class="tab-control"
      v-show="isShowTabControl" />
    <b-scroll class="content" ref="content" :probetype="3" @scroll="contentScroll" :pull-up-load="true"
      @loadMore="loadMore">
      <!-- 如果在后面使用的数据是用的驼峰写法probeType,在这里就需要写为probe-type -->
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommend="recommends" />
      <feature-views></feature-views>
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabcontrol2" />
      <goods-lists :goods="showGoods"></goods-lists>
    </b-scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import navBar from "components/common/navbar/NavBar.vue"
  import TabControl from "components/content/tabcontrol/tabControl.vue"
  import GoodsLists from "components/content/goods/goodsLists.vue"
  import bScroll from "components/common/scroll/bscroll.vue"

  import HomeSwiper from "./homecomps/HomeSwiper.vue"
  import HomeRecommendView from "./homecomps/HomeRecommendView.vue"
  import FeatureViews from "./homecomps/FeatureViews.vue"

  import {
    getHomeMultidata,
    getHomeGoods
  } from "network/home.js"
  import {
    debounce
  } from "common/utils.js"
  import {
    itemListenerMixin,
    backTopMixin
  } from "common/mixin.js"

  export default {
    name: "home",
    data() {
      return {
        banner: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          },
        },
        currentType: 'pop',
        isShowTabControl: false,
        offSetTopTabControl: 0,
        saveY: 0,
      }
    },
    components: {
      navBar,
      TabControl,
      GoodsLists,
      bScroll,

      HomeSwiper,
      HomeRecommendView,
      FeatureViews,
    },
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

    mixins: [itemListenerMixin, backTopMixin],

    mounted() {

    },
    activated() {
      this.$refs.content.scrollTo(0, this.saveY, 0)
      this.$refs.content.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.content.getScrollY()

      this.$bus.$off("imageLoad", this.itemImageListener)
      /* console.log("111") */
      /* console.log(this.saveY) */
    },
    destroyed() {
      console.log("1111")
    },
    methods: {

      //-------------------------网络请求的方法-----------------------
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          /*   console.log(res) */
          this.banner = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list) //...可以使用多个数据，类似循环
          this.goods[type].page += 1
          /* console.log(res) */

        })
      },

      //---------------------------事件监听----------------------------------

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabcontrol1.currentIndex = index
        this.$refs.tabcontrol2.currentIndex = index
        /* console.log(index) */
      },


      contentScroll(position) {
        /* console.log(position) */
        /* if (-(position.y) > 400) {
           this.isShowBackTop = true
         }else{
          this.isShowBackTop = false
         } */
        //更加简洁的写法
        this.isShowBackTop = (-position.y) > 400

        this.isShowTabControl = (-position.y) > this.offSetTopTabControl
      },

      loadMore() {
        /* console.log("上拉加载更多") */
        this.getHomeGoods(this.currentType)
        this.$refs.content.finishPullLoad()
      },

      swiperImageLoad() {
        /* console.log("222") */
        this.offSetTopTabControl = this.$refs.tabcontrol2.$el.offsetTop
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
  }
</script>

<style scoped="scoped">
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /* 这是在使用原生的js实现停留在顶部,使用的fixed布局,让它能脱离流,显示在顶部 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    z-index: 8;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
