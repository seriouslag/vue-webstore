import Product from '@/models/Product';
import * as firebase from 'firebase/app';

export default interface IApi {
  getProductById(id: number): Promise<Product>;
  getAllProducts(): Promise<Product[]>;
  getAllProductsByPage(pageNum: number, itemsPerPage: number): Promise<Product[]>;
  searchProductByName(name: string): Promise<Product[]>;

  signInWithProvider(provider: string): Promise<any>;
  signOut(): Promise<void>;

  getSignedInFirebaseUser(): firebase.User | null;
}
