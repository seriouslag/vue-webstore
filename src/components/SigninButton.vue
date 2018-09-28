<template>
    <v-btn @click="signInWithProvider" flat large text-transform-none class="text-transform-none">
        {{`Sign in ${btnText ? 'with' : ''} ${btnText}`}}
    </v-btn>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class SigninButton extends Vue {

    @Prop({
      required: true,
      type: String,
      default: 'google'
    })
    private provider!: string;

    private get btnText(): string {
      switch (this.provider.trim().toLowerCase()) {
        case 'google':
          return 'Google';
        case 'twitter':
          return 'Twitter';
        case 'facebook':
          return 'Facebook';
        default:
          return '';
      }
    }

    private async signInWithProvider(): Promise<void> {
      const result = await this.$api.signInWithProvider(this.provider.trim().toLowerCase());
      console.log(result);
    }
  }
</script>