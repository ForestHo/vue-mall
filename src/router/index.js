import Vue from 'vue';
import Router from 'vue-router';
// import Home from 'pages/home';
// import Category from 'pages/category';
// import Cart from 'pages/cart';
// import Search from 'pages/search';
// import Personal from 'pages/personal';
// import Product from 'pages/product';

Vue.use(Router);

const routes = [
  {
    name: 'home',
    path: '/home',
    component: () => import('pages/home'),
    //二级路由的写法
    children:[
      {
        name: 'home-product',
        /*二级路由的前面一定不能加斜杠/ */
        path: 'product/:id',
        component: () => import('pages/product'),
      }
    ]
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('pages/category'),
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('pages/cart'),
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('pages/search'),
  },
  {
    name: 'personal',
    path: '/personal',
    component: () => import('pages/personal'),
  },
  {
    /*任意输入其它路径，跳转到首页*/
    path: '*',
    redirect: '/home'
  }
];
export default new Router({
  routes
});
