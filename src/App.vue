<template>
  <v-app id="inspire">
      <TheNavbar />
    <v-content>
      <v-layout class="pa-5 pr" column justify-center>
        <v-divider />
        <div class="pa-2" style="text-align: center">Shop.com</div>
        <v-divider />
      </v-layout>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
    <TheFooter />
  </v-app>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
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
  export default class App extends Vue {}
</script>

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
