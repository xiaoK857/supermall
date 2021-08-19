<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "bScroll",
    props: {
      probetype: {
        type: Number,
        default: 1
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      /* console.log(document.querySelector(".wrapper")) */
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probetype,
        pullUpLoad: this.pullUpLoad,
        click: true
      })

      /* console.log(this.scroll) */ /* 查看scroll对象的各种属性，
      其中有一个scrollerHeight能够查看当前的能滑动的高度 */

      this.scroll.on("scroll", (position) => {
        /* console.log(position) */
        this.$emit("scroll", position)
      })

      this.scroll.on("pullingUp", () => {
        /* console.log("上拉加载更多！") */
        this.$emit("loadMore")
      })
    },
    methods: {
      scrollTo(x, y, time = 500) {
        this.scroll && this.scroll.scrollTo(x, y, time)//通过逻辑与&&判断this.scroll对象是不是已经有值
      },

      finishPullLoad() {
        this.scroll && this.scroll.finishPullUp()
      },

      refresh(){
        this.scroll && this.scroll.refresh()
      },
      
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    },
  }
</script>

<style>
</style>
