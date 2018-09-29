<template>
    <v-card
        width="300px">
        <router-link :to="{name: 'product', params: { id: product.id }}">
            <v-img
                    :src="imageSrc"
                    aspect-ratio="2.75"
                    height="200px"
            />
        </router-link>

        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">{{product.name}}</h3>
                <div>{{product.description}}</div>
            </div>
        </v-card-title>

        <v-card-actions>
            <router-link :to="{ name: 'product', params: { id: product.id } }">
                <v-btn flat color="orange">Explore</v-btn>
            </router-link>
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
  import ProductOption from '../models/ProductOption';
  import ProductOptionImage from '../models/ProductOptionImage';
  import Product from '../models/Product';

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
      this.product.options.forEach((option: ProductOption) => {
        if (url) return;
        option.images.forEach((image: ProductOptionImage) => {
          if (url) return;
          if (image.location) {
            url = image.location;
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