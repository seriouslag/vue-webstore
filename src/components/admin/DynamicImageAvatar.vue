<template>
    <!--<v-img :src="thisSrc" />-->
    <img v-if="thisSrc" :src="thisSrc" />
    <v-progress-circular
            :value="value"
            v-else
            color="success"
    />
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class DynamicImageAvatar extends Vue {
    @Prop({
      type: String,
    })
    src!: string;

    @Prop({
      default: 0,
    })
    value!: number | string;

    private get thisSrc() {
      return this.src;
    }
  }
</script>
