import localForage from 'localforage';
import StorageIterateCallback from '@/models/StorageIterateCallback';

export default abstract class Storage {

  static async init(): Promise<void> {
    localForage.config({
      name        : 'store',
      version     : 1.0,
      storeName   : 'store',
    });

    return await localForage.ready();
  }

  static async ready(): Promise<void> {
    return await localForage.ready();
  }

  static setItem<T>(key: string, value: T): Promise<T> {
    return localForage.setItem(key, value);
  }

  static getItem<T>(key: string): Promise<T> {
    return localForage.getItem(key);
  }

  static removeItem(key: string): Promise<void> {
    return localForage.removeItem(key);
  }

  static clear(): Promise<void> {
    return localForage.clear();
  }

  static iterate(callback: StorageIterateCallback) {
    return localForage.iterate(((value, key, iterationNumber) => {
      callback.callback(value, key, iterationNumber);
    }));
  }

}
