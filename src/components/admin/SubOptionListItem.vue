<template>
    <v-list-tile>
        <v-list-tile-title>
            {{suboption.type}}
        </v-list-tile-title>
        <v-list-tile-action>
            <v-btn
                    icon
                    color="error"
                    v-on:click="suboptionRemoved(index)"
            >
                <v-icon>delete</v-icon>
            </v-btn>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
  import ProductSuboption from '@/models/ProductSuboption';

  @Component
  export default class SubOptionListItem extends Vue {
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

    @Emit('suboptionRemoved')
    private suboptionRemoved(index: number): number {
      return index;
    }
  }
</script>