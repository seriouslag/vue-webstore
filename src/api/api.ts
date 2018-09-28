import {allUrl, apiUrl, productUrl, searchUrl} from '@/api/endpoints';
import Fetch from '@/utils/fetch';
import Product from '@/models/Product';
import IApi from '@/api/IApi';
import * as firebase from 'firebase';
import AuthProvider = firebase.auth.AuthProvider;

export default class Api implements IApi {
  private localProductStore: Product[] = [];

  async getAllProducts(): Promise<Product[]> {
    const products = await Fetch.get<Product[]>(`${apiUrl}/${productUrl}/${allUrl}`, {});
    this.localProductStore = products;
    return products;
  }

  async getAllProductsByPage(pageNum: number, itemsPerPage: number): Promise<Product[]> {
    const products = await Fetch.get<Product[]>(
      `${apiUrl}/${searchUrl}?page=${pageNum}+itemsPerPage=${itemsPerPage}`, {}
      );
    products.forEach((product) => {
      const match =
        this.localProductStore.findIndex(localProduct => (localProduct.id === product.id));
      if (match > -1) {
        this.localProductStore[match] = product;
      } else {
        this.localProductStore.push(product);
      }
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
    return product;
  }

  async searchProductByName(name: string): Promise<Product[]> {
    const products = await Fetch.get<Product[]>(`${apiUrl}/${searchUrl}?productName=${name}`, {});
    products.forEach((product) => {
      const match =
        this.localProductStore.findIndex(localProduct => (localProduct.id === product.id));
      if (match > -1) {
        this.localProductStore[match] = product;
      } else {
        this.localProductStore.push(product);
      }
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
