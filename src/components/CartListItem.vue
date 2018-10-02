<template>
    <v-list-tile
            :key="`${cartItem.productOption.type}${cartItem.productOption.id}`"
            avatar
    >
        <v-list-tile-avatar>
            <v-btn icon flat>
                <img
                        :src="listOfImages(cartItem.productOption)[0]"
                        @click="$router.push({ name: 'product', params: {id: String(cartItem.productId)}, hash: String('#' + cartItem.productOption.id) })"
                />
            </v-btn>
        </v-list-tile-avatar>
        <v-list-tile-content>
            <v-list-tile-title >
                <v-flex class="row cd-flex">
                    <div class="flex">{{`${cartItem.productOption.type} ${cartItem.productName}`}}</div>
                </v-flex>
            </v-list-tile-title>
            <v-list-tile-sub-title>
                <v-flex class="row cd-flex">
                    <div class="flex">Price: {{cartItem.productOption.price | toCurrency}}</div><div class="total">Total: {{cartItem.productOption.price * cartItem.quantity | toCurrency}}</div>
                </v-flex>
            </v-list-tile-sub-title>
            <v-list-tile-sub-title>
                <v-flex class="row cd-flex">
                    <div>Quantity: {{cartItem.quantity}}</div>
                </v-flex>
            </v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
            <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
            </v-btn>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import CartItem from '../models/CartItem';
  import ProductOption from "../models/ProductOption";
  import ProductOptionImage from "../models/ProductOptionImage";

  const failedImageLocation = 'https://www.chiefsretro.com/assets/imageError.jpg';

  @Component({
    components: {
    },
  })
  export default class CartListItem extends Vue {
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
  }
</script>
