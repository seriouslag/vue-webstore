import CartItem from '@/models/CartItem';
import Product from '@/models/Product';
import {User} from 'firebase';

interface State {
  version: string;
  cart: CartItem[];
  user: User | null;
  products: Product[];
}

export { State };
