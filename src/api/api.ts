import {allUrl, apiUrl, productUrl, searchUrl} from '@/api/endpoints';
import Fetch from '@/utils/fetch';
import Product from '@/models/Product';
import IApi from '@/api/IApi';
import firebase from 'firebase/app';
import 'firebase/auth';
import Storage from '@/utils/storage';
import AuthProvider = firebase.auth.AuthProvider;

export default class Api implements IApi {
  private localProductStore: Product[] = [];
  private lastFetchedAll: number = 0;

  private async updateLocalProductStore(): Promise<Product[]> {
    return Storage.setItem<Product[]>('products', this.localProductStore);
  }

  private async updateLocalProductsFromStorage(): Promise<void> {
    if (!this.lastFetchedAll) {
      this.lastFetchedAll = await Storage.getItem<number>('lastFetchedAll');
    }
    if (this.lastFetchedAll) {
      const localProducts = await Storage.getItem<Product[]>('products');
      if (localProducts && localProducts.length) {
        this.localProductStore = localProducts;
      } else {
        this.lastFetchedAll = 0;
        await Storage.removeItem('lastFetchedAll');
        await Storage.removeItem('products');
      }
    }
  }

  constructor() {
    this.updateLocalProductsFromStorage();
  }

  async getAllProducts(): Promise<Product[]> {
    await this.updateLocalProductsFromStorage();
    if (this.lastFetchedAll + (1000 * 60 * 60 * 3) > Date.now()) {
      return Promise.resolve(this.localProductStore);
    }
    const products = await Fetch.get<Product[]>(`${apiUrl}/${productUrl}/${allUrl}`, {});
    this.localProductStore = products;
    this.lastFetchedAll = Date.now();
    await Storage.setItem<number>('lastFetchedAll', this.lastFetchedAll);
    await this.updateLocalProductStore();
    return products;
  }

  async getAllProductsByPage(pageNum: number, itemsPerPage: number): Promise<Product[]> {
    const products = await Fetch.get<Product[]>(
      `${apiUrl}/${searchUrl}?page=${pageNum}+itemsPerPage=${itemsPerPage}`, {}
      );
    products.forEach(async (product) => {
      const match =
        this.localProductStore.findIndex(localProduct => (localProduct.id === product.id));
      if (match > -1) {
        this.localProductStore[match] = product;
      } else {
        this.localProductStore.push(product);
      }
      await this.updateLocalProductStore();
    });
    return products;
  }

  async getProductById(id: number): Promise<Product> {
    const match = this.localProductStore.findIndex(localProduct => (localProduct.id === id));
    if (match > -1) {
      return Promise.resolve(this.localProductStore[match]);
    }
    const product = await Fetch.get<Product>(`${apiUrl}/${productUrl}/${id}`, {});
    this.localProductStore.push(product);
    await this.updateLocalProductStore();
    return product;
  }

  async searchProductByName(name: string): Promise<Product[]> {
    const products = await Fetch.get<Product[]>(`${apiUrl}/${searchUrl}?productName=${name}`, {});
    products.forEach(async (product) => {
      const match =
        this.localProductStore.findIndex(localProduct => (localProduct.id === product.id));
      if (match > -1) {
        this.localProductStore[match] = product;
      } else {
        this.localProductStore.push(product);
      }
      await this.updateLocalProductStore();
    });
    return products;
  }

  signInWithProvider(providerName: string): Promise<firebase.auth.UserCredential> {
    let provider: AuthProvider;
    switch (providerName) {
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider);
      default: {
        return Promise.reject('No provider specified.');
      }
    }
  }

  signOut(): Promise<void> {
    console.log('signing out');
    return firebase.auth().signOut();
  }

  getSignedInFirebaseUser(): firebase.User | null {
    return firebase.auth().currentUser;
  }
}
