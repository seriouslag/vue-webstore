import {VueConstructor} from 'vue';
import {AxiosInstance} from 'axios';
import IApi from '@/api/IApi';

declare global {
  interface Window {
    axios: AxiosInstance;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
    $api: IApi;
  }
  interface VueConstructor {
    $axios: AxiosInstance;
    $api: IApi;
  }
}
