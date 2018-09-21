import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from '@/App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import firebase from 'firebase';
import firebaseConfig from './firebase';

Vue.config.productionTip = false;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
