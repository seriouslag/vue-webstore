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
import LocalUser from '@/models/User';

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
      let saveUser: LocalUser | null = null;
      if (user !== null) {
        saveUser = {
          displayName: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          photoUrl: user.photoURL,
          isAnonymous: user.isAnonymous,
        };
      }

      await store.dispatch('setUser', saveUser);
    });
    // Subscribe to store updates
    store.subscribe(async (mutation, state) => {
      console.log('saving store state');
      // Store the state object as a JSON string
      try {
        const saving = await Storage.setItem('store', state);
        console.log('save success', saving);
      } catch (error) {
        console.log('save error', error, state);
      }
    });
  },
  render: h => h(App),
}).$mount('#app');
