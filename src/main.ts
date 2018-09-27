import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from '@/App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import firebase from 'firebase';
import firebaseConfig from './firebase';
import '@mdi/font/css/materialdesignicons.css';
import IApi from '@/api/IApi';
import Api from '@/api/api';
import './filters';

const api: IApi = new Api();

Vue.config.productionTip = false;
Vue.prototype.$api = api;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
