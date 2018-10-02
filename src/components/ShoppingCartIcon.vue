<template>
    <v-btn flat icon @click="$router.push({name: 'cart'})">
        <v-badge
                :value="itemCount > 0"
                overlap
                bottom>
            <span slot="badge">{{itemCount}}</span>
            <v-icon>shopping_cart</v-icon>
        </v-badge>
    </v-btn>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component
  export default class ShoppingCartIcon extends Vue {
    private get itemCount() {
      return this.$store.getters.cartItemCount;
    }
  }
</script>