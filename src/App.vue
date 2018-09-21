<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import TheHeaderSearch from './components/TheHeaderSearch.vue';
    import TheNavbar from './components/TheNavbar.vue';
    import TheFooter from './components/TheFooter.vue';

    @Component({
        components: {
            TheNavbar,
            TheHeaderSearch,
            TheFooter,
        },
    })
    export default class App extends Vue {
    }
</script>

<template>
  <v-app id="inspire">
      <TheNavbar />

    <v-content>
      <v-container fluid fill-height>
        <v-layout
                justify-center
                align-center
        >
          <v-flex text-xs-center>
            <v-tooltip right>
              <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/rJdVMq" target="_blank">
                <v-icon large>mdi-codepen</v-icon>
              </v-btn>
              <span>Codepen</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <TheFooter />
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
