<script lang="ts">
    import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

    @Component
    export default class TheHeaderSearch extends Vue {
        @Prop({default: false}) private search!: boolean;
        private showSearch = this.search;
        private selectedItem = null;
        private items = ['Hello', 'banana', 'Fried Toast', 'Sputnik'];

        @Emit('searchToggled')
        private toggleSearch(): void {
            this.showSearch = !this.showSearch;
        }
    }
</script>

<template>
    <div class="d-flex">
        <v-slide-x-reverse-transition>
            <v-autocomplete
                    v-show="showSearch"
                    v-model="selectedItem"
                    :items="items"
                    :label="`Search`"
                    persistent-hint
                    prepend-icon="mdi-search"
            >
                <v-slide-x-reverse-transition
                        v-show="!showSearch"
                        slot="append-outer"
                        mode="out-in"
                >
                    <v-icon
                            :color="'success'"
                    ></v-icon>
                </v-slide-x-reverse-transition>
            </v-autocomplete>
        </v-slide-x-reverse-transition>
        <v-btn
                class="ma-auto"
                icon
                @click.native="toggleSearch"
        >
            <v-icon>{{!showSearch ? 'search': 'cancel'}}</v-icon>
        </v-btn>
    </div>
</template>
