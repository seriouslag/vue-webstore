<template>
    <v-layout align-space-around justify-start column>
        <v-card>
            <v-card-title>
                Add a product
            </v-card-title>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-text>
                    <v-text-field
                            v-model="name"
                            :rules="[rules.required, rules.length255]"
                            :counter="nameMaxLength"
                            label="Product name"
                            required
                    />
                    <v-textarea
                            v-model="description"
                            :rules="[rules.required, rules.length255]"
                            :counter="descriptionMaxLength"
                            label="Product description"
                            required
                    />

                    <v-list two-line>
                        <v-subheader>
                            Product options
                        </v-subheader>

                        <v-list-tile v-for="(productOption, index) in productOptions">
                            <v-list-tile-avatar>
                                <v-img v-if="productOption.images && productOption.images.length"  :src="productOption.images[0].location" />
                            </v-list-tile-avatar>
                            {{index}}. {{productOption.type}}
                        </v-list-tile>

                        <v-list-tile>
                            <v-list-tile-content>
                                <ProductOptionDialog @save="saveProductOption" />
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>

                </v-card-text>
                <v-card-actions>
                    <v-btn :disabled="isSubmitDisabled">Submit</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-layout>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Loading from '@/components/Loading.vue';
  import ProductOption from '@/models/ProductOption';
  import ProductOptionDialog from '@/components/admin/ProductOptionDialog.vue';
  import Rules from '@/utils/validationRules';

  @Component({
    components: {
      Loading,
      ProductOptionDialog,
    }
  })
  export default class AddProductPage extends Vue {
    private isLoading = false;
    private editDialog = false;
    private editDialogStepper = 0;
    private valid = false;
    private name = '';
    private rules = Rules;

    private description = '';
    private nameMaxLength = 255;
    private descriptionMaxLength = 255;

    private productOptions: ProductOption[] = [];

    private get isSubmitDisabled(): boolean {
      return this.isLoading || !this.valid || this.productOptions.length <= 0;
    }

    private saveProductOption(productOption: ProductOption): void {
      this.productOptions.push(productOption);
    }
  }
</script>