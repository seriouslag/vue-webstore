<template>

        <v-flex class="column cd-flex">
            <v-hover>
            <v-list-tile
                    slot-scope="{ hover }"
                    :key="`${cartItem.productOption.type}${cartItem.productOption.id}`"
                    avatar
                    :class="`flex elevation-${hover ? 2 : 0}`"
            >
                <v-list-tile-avatar class="product-image">
                    <v-btn icon flat large>
                        <img
                                :src="listOfImages(cartItem.productOption)[0]"
                                @click="gotoProduct"
                        />
                    </v-btn>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title >
                        <v-flex row class="cd-flex">
                            <a
                                @click="gotoProduct"
                            >
                                {{`${cartItem.productOption.type} ${cartItem.productName}`}}
                            </a>
                            <v-spacer />
                            <div>Quantity: {{cartItem.quantity}}</div>
                        </v-flex>
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                        <v-flex class="row cd-flex">
                        </v-flex>
                    </v-list-tile-sub-title>
                    <v-list-tile-sub-title>
                        <v-flex class="row cd-flex">
                            <div>
                                Price: {{cartItem.productOption.price | toCurrency}}
                            </div>
                            <v-spacer />
                            <div class="total">
                                Total: {{cartItem.productOption.price * cartItem.quantity | toCurrency}}
                            </div>
                        </v-flex>
                    </v-list-tile-sub-title>

                </v-list-tile-content>

                <v-list-tile-action class="ml-5">
                    <v-btn small dark color="success" @click="increase">
                        <v-icon dark>add</v-icon>
                    </v-btn>
                    <v-btn small dark color="error" @click="handleDecreaseButton">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
            </v-hover>
            <YesNoDialog
                    :dialog="dialog"
                    text="Remove this item from your cart?"
                    @dialogResponse="handleDialogResponse"
            />
        </v-flex>

</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import CartItem from '../models/CartItem';
  import ProductOption from '../models/ProductOption';
  import ProductOptionImage from '../models/ProductOptionImage';
  import YesNoDialog from './YesNoDialog.vue';

  const failedImageLocation = 'https://www.chiefsretro.com/assets/imageError.jpg';

  @Component({
    components: {
      YesNoDialog,
    },
  })
  export default class CartListItem extends Vue {
    private dialog = false;

    @Prop({
      required: true,
      type: Object,
    })
    private cartItem!: CartItem;

    @Prop({
      required: true,
      type: Number,
    })
    private index!: number[];

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

    private gotoProduct(): void {
      this.$router.push({
        name: 'product',
        params: {id: String(this.cartItem.productId)},
        hash: `#${this.cartItem.productOption.id}`}
      );
    }

    private async increase(): Promise<void> {
      await this.$store.dispatch('addItemToCart', {...this.cartItem, quantity: 1} as CartItem);
    }

    private async handleDecreaseButton(): Promise<void> {
      if (this.cartItem.quantity > 1) {
        await this.decrease();
      } else {
        this.dialog = true;
      }
    }

    private async decrease(): Promise<void> {
      await this.$store.dispatch('removeItemFromCart', {...this.cartItem, quantity: 1} as CartItem);
    }

    private async handleDialogResponse(response: boolean) {
      if (response) {
        await this.decrease();
      }
      this.dialog = false;
    }

  }
</script>

<style lang="scss" scoped>
    $titleLinkColor: #111111;
    a {
        color: $titleLinkColor;
    }

    .product-image {
        margin: 0 !important;
    }
</style>