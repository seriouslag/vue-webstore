<template>
    <v-list-tile>
        <v-list-tile-title class="pr-2">
            {{`${index + 1}. `}}
        </v-list-tile-title>
        <v-list-tile-content>
            <v-form ref="form" v-model="isValid">
                <v-layout column>
                    <v-layout justify-space-around row fill-height>
                        <v-text-field
                                v-model="suboption.type"
                                :counter="255"
                                :rules="[rules.required, rules.length255]"
                                label="Type"
                                required
                        />
                        <v-text-field
                                v-model="suboption.price"
                                label="Price"
                                :rules="[rules.number, rules.positive]"
                                required
                        />
                        <v-text-field
                                v-model="suboption.quantity"
                                :rules="[rules.number, rules.positive]"
                                label="Quantity"
                                required
                        />
                    </v-layout>
                    <v-layout justify-space-around row fill-height>
                        <!--<v-checkbox-->
                                <!--:v-model="suboption.isAvailable"-->
                                <!--label="Is available?"-->
                                <!--required-->
                        <!--/>-->
                    </v-layout>
                </v-layout>
            </v-form>
        </v-list-tile-content>
        <v-list-tile-action>
            <v-layout column>
                <v-btn
                        icon
                        color="success"
                        @click="checkForm()"
                >
                    <v-icon>check</v-icon>
                </v-btn>
                <v-btn
                        icon
                        color="error"
                        v-on:click="suboptionRemoved"
                >
                    <v-icon>delete</v-icon>
                </v-btn>
            </v-layout>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
  import ProductSuboption from '@/models/ProductSuboption';
  import ValidationChangeEmit from '@/models/ValidationChangeEmit';

  @Component
  export default class SubOptionListItem extends Vue {
    public $refs!: {
      form: any,
    };

    @Prop({
      required: true,
      type: Object,
    })
    private suboption!: ProductSuboption;
    @Prop({
      required: true,
      type: Number,
    })
    private index!: number;
    private isValid = true;

    private rules: any = {
      required: (v: string) => !!v || 'Required.',
      length255: (v: string) => (v && v.length <= 255) || 'Must be less than 256 characters',
      number: (v: string) => (!v || !isNaN(parseFloat(v))) || 'Must be a number',
      positive: (v: string) =>  (!v || parseFloat(v) > 0) || 'Must be greater than 0',
    };

    private checkForm(): void {
      this.$refs.form.validate();
    }

    @Emit('validationChanged')
    private validationChanged() {
      return {
        isValid: this.isValid,
        index: this.index,
      } as ValidationChangeEmit;
    }

    @Emit('suboptionRemoved')
    private suboptionRemoved(): number {
      return this.index;
    }
  }
</script>

<style lang="scss" scoped>
  .v-list__tile__title {
    width: auto;
    text-overflow: initial;
  }
  .v-btn--icon {
    margin: 4px;
  }
  .v-form {
    width: 100%;
  }

  .v-input {
    padding: 0 5px;
  }
</style>
