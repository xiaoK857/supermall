<template>
  <div id="details">
    <detail-navbar class="detail-nav" @navBarClick="navBarClick1" ref="navbar" />
    <!-- <ul>
      <li>{{$store.state.cartList}}</li>
    </ul> -->
    <b-scroll class="content" :pull-up-load="true" :probetype="3" ref="content" @scroll="navBarClick2">
      <details-swiper :image-swiper="imageSwiper"></details-swiper>
      <details-base-info :goods="goods"></details-base-info>
      <details-shop-info :shop="shop"></details-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"> </detail-param-info>
      <details-comment-info :comment-info="commentInfo" ref="comment"></details-comment-info>
      <good-list :goods="recommendInfo" ref="recommend"> </good-list>
    </b-scroll>
    <detail-bottom-bar class="bottom-bar" @bottomClick="addToShopCart"></detail-bottom-bar>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import detailNavbar from "./detailscomps/DetailNavbar.vue"
  import detailsSwiper from "./detailscomps/DetailsSwiper.vue"
  import detailsBaseInfo from "./detailscomps/DetailsBaseInfo.vue"
  import detailsShopInfo from "./detailscomps/DetailsShopInfo.vue"
  import detailGoodsInfo from "./detailscomps/DetailsGoodsInfo.vue"
  import detailParamInfo from "./detailscomps/DetailsParamInfo.vue"
  import detailsCommentInfo from "./detailscomps/DetailsCommentInfo.vue"
  import detailBottomBar from "./detailscomps/DetailbottomBar.vue"

  import bScroll from "components/common/scroll/bscroll.vue"
  import goodList from "components/content/goods/goodsLists.vue"

  import {
    getDetail,
    Goods,
    Shop,
    GoodsParam,
    getRecommend
  } from "network/detail.js"

  import {
    itemListenerMixin,
    backTopMixin
  } from "common/mixin.js"

  import {
    debounce
  } from "common/utils.js"

  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        imageSwiper: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommendInfo: [],
        navBarY: [],
        getNavBarY: null,
        currentIndex: null
      }
    },
    components: {
      detailNavbar,
      detailsSwiper,
      detailsBaseInfo,
      detailsShopInfo,
      detailGoodsInfo,
      detailParamInfo,
      detailsCommentInfo,
      detailBottomBar,
      bScroll,
      goodList,
    },

    mixins: [itemListenerMixin, backTopMixin],

    destroyed() {
      this.$bus.$off("imageLoad", this.itemImageListener)
      /* console.log("111") */
    },

    mounted() {
      /*
         this.navBarY = []
         this.navBarY.push(0)
         this.navBarY.push(this.$refs.param.$el.offsetTop)
         this.navBarY.push(this.$refs.comment.$el.offsetTop)
         this.navBarY.push(this.$refs.recommend.$el.offsetTop)
         console.log("111")
       */
    },
    created() {
      this.iid = this.$route.params.iid

      getDetail(this.iid).then(res => {
        /* console.log(res) */
        const data = res.result
        this.imageSwiper = data.itemInfo.topImages

        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        this.shop = new Shop(data.shopInfo)

        this.detailInfo = data.detailInfo

        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        if (data.rate.list != 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      getRecommend().then(res => {
        /* console.log(res) */
        this.recommendInfo = res.data.list
      })
      // this.$nextTick()函数的作用：根据最新数据 当本页面的Dom渲染完后调用此方法
      // this.$nextTick(() => {})

      this.getNavBarY = debounce(() => {
        this.navBarY = []
        /* 为每次的填值,先赋一个空值,让navBarY不至于有很多个值 */
        this.navBarY.push(0)
        this.navBarY.push(this.$refs.param.$el.offsetTop - 35)
        this.navBarY.push(this.$refs.comment.$el.offsetTop - 44)
        this.navBarY.push(this.$refs.recommend.$el.offsetTop - 50)
        this.navBarY.push(Number.MAX_VALUE)
        /* console.log(this.navBarY) */
      }, 200)
    },
    methods: {
      imageLoad() {
        this.$refs.content.refresh()
        this.getNavBarY()
      },
      navBarClick1(index) {
        this.$refs.content.scrollTo(0, -this.navBarY[index], 200)
      },

      navBarClick2(position) {
        let positionY = -position.y
        let length = this.navBarY.length;
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex != i && positionY >= this.navBarY[i] &&
            positionY < this.navBarY[i + 1]) {
            this.currentIndex = i;
            this.$refs.navbar.currentIndex = this.currentIndex;
          }
        }

        //根据-position.y来判断是不是显示回到顶部的标志
        this.isShowBackTop = (-position.y) > 400
      },
      addToShopCart() {
        /* console.log("bottomClick") */
        // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.imageSwiper[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        // 2.将商品添加到购物车里
        this.$store.commit("addCart", product)

        // 错误的做法是在这里就直接给用户显示添加购物车成功，
        // 正确的做法是先去Vuex里面的action进行判断是否添加成功,然后
        // 再将添加成功的消息发出

        this.$toast.show("添加购物车成功!")

        /* this.$store.dispatch("addCart", product).then(res => {
          console.log(res)
        })
        this.addCart(product).then(res => {
          console.log(res)
          this.$toast.show(res)
        }) */
      }
    },
  }
  /* console.log(positionY)
      if (positionY > 0 && positionY <= this.$refs.param.$el.offsetTop - 44) {
        this.$refs.navbar.currentIndex = 0
      } else if (positionY > this.$refs.param.$el.offsetTop - 44 &&
        positionY <= this.$refs.comment.$el.offsetTop - 44){
          this.$refs.navbar.currentIndex = 1
        }else if(positionY > this.$refs.comment.$el.offsetTop - 44 &&
        positionY <= this.$refs.recommend.$el.offsetTop - 44){
           this.$refs.navbar.currentIndex = 2
        }else{
          this.$refs.navbar.currentIndex = 3
        }
    } */
  /* if(this.currentIndex !== i &&
       ((i < length - 1 && positionY >= this.navBarY[i] && positionY < this.navBarY[i+1])
       || (i === length - 1 && positionY >= this.navBarY[i]))){ */
</script>

<style scoped="scoped">
  #details {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .bottom-bar {
    position: relative;
    z-index: 10;
  }

  .content {
    height: calc(100% - 44px - 65px);
    overflow: hidden;
  }
</style>
