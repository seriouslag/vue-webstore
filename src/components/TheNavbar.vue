<template>
    <div>
        <v-toolbar flat fixed app>
            <v-toolbar-side-icon @click.stop="drawerToggled"></v-toolbar-side-icon>
            <v-toolbar-title>Store</v-toolbar-title>
            <v-spacer />
            <TheHeaderSearch />
            <ShoppingCartIcon />
            <UserIcon :user="user" />
        </v-toolbar>
        <v-navigation-drawer
                v-model="drawer"
                temporary
                fixed
                app
        >
            <v-list dense>
                <v-list-tile>
                    <router-link class="icon-router-link" to="/">
                        <v-btn flat large>
                            <v-list-tile-action>
                                <v-icon>home</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    Home
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-btn>
                    </router-link>
                </v-list-tile>
                <v-list-tile>
                    <router-link class="icon-router-link" to="/about">
                        <v-btn flat large>
                            <v-list-tile-action>
                                <v-icon>whatshot</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    About
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-btn>
                    </router-link>
                </v-list-tile>
                <v-list-tile>
                    <router-link class="icon-router-link" to="/contact">
                        <v-btn flat large>
                            <v-list-tile-action>
                                <v-icon>contact_mail</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    Contact
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-btn>
                    </router-link>
                </v-list-tile>
                <v-list-tile>
                    <router-link class="icon-router-link" to="/cart">
                        <v-btn flat large>
                            <v-list-tile-action>
                                <ShoppingCartIcon />
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    Cart
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-btn>
                    </router-link>
                </v-list-tile>
                <v-list-tile v-if="user === null">
                    <SigninButton provider="google" btnText="Google" />
                </v-list-tile>
                <v-list-tile v-else>
                    <v-btn flat large @click="signOut">
                        <v-list-tile-content>
                            <v-list-tile-title>
                                Sign out
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-btn>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
  import {Component, Emit, Vue} from 'vue-property-decorator';
  import TheHeaderSearch from './TheHeaderSearch.vue';
  import ShoppingCartIcon from './ShoppingCartIcon.vue';
  import SigninButton from './SigninButton.vue';
  import {User} from 'firebase/app';
  import UserIcon from './TheUserIcon.vue';

  @Component({
    components: {
      UserIcon,
      SigninButton,
      TheHeaderSearch,
      ShoppingCartIcon,
    },
  })
  export default class TheNavbar extends Vue {
    drawer: boolean = false;

    @Emit('drawerChanged')
    private drawerToggled(): void {
      this.drawer = !this.drawer;
      console.log('drawerChanged', this.$store.getters.user);
    }

    private get user(): User | null {
      const user = this.$store.getters.user;
      console.log('navbar user', user);
      return user;
    }

    private async signOut(): Promise<void> {
      await this.$api.signOut();
    }
  }
</script>

<style lang="scss" scoped>
    @import '../styles/colors';

    .icon-router-link {
        display: flex;
        flex-direction: row;
        text-decoration: none;
        color: $linkColor;

        button {
            text-transform: none;
        }
    }

    .v-btn {
        text-transform: none !important;
    }
</style>