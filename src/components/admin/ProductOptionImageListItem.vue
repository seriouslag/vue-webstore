<template>
    <v-list-tile>
        <span class="pr-2">{{ `${index + 1}. ` }}</span>
        <v-list-tile-avatar>
            <DynamicImageAvatar :src="image.src" :value="image.value" />
        </v-list-tile-avatar>
        <v-list-tile-title>
            {{image.file.name}}
        </v-list-tile-title>
        <v-list-tile-action>
            <v-btn
                    icon
                    color="error"
                    v-on:click="imageRemoved(index)"
            >
                <v-icon>delete</v-icon>
            </v-btn>
        </v-list-tile-action>
    </v-list-tile>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue} from 'vue-property-decorator';
  import DynamicImageAvatar from './DynamicImageAvatar.vue';
  import LoadingImageWrapper from '@/models/LoadingImageWrapper';

  @Component({
    components: {
      DynamicImageAvatar,
    }
  })
  export default class ProductOptionImageListItem extends Vue {
    @Prop({
      required: true,
      type: Object
    })
    private image!: LoadingImageWrapper;

    @Prop({
      required: true,
      type: Number
    })
    private index!: number;

    @Emit('imageRemoved')
    private imageRemoved(index: number): number {
      return index;
    }
  }
</script>
