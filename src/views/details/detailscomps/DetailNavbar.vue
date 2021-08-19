<template>
  <div class="detail-navbar">
    <navbar>
      <div slot="left" class="back" @click="imgClick">
        <img src="~assets/img/common/back.svg" />
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item" :class="{active:currentIndex===index}"
          @click="itemClick(index)">
          <span>{{item}}</span>
        </div>
      </div>
    </navbar>
  </div>
</template>

<script>
  import navbar from "components/common/navbar/NavBar.vue"

  export default {
    name: "detailNavbar",
    components: {
      navbar
    },
    data() {
      return {
        titles: ["商品", "详情", "评论", "推荐"],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit("navBarClick",index)
      },
      imgClick() {
        this.$router.back()
      }
    },
  }
</script>

<style scoped="scoped">
  .title {
    display: flex;
    margin-top: 8px;
  }

  .title-item {
    flex: 1;
    font-size: 14px;

  }

  .active {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);

  }

  .back {
    margin-top: 14px;
  }
  .title-item span{
    padding: 3px;
  }
</style>
