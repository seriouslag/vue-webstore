<template>
    <v-btn flat icon>
        <v-img class="userImage" v-if="user && user.photoUrl" height="32" width="32" :src="user.photoUrl" />
        <v-icon v-else>person</v-icon>
    </v-btn>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {User} from 'firebase';

  @Component
  export default class UserIcon extends Vue {
    @Prop({
      required: true,
      default: null,
    })
    private user!: User;
  }
</script>

<style lang="scss" scoped>
    .userImage {
        border-radius: 100%;
    }
</style>