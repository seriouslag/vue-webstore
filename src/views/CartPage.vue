<template>
    <v-layout
            row
            fluid
    >
        <v-flex class="flex pr-5">
            <div v-if="isFailed">Failed to load cart. :'(</div>
            <div
                    v-else-if="!isLoading"
            >
                <v-list three-line v-if="cart.length > 0">
                    <template v-for="(item, index) in cart">
                        <v-list-tile
                                :key="`${item.productOption.type}${item.productOption.id}`"
                                avatar
                                @click=""
                        >
                            <v-list-tile-avatar>
                                <img :src="listOfImages(item.productOption)[0]">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title >
                                    <v-flex class="row cd-flex">
                                        <div class="flex">{{`${item.productOption.type} ${item.productName}`}}</div>
                                    </v-flex>
                                </v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <v-flex class="row cd-flex">
                                        <div class="flex">Price: {{item.productOption.price | toCurrency}}</div><div class="total">Total: {{item.productOption.price * item.quantity | toCurrency}}</div>
                                    </v-flex>
                                </v-list-tile-sub-title>
                                <v-list-tile-sub-title>
                                    <v-flex class="row cd-flex">
                                        <div>Quantity: {{item.quantity}}</div>
                                    </v-flex>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-btn icon ripple>
                                    <v-icon color="grey lighten-1">info</v-icon>
                                </v-btn>
                            </v-list-tile-action>
                        </v-list-tile>
                        <v-divider
                                :key="index"
                        ></v-divider>
                    </template>
                </v-list>
                <div v-else>Your cart is empty.</div>
            </div>
            <Loading v-else></Loading>
        </v-flex>
        <v-card class="pa-3 checkout">
            Add checkout stuff here
        </v-card>
    </v-layout>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import ProductOption from '../models/ProductOption';
  import ProductOptionImage from '../models/ProductOptionImage';
  import Product from '../models/Product';
  import Loading from '../components/Loading.vue';
  import CartItem from '../models/CartItem';

  const failedImageLocation = 'https://www.chiefsretro.com/assets/imageError.jpg';

  @Component({
    components: {
      Loading
    },
  })
  export default class CartPage extends Vue {
    private product!: Product;
    private isLoading = false;
    private isFailed = false;

    private get cart(): CartItem[] {
      return this.$store.getters.cart;
    }

    @Watch('cart')
    private updateProductFromCart() {

    }

    private listOfImages(productOption: ProductOption): string[] {
      if (!productOption ||
        productOption.images.length === 0)  {
        return [failedImageLocation];
      }
      const listOfImages: string[] = [];
      productOption.images.forEach(
        (image: ProductOptionImage) => {
          if (image.location) {
            listOfImages.push(image.location);
          }
        });
      return listOfImages.length ? listOfImages : [failedImageLocation];
    }

    private async getProductById(id: number): Promise<Product> {
      return await this.$api.getProductById(id);
    }
  }
</script>

<style lang="scss" scoped>
    $break-small: 320px;

    .cd-flex {
        display: flex;
    }

    .total {
        font-weight: bold;
    }

    .checkout {
        max-width: 200px;
    }

    @media screen and (max-width: $break-small){

    }


</style>