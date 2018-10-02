<template>
    <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
    >
        <v-btn flat icon slot="activator">
            <v-img class="userImage" v-if="user && user.photoUrl"  :src="user.photoUrl" />
            <v-icon v-else medium>account_circle</v-icon>
        </v-btn>
        <v-card v-if="user">
            <v-list>
                <v-list-tile avatar >
                    <v-list-tile-avatar>
                        <v-img class="userImage" v-if="user.photoUrl"  :src="user.photoUrl" />
                        <v-icon v-else medium>account_circle</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title v-if="user.displayName">{{user.displayName}}</v-list-tile-title>
                        <v-list-tile-sub-title>Shopper</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-btn
                                :class="fav ? 'red--text' : ''"
                                icon
                                @click="fav = !fav"
                        >
                            <v-icon>favorite</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>

            <v-divider></v-divider>

            <v-list>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-switch v-model="message" color="purple"></v-switch>
                    </v-list-tile-action>
                    <v-list-tile-title>Enable messages</v-list-tile-title>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-action>
                        <v-switch v-model="hints" color="purple"></v-switch>
                    </v-list-tile-action>
                    <v-list-tile-title>Enable hints</v-list-tile-title>
                </v-list-tile>
            </v-list>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn flat large @click="signOut">
                    <v-list-tile-content>
                        <v-list-tile-title>
                            Sign out
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card v-else>
            <SigninButton provider="google" />
        </v-card>
    </v-menu>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {User} from 'firebase';
  import SigninButton from './SigninButton.vue';

  @Component({
    components: {SigninButton}
  })
  export default class UserIcon extends Vue {
    @Prop({
      required: true,
      default: null,
    })
    private user!: User;

    private fav = true;
    private menu = false;
    private message = false;
    private hints = true;

    private async signOut(): Promise<void> {
      this.menu = false;
      await this.$api.signOut();
    }
  }
</script>

<style lang="scss" scoped>
    .userImage {
        border-radius: 100%;
    }
</style>