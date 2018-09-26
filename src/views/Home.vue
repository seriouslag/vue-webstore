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
                    :key="product.productId"
                    :product="product" />
        </v-layout>
        <Loading v-else />

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
      private loading: boolean = true;
      private failed: boolean = false;

      private async created() {
        console.log('created');
        try {
          const products: Product[] = await this.$api.getAllProducts();
          this.failed = false;
          if (products.length > 0) {
            this.products = products;
          }
        } catch (error) {
          this.failed = true;
          console.log(error);
        } finally {
          this.loading = false;
        }
      }

      private get ProductsList(): Product[] {
        return this.products;
      }
    }
</script>
