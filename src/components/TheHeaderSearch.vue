<template>
    <div class="d-flex">
        <v-slide-x-reverse-transition>
            <v-autocomplete
                    v-show="showSearch"
                    v-model="selectedItem"
                    :items="items"
                    item-text="name"
                    item-value="id"
                    :label="`Search`"
                    persistent-hint
                    prepend-icon="mdi-search"
                    :loading="isLoading"
                    :search-input.sync="search"
                    clearable
                    cache-items
                    autofocus
                    single-line
            >
                <template slot="no-data">
                    <v-list-tile>
                        <v-list-tile-title v-if="isLoading">
                            Searching...
                        </v-list-tile-title>
                        <v-list-tile-title v-else>
                            No results
                        </v-list-tile-title>
                    </v-list-tile>
                </template>

                <template
                        slot="item"
                        slot-scope="{ item, tile }"
                >
                    <v-list-tile-avatar
                            color="indigo"
                            class="headline font-weight-light white--text"
                    >
                        <v-img v-if="item.defaultImageUrl" :src="item.defaultImageUrl" />
                        <template v-else>{{item.name.substring(0,1).toLowerCase()}}</template>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.name"></v-list-tile-title>
                    </v-list-tile-content>
                    <!--<v-list-tile-action>-->
                        <!--<v-icon>mdi-coin</v-icon>-->
                    <!--</v-list-tile-action>-->
                </template>
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

<script lang="ts">
  import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
  import Product from '../models/Product';

  @Component
  export default class TheHeaderSearch extends Vue {
    @Prop({ default: false }) private isSearch!: boolean;
    private showSearch = this.isSearch;
    private selectedItem: any = null;
    private items: Product[] = [];
    private isLoading = false;
    private search: any = null;

    @Watch('search', { immediate: false, deep: true })
    private async doSearch(value: string): Promise<void> {
      console.log('here', value);
      if (value && value.trim()) {
        this.isLoading = true;
        try {
          this.items = await this.$api.searchProductByName(value);
        } catch (error) {
          console.log('failed to search', error);
        } finally {
          this.isLoading = false;
        }
      }
    }

    @Watch('selectedItem', { immediate: false, deep: true })
    private goTo(value: string): void {
      if (!value) {
        return;
      }
      this.$router.push({ name: 'product', params: { id: value } });
    }

    @Emit('searchToggled')
    private toggleSearch(): void {
      this.showSearch = !this.showSearch;
    }
  }
</script>
