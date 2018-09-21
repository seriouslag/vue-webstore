<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import TheHeaderSearch from './TheHeaderSearch.vue';

@Component({
    components: { TheHeaderSearch },
})
export default class TheNavbar extends Vue {
    drawer: boolean = false;

    @Emit('drawerChanged')
    private drawerToggled(): void {
        this.drawer = !this.drawer;
    }
}
</script>

<template>
    <div>
        <v-toolbar flat fixed app>
            <v-toolbar-side-icon @click.stop="drawerToggled"></v-toolbar-side-icon>
            <v-toolbar-title>Store</v-toolbar-title>
            <v-spacer />
            <TheHeaderSearch />
        </v-toolbar>
        <v-navigation-drawer
                v-model="drawer"
                temporary
                fixed
                app
        >
            <v-list dense>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Home</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>contact_mail</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Contact</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>
