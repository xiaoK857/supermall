import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:"",
    redirect:"/home"
  },
  {
    path:"/home",
    component:()=>import("views/home/Home.vue")
  },
  {
    path:"/category",
    component:()=>import("views/category/Category.vue")
  },
  {
    path:"/shopcart",
    component:()=>import("views/shopcart/Shopcart.vue")
  },
  {
    path:"/profile",
    component:()=>import("views/profile/Profile.vue")
  },
  {
    path:"/detail/:iid",
    component:()=>import("views/details/Detail.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,//BASE_URL动态获取路径
  routes
})

export default router
