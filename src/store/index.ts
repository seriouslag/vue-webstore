import Vue from 'vue';
import Vuex from 'vuex';
import ProductOption from '@/models/ProductOption';

Vue.use(Vuex);

interface CartItem {
  productOption: ProductOption;
  quantity: number;
}

export default new Vuex.Store({
  state: {
    cart: [],
  },
  mutations: {
    addItemToCart (state, payloadItem: CartItem) {
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
    }
  },
  actions: {
    addItemToCart (context, item: CartItem) {
      context.commit('addItemToCart', item);
    }
  },
  getters: {
    cart: state => state.cart,
    cartItemCount: (state) => {
      let count = 0;
      state.cart.forEach((item: CartItem) => {
        count += item.quantity;
      });

      return count;
    },
  },
});
