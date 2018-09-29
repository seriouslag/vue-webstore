import {VueConstructor} from 'vue';
import {AxiosInstance} from 'axios';
import IApi from '@/api/IApi';
import Storage from '@/utils/storage';

declare global {
  interface Window {
    axios: AxiosInstance;
  }
}

declare module 'vue/types/vue' {


  interface Vue {
    $axios: AxiosInstance;
    $api: IApi;
    $storage: Storage;
  }
  interface VueConstructor {
    $axios: AxiosInstance;
    $api: IApi;
    $storage: Storage;
  }
}
