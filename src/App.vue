<template>
  <v-app id="inspire">
      <TheNavbar />
    <v-layout column pt-5>
      <v-layout class="pa-5 pr noflex" column justify-center>
        <v-divider />
        <div class="pa-2 header-name">Shop.com</div>
        <v-divider />
      </v-layout>
      <v-layout fill-height class="pa-5">
        <router-view></router-view>
      </v-layout>
    </v-layout>
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

<style lang="scss" scoped>
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

  .noflex {
    flex: none;
  }

  .header-name {
    text-align: center;
  }

  @media (max-width:481px) {
    .theme--light.application {
      padding-bottom: 102px;
    }
  }
</style>
