<template>
    <!--<v-img :src="thisSrc" />-->
    <img v-if="thisSrc" :src="thisSrc" />
    <v-progress-circular
            indeterminate
            v-else
            color="success"
    />
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';

  @Component
  export default class DynamicImageAvatar extends Vue {
    @Prop({
      type: String,
    })
    src!: string;

    // Maybe remove?
    @Watch('src', { immediate: false, deep: true })
    private doThing() {
      const b = this.src;
    }

    private get thisSrc() {
      return this.src;
    }
  }
</script>
