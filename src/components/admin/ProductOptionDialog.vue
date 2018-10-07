<template>
    <v-dialog
            v-model="editDialog"
    >
        <v-btn
                icon
                color="success"
                slot="activator"
        >
            <v-icon>add</v-icon>
        </v-btn>
        <v-card>

            <v-card-title
                    class="headline grey lighten-2"
                    primary-title
            >
                Add product option
            </v-card-title>

            <v-card-text>
                <v-stepper v-model="editDialogStepper" alt-labels>
                    <v-stepper-header>
                        <v-stepper-step :complete="editDialogStepper > 1" step="1">Option info</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="editDialogStepper > 2" step="2">Name of step 2</v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step step="3">Name of step 3</v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-subheader primary-title>Option info</v-subheader>
                            <v-text-field
                                    label="Type"
                                    clearable
                            />
                            <v-text-field
                                    prefix="$"
                                    label="Price"
                                    clearable
                            />
                            <v-text-field
                                    type="number"
                                    label="Quantity"
                                    clearable
                            />

                            <v-btn
                                    color="primary"
                                    @click="editDialogStepper++"
                            >
                                Continue
                            </v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="2">
                            <v-layout>
                            <v-list two-line>
                                <v-list-tile v-for="image in productOptionImages">

                                </v-list-tile>

                            </v-list>
                            <v-btn
                                    icon
                                    color="success"
                                    slot="activator"
                            >
                                <v-icon>add</v-icon>
                            </v-btn>
                            </v-layout>
                            <v-btn
                                    color="primary"
                                    @click="editDialogStepper++"
                            >
                                Continue
                            </v-btn>

                            <v-btn
                                    flat
                                    @click="editDialogStepper--"
                            >
                                Back
                            </v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="3">
                            <v-card
                                    class="mb-5"
                                    color="grey lighten-1"
                                    height="200px"
                            ></v-card>

                            <v-btn
                                    color="primary"
                                    @click=""
                            >
                                Save
                            </v-btn>

                            <v-btn
                                    flat
                                    @click="editDialogStepper--"
                            >
                                Back
                            </v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="primary"
                        flat
                        @click="editDialog = false"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ProductOptionImage from '../../models/ProductOptionImage';

  @Component({
    components: {
    },
  })
  export default class ProductOptionDialog extends Vue {
    private editDialog: boolean = false;
    private editDialogStepper: number = 0;
    private productOptionImages: ProductOptionImage[] = [];

  }
</script>