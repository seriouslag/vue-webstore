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
                            :rules="nameRules"
                            :counter="nameMaxLength"
                            label="Product name"
                            required
                    />
                    <v-textarea
                            v-model="description"
                            :rules="descriptionRules"
                            :counter="descriptionMaxLength"
                            label="Product description"
                            required
                    />

                    <v-list two-line>
                        <v-subheader>
                            Product options
                        </v-subheader>
                        <v-list-tile v-for="productOption in productOptions">
                        </v-list-tile>

                        <v-list-tile>
                            <v-list-tile-content>
                                <ProductOptionDialog />
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>

                </v-card-text>
                <v-card-actions>
                    <v-btn>Submit</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-layout>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Loading from '@/components/Loading.vue';
  import ProductOption from '../../models/ProductOption';
  import ProductOptionDialog from '../../components/admin/ProductOptionDialog.vue';

  @Component({
    components: {
      ProductOptionDialog,
      Loading,
    },
  })
  export default class AddProductPage extends Vue {
    private isLoading = false;
    private editDialog = false;
    private editDialogStepper = 0;
    private valid = false;
    private name = '';
    private nameMaxLength = 255;

    private description = '';
    private descriptionMaxLength = 255;

    private nameRules = [
      (v: any) => !!v || 'Name is required',
      (v: any) => (v && v.length <= this.nameMaxLength) ||
        `Name must be less than ${this.nameMaxLength} characters`,
    ];

    private descriptionRules = [
      (v: any) => !!v || 'Name is required',
      (v: any) => (v && v.length <= this.nameMaxLength) ||
        `Name must be less than ${this.descriptionMaxLength} characters`,
    ];

    private productOptions: ProductOption[] = [];

    private get isSubmitDisabled() {
      return this.isLoading || !this.valid || this.productOptions.length <= 0;
    }

    private productOptionType = '';
    private productOptionPrice = '';
    private productOptionQuantity = '';

  }
</script>