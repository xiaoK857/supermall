import {
  debounce
} from "./utils.js"

import backTop from "components/content/backtop/backTop.vue"

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.content.refresh, 200)
    this.itemImageListener = () => {
      /* console.log("111") */
      refresh()
      //每加载一个图片就进行一次refresh()效率很低，现在需要进行一次防抖函数
    }
    this.$bus.$on("imageLoad", this.itemImageListener)
    /* console.log("222") */
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    backTop,
  },
  methods: {
    backTopClick() {
      this.$refs.content.scrollTo(0, 0, 1500)
    },
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: 'pop'
    }
  },
  methods: {
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
      console.log(this.currentType);
    }
  }
}
