import Vue from 'vue';
import Vuex, {ActionTree, GetterTree, MutationTree} from 'vuex';
import CartItem from '@/models/CartItem';
import * as firebase from 'firebase';
import {State} from './StoreTypes';

Vue.use(Vuex);

const state: State | (() => State) =  {
  cart: [],
  user: null,
  products: [],
};

const mutations: MutationTree<State> = {
  addItemToCart (state: State, payloadItem: CartItem) {
    let wasInCart = false;
    state.cart.forEach(
      (cartItem: CartItem, index: number) => {
        if (payloadItem.productOption.id === cartItem.productOption.id) {
          wasInCart = true;
          (state.cart as CartItem[])[index].quantity =
            (state.cart as CartItem[])[index].quantity + 1;
          return false;
        }
      });
    if (!wasInCart) {
      (state.cart as CartItem[]).push(payloadItem);
    }
  },
  setUser (state: State, user: firebase.User) {
    state.user = user;
  }
};

const actions: ActionTree<State, {}> = {
  addItemToCart ({commit}, item: CartItem) {
    commit('addItemToCart', item);
  },
  setUser ({commit}, user) {
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
};

export default new Vuex.Store<State>({ state, mutations, actions, getters});
