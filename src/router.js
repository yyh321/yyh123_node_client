import Vue from 'vue'
import Router from 'vue-router'
import Index from "./views/index.vue";
import Register from "./views/register.vue";
import Login from "./views/login.vue";
import NotFound from "./views/404.vue";
import Home from "./views/home.vue";
import InfoShow from "./views/infoshow.vue";
import FundList from "./views/found-list.vue";

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path:'/index',
      name:'index',
      component:Index,
      children:[
        {path:'',component:Home},
        {path:'/home',component:Home},
        {path:'/infoshow',name:'infoshow',component:InfoShow},
        {path:'/fundlist',name:'fundlist',component:FundList},
      ]
    },
    {
      path:'/register',
      name:'register',
      component:Register
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'*',
      name:'notfound',
      component: NotFound
    }
   
  ]
})
//路由守卫

router.beforeEach((to,from,next) => {
  const isLogin = localStorage.getItem('eleToken') ? true : false;
  if(to.path == '/login' || to.path == '/register') {
    next();
  } else {
    isLogin ? next() : next('/login');
  }
})

export default router;