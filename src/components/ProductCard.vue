<template>
    <v-card
        width="300px">
        <router-link :to="`/product/${product.productId}`">
            <v-img
                    :src="imageSrc"
                    aspect-ratio="2.75"
                    height="200px"
            />
        </router-link>

        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{product.productName}}</h3>
                <div>{{product.productDescription}}</div>
            </div>
        </v-card-title>

        <v-card-actions>
            <v-btn flat color="orange">Add to cart</v-btn>
            <v-spacer />
            <v-btn icon>
                <v-icon>favorite</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>bookmark</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>share</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import Product from '../models/Product';
  import ProductOption from '../models/ProductOption';
  import ProductOptionImage from '../models/ProductOptionImage';

  const failedImageLocation = 'https://www.chiefsretro.com/assets/imageError.jpg';

  @Component
  export default class ProductCard extends Vue {
    @Prop({
      type: Object,
      required: true,
    })
    private product!: Product;

    private get imageSrc(): string {
      let url = '';
      this.product.productOptions.forEach((productOptions: ProductOption) => {
        if (url) return;
        productOptions.productOptionImages.forEach((productOptionImage: ProductOptionImage) => {
          if (url) return;
          if (productOptionImage.productOptionImageLocation) {
            url = productOptionImage.productOptionImageLocation;
            return;
          }
        });
      });
      return !!url ? url : failedImageLocation;
    }
  }
</script>

<style scoped>

</style>