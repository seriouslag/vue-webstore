import Vue from 'vue';
import Router, {Route} from 'vue-router';
import Home from './views/Home.vue';
import Storage from '@/utils/storage';
import deepEqual from 'deep-equal';

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
        /* webpackChunkName: "about" */
      component: () => import('./views/About.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/Contact.vue'),
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () =>  import('./views/ProductPage.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () =>  import('./views/CartPage.vue'),
    }
  ]
});

// if route is a refresh then clear product cache to get new data
router.beforeEach(async (to: Route, from: Route, next: Function) => {
  if ((to.name === from.name && deepEqual(to.params, from.params)) ||
    to.name === 'home' && from.name === null) {
    await Storage.removeItem('products');
    await Storage.removeItem('lastFetchedAll');
  }
  next();
});

export default router;
