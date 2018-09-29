<template>
    <v-layout>
        <v-layout
                 row
                 wrap
                 align-content-center="true"
                 justify-center="true"
                 v-if="products.length > 0 && !isLoading">
            <product-card
                    class="ma-3"
                    v-for="product in ProductsList"
                    :key="product.id"
                    :product="product" />
        </v-layout>
        <Loading v-else-if="isLoading && !isFailed" />
        <div
                class="ma-auto"
                v-else
        >
            <h1 class="text-xs-center ma-auto">Failed to load product list. :'(</h1>
        </div>

    </v-layout>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ProductCard from '@/components/ProductCard.vue';
  import Loading from '../components/Loading.vue';
  import Product from '@/models/Product';

  @Component({
    components: {
      ProductCard,
      Loading,
    },
  })
  export default class Home extends Vue {
    private products: Product[] = [];
    private isLoading: boolean = true;
    private isFailed: boolean = false;

    private async created() {
      try {
        const products: Product[] = await this.$api.getAllProducts();
        this.isFailed = false;
        if (products.length > 0) {
          this.products = products;
        }
      } catch (error) {
        this.isFailed = true;
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    }
    private get ProductsList(): Product[] {
      return this.products;
    }
  }
</script>
