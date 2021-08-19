import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      /* console.log(state.cartList) */
      payload.checked = true
      if (oldProduct) {
        oldProduct.count += 1
      } else {
        payload.count = 1
        state.cartList.push(payload)
      }
    }
  },
  actions: {
    /* addCart(context, payload) {
      return new Promise((resolve, reject) => {
        console.log(context.cartList)

        let oldProduct = context.cartList.find(item => item.iid === payload.iid)
        if (oldProduct) {
          // oldProduct.count += 1
          context.commit("addCart", oldProduct)
          resolve("商品数量+1")
        } else {
          payLoad.count = 1
          // context.state.cartList.push(payLoad)
          context.commit("addToShopCart", payLoad)
          resolve("成功添加购物车")
        }
      })
    } */
  },
  modules: {}
})
