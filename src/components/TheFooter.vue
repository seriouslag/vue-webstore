<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class TheFooter extends Vue {
    }
</script>

<template>
    <v-footer flat app>
        <span>&copy; 2018</span>
    </v-footer>
</template>
