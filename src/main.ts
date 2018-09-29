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
import Storage from './utils/storage';
import './filters';
import FirebaseInitializer from '@/firebase';
import firebase, {User} from 'firebase/app';
import 'firebase/auth';

const api: IApi = new Api();

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$storage = Storage;

new Vue({
  router,
  store,
  async beforeCreate() {
    // Initialize Firebase before storage
    // because it takes a long time and the created hook will fire before FB is init
    await FirebaseInitializer.init();
    // Initialize local storage
    await Storage.init();
    console.log('store is init');
    // Initialize store
    this.$store.commit('initialiseStore');
  },
  created () {
    // Initialize auth change listener
    firebase.auth().onAuthStateChanged(async (user: User | null) => {
      await store.dispatch('setUser', user);
    });
    // Subscribe to store updates
    store.subscribe(async (mutation, state) => {
      console.log('saving store state');
      // Store the state object as a JSON string
      await Storage.setItem('store', state);
    });
  },
  render: h => h(App),
}).$mount('#app');
