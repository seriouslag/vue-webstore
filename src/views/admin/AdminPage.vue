<template>
    <v-layout align-center justify-center column>
        <v-btn>Add a product</v-btn>
        <router-link tag="v-btn" :to="{name: 'adminAddProduct'}">Add a product</router-link>
        <v-btn>Edit a product</v-btn>
    </v-layout>
</template>