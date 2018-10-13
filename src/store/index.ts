import Vue from 'vue';
import Vuex, {ActionTree, GetterTree, MutationTree} from 'vuex';
import CartItem from '@/models/CartItem';
import {State} from './StoreTypes';
import Storage from '@/utils/storage';
import {User} from 'firebase/app';
import * as createMutationsSharer from 'vuex-shared-mutations';
import UserCredential = firebase.auth.UserCredential;

Vue.use(Vuex);

const state: State =  {
  cart: [],
  user: null,
  products: [],
  version: !!process.env.APP_VERSION ? process.env.APP_VERSION : '1'
};

const mutations: MutationTree<State> = {
  async initializeStore(state: State) {
    console.log('init store');
    // Check if the ID exists
    const store: State = await Storage.getItem<State>('store');
    if (store) {
      // Replace the state object with the stored item
      const localStore: State = store;
      if (state.version === localStore.version) {
        // Some hackery to set the vuex state to set to storage state
        Object.getOwnPropertyNames(state).forEach((key: string) => {
          if (key === '__ob__') {
            return true;
          }
          // @ts-ignore
          if (localStore[key]) {
            // @ts-ignore
            state[key] = localStore[key];
            console.log(key);
          }
        });
      }

    }
  },
  addItemToCart (state: State, payloadItem: CartItem) {
    let wasInCart = false;
    const index = state.cart.findIndex(cartItem =>
      cartItem.productOption.id === payloadItem.productOption.id);
    if (index > -1) {
      wasInCart = true;
      (state.cart as CartItem[])[index].quantity =
        (state.cart as CartItem[])[index].quantity + payloadItem.quantity;
      return false;
    }
    // state.cart.forEach(
    //   (cartItem: CartItem, index: number) => {
    //     if (payloadItem.productOption.id === cartItem.productOption.id) {
    //       wasInCart = true;
    //       (state.cart as CartItem[])[index].quantity =
    //         (state.cart as CartItem[])[index].quantity + payloadItem.quantity;
    //       return false;
    //     }
    //   });
    if (!wasInCart) {
      (state.cart as CartItem[]).push(payloadItem);
    }
  },
  removeItemFromCart (state: State, payloadItem: CartItem) {
    state.cart.forEach(
      (cartItem: CartItem, index: number) => {
        if (payloadItem.productOption.id === cartItem.productOption.id) {
          (state.cart as CartItem[])[index].quantity =
            (state.cart as CartItem[])[index].quantity - payloadItem.quantity;
          return false;
        }
      }
    );
    state.cart = state.cart.filter((cartItem: CartItem) => cartItem.quantity > 0);
  },
  setUser (state: State, user: User) {
    state.user = user;
  }
};

const actions: ActionTree<State, {}> = {
  async initializeStore({commit, getters}) {
    // Check if the ID exists
    const store: State = await Storage.getItem<State>('store');
    if (store) {
      // Replace the state object with the stored item
      if (getters.version === store.version) {
        // tslint:disable-next-line
        commit('initializeStore', store)
      } else {
        await Storage.clear();
      }

    }
  },
  addItemToCart ({commit}, item: CartItem) {
    commit('addItemToCart', item);
  },
  removeItemFromCart ({commit}, item: CartItem) {
    commit('removeItemFromCart', item);
  },
  setUser ({commit}, user: UserCredential) {
    commit('setUser', user);
  },
};

const getters: GetterTree<State, {}> = {
  cart: state => state.cart,
  cartItemCount: (state) => {
    let count = 0;
    state.cart.forEach((item: CartItem) => {
      count += item.quantity;
    });

    return count;
  },
  user: state => state.user,
  products: state => state.products,
  version: state => state.version,
};

export default new Vuex.Store<State>(
  {
    state,
    mutations,
    actions,
    getters,
    plugins: [
      createMutationsSharer({ predicate: [
        'addItemToCart', 'removeItemFromCart', 'setUser',
      ]}),
    ],
  });
