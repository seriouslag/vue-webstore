import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dataSource: {
      products: {

      }
    }
  },
  mutations: {

  },
  actions: {
  },
  getters: {
    dataSource: state => state.dataSource,
  },
});
