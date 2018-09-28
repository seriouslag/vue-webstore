import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from '@/App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import '@mdi/font/css/materialdesignicons.css';
import IApi from '@/api/IApi';
import Api from '@/api/api';
import './filters';
import FirebaseInitializer from '@/firebase';
import * as firebase from 'firebase';

const api: IApi = new Api();

Vue.config.productionTip = false;
Vue.prototype.$api = api;

// Initialize Firebase
FirebaseInitializer.init();

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      store.dispatch('setUser', firebaseUser);
    });
  }
}).$mount('#app');
