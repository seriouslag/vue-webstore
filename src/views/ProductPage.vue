<template>
    <v-layout
            column
            fluid
            max-width="400px"
    >
        <div v-if="isFailed">Failed to find this product.</div>
        <div
            v-else-if="!isLoading"
        >
            <h1>{{product.productName}}</h1>
            <v-flex>
                <v-carousel
                        v-if="selectedProductOptionImage && listOfImages.length > 1"
                        :cycle="false"
                        :dark="true"
                        :style="{ height: imageHeight, width: imageWidth }"
                >
                    <v-carousel-item
                                     v-for="(image, i) in listOfImages"
                                     :key="i"
                                     :src="image"
                    />
                </v-carousel>
                <v-flex
                        class="singleImage"
                        v-else
                >
                    <v-img
                            :src="listOfImages[0]"
                            :style="{ height: imageHeight, width: imageWidth }"
                    />
                </v-flex>
                <v-container
                        column
                        align-content-center
                >
                    <p>{{product.productDescription}}</p>
                    <v-flex
                            xs12 sm6 d-flex
                            v-if="productOptionsDropdown">
                        <v-select

                                v-model="selectedProductOptionNumber"
                                :items="productOptionsDropdown"
                                :label="productOptionsDropdown[0].text"
                        ></v-select>
                    </v-flex>
                    <v-rating
                             half-increments
                             v-model="rating"
                             readonly
                    />
                    <div>0 reviews</div>
                </v-container>
            </v-flex>
        </div>
        <Loading v-else></Loading>
    </v-layout>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import ProductOption from '../models/ProductOption';
  import ProductOptionImage from '../models/ProductOptionImage';
  import Product from '../models/Product';
  import Loading from '../components/Loading.vue';

  const failedImageLocation = 'https://www.chiefsretro.com/assets/imageError.jpg';

  @Component({
    components: {
      Loading
    },
  })
  export default class ProductPage extends Vue {
    private product!: Product;
    private selectedProductOptionNumber: number = 0;
    private selectedProductOptionImageNumber: number = 0;
    private isLoading = true;
    private isFailed = false;
    private rating: number = 0;

    @Watch('$route', { immediate: true, deep: true })
    private onRouteChange(newRoute: string) {
      console.log(newRoute);
      this.getProductByRouteParams();
    }

    private created() {
    }

    private async getProductByRouteParams(): Promise<void> {
      this.isLoading = true;
      try {
        this.product = await this.$api.getProductByProductId(parseInt(this.$route.params['id'], 10));
        this.isLoading = false;
        if (this.product === null) {
          this.isFailed = true;
        }

      } catch (error) {
        this.isFailed = true;
        console.log(error);
      }
    }

    private get selectedProductOption(): ProductOption | null {
      if (this.isLoading || !this.product || !this.product.productOptions.length) {
        return null;
      }
      return this.product.productOptions[this.selectedProductOptionNumber];

    }

    private get selectedProductOptionImage(): ProductOptionImage | null {
      if (this.isLoading || !this.selectedProductOption ||
          !this.selectedProductOption.productOptionImages.length) {
        return null;
      }
      return this.selectedProductOption.productOptionImages[this.selectedProductOptionImageNumber];
    }

    private get listOfImages(): string[] {
      if (!this.selectedProductOption ||
        this.selectedProductOption.productOptionImages.length === 0)  {
        return [failedImageLocation];
      }
      const listOfImages: string[] = [];
      this.selectedProductOption.productOptionImages.forEach(
        (productOptionImage: ProductOptionImage) => {
          if (productOptionImage.productOptionImageLocation) {
            listOfImages.push(productOptionImage.productOptionImageLocation);
          }
        });
      return listOfImages.length ? listOfImages : [failedImageLocation];
    }

    private get productOptionsDropdown(): { text: string, value: number }[] | null {
      if (this.isLoading || this.selectedProductOption === null) {
        return null;
      }
      const obj: { text: string, value: number }[] = [];

      this.product.productOptions.forEach((productOption, index) => {
        obj.push({ text: productOption.productType, value: index });
      });
      return obj;
    }

    private get imageHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '350px';
        case 'sm': return '500px';
        case 'md': return '500px';
        case 'lg': return '600px';
        case 'xl': return '700px';
      }
    }

    private get imageWidth () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '350px';
        case 'sm': return '500px';
        case 'md': return '500px';
        case 'lg': return '600px';
        case 'xl': return '700px';
      }
    }
  }
</script>

<style lang="scss" scoped>
    .v-carousel {
        margin: auto;
    }

    .singleImage .v-image {
        margin: auto;
    }
</style>