import CartItem from '@/models/CartItem';
import * as firebase from 'firebase';
import Product from '@/models/Product';

interface State {
  cart: CartItem[];
  user: firebase.User | null;
  products: Product[];
}

export { State };
