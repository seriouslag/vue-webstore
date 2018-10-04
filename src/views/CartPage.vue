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
                        <CartListItem  :cartItem="item" :index="index" />
                        <v-divider :key="index" />
                    </template>

                </v-list>
                <div v-else>Your cart is empty.</div>
            </div>
            <Loading v-else></Loading>
        </v-flex>
        <v-card class="pa-3 checkout flex">
            <v-layout column fill-height>
                <div>Add checkout stuff here</div>
                <v-spacer />
                <v-divider />
                <strong class="total pa-2">Total: {{total | toCurrency}}</strong>
            </v-layout>
        </v-card>
    </v-layout>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Product from '../models/Product';
  import Loading from '../components/Loading.vue';
  import CartItem from '../models/CartItem';
  import CartListItem from '../components/CartListItem.vue';

  @Component({
    components: {
      Loading,
      CartListItem,
    },
  })
  export default class CartPage extends Vue {
    private isLoading = false;
    private isFailed = false;
    private get cart(): CartItem[] {
      return this.$store.getters.cart;
    }

    private get total(): number {
      let total = 0;
      this.cart.forEach((cartItem: CartItem) =>
        total += cartItem.productOption.price * cartItem.quantity);
      return total;
    }

    private async getProductById(id: number): Promise<Product> {
      return await this.$api.getProductById(id);
    }
  }
</script>

<style lang="scss" scoped>
    $break-small: 320px;

    .total {
        font-weight: bold;
    }

    .checkout {
        max-width: 200px;
    }

    @media screen and (max-width: $break-small){

    }
</style>