<template>
    <v-hover
            close-delay="100">
        <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 2}`"
                width="300px"
                max-height="400px">
            <router-link :to="{name: 'product', params: { id: product.id }}">
                <v-img
                        :src="imageSrc"
                        aspect-ratio="2.75"
                        height="200px"
                        contain
                >
                    <div class="fill-height blur"></div>
                </v-img>
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
                <v-btn
                       :class="fav ? 'red--text' : ''"
                       icon
                       @click="fav = !fav">
                    <v-icon>favorite</v-icon>
                </v-btn>
                <v-btn
                        :class="bookmarked ? 'blue--text' : ''"
                       icon
                       @click="bookmarked = !bookmarked">
                    <v-icon>bookmark</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>share</v-icon>
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-hover>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import Product from '../models/Product';
  import {failedImage} from '../utils/defaults';

  const failedImageLocation = failedImage;

  @Component
  export default class ProductCard extends Vue {
    @Prop({
      type: Object,
      required: true,
    })
    private product!: Product;

    private fav = false;
    private bookmarked = false;

    private get imageSrc(): string {
      return !!this.product.defaultImageUrl ? this.product.defaultImageUrl : failedImageLocation;
    }
  }
</script>

<style scoped>
    .blur {
        background: radial-gradient(ellipse at center, rgba(255,255,255,0) 0%,rgba(255,255,255,0.33) 65%,rgba(185,185,185,0.51) 99%,rgba(183,183,183,0.51) 100%);
    }
</style>