<template>
    <v-layout align-center justify-center column>
        <h1>404 Page not found <span aria-hidden="true">:(</span></h1>
        <div>Ope, this page was not found.</div>
        <div>Here is a <router-link to="/">link</router-link> that we know that works.</div>

        <!--<div class="cactus-container">
            <div class="cactus">
                <div class="head">
                    <div class="upper">
                        <div class="eyes">
                            <div>
                                <div></div>
                            </div>
                            <div>
                                <div></div>
                            </div>
                        </div>~
                        <div class="eyebrows">
                            <div></div>
                            <div></div>
                        </div>
                        <div class="blush">
                            <div></div>
                            <div></div>
                        </div>

                        <div class="mouth"></div>
                    </div>
                    <div class="thorns">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div class="pot">
                    <div class="top"></div>
                    <div class="bottom">
                        <div class="shadow"></div>
                    </div>
                </div>
            </div>
        </div>-->
    </v-layout>
</template>

<style lang="scss">
    .cactus-container {
        height: 300px;
        width: 300px;
        background-color: bisque;

        .cactus {
            height: 100%;
            width: 100%;
            position: relative;

            .head {
                box-sizing: border-box;
                position: absolute;
                left: 25%;
                top: 15%;
                height: 60%;
                width: 50%;
                background-color: lightgreen;
                z-index: 3;
                border-radius: 50% 50% 20% 20% / 50% 50% 13% 13%;
                border: 1px solid black;

                .upper {
                    box-sizing: border-box;;
                    border: 1px solid red;
                    width: 100%;
                    height: 70%;
                    position: absolute;
                    top: 25%;

                    .eyes {
                        display: flex;
                        width: 100%;
                        height: 100%;
                        align-content: center;
                        justify-content: center;
                        position: absolute;

                         > div {
                             border-radius: 50%;
                             width: 20%;
                             height: 20%;
                             background-color: black;
                             position: relative;
                             margin: 0 10%;


                             > div {
                                 background-color: ghostwhite;
                                 width: 10%;
                                 height: 5%;
                                 border-radius: 50%;
                                 position: absolute;
                                 right: 20%;
                                 top: 20%;

                             }
                        }
                    }

                    .blush {
                        display: flex;
                        width: 100%;
                        height: 100%;
                        align-content: center;
                        justify-content: center;
                        position: absolute;

                        > div {
                            border-radius: 50%;
                            width: 20%;
                            height: 10%;
                            background-color: hotpink;
                            position: relative;
                            margin: 0 10%;


                            > div {
                                background-color: ghostwhite;
                                width: .5em;
                                height: .5em;
                                border-radius: 50%;
                                position: absolute;
                                right: 20%;
                                top: 20%;

                            }
                        }
                    }
                }
            }

            .pot {
                box-sizing: border-box;
                position: relative;
                top: 70%;
                height: 30%;
                width: 100%;

                .top {
                    background-color: saddlebrown;
                    position: absolute;
                    width: 70%;
                    height: 30%;
                    left: 15%;
                    border: 1px solid black;
                    border-radius: 100% 100% 100% 100% / 100% 100% 100% 100%;

                    box-sizing: border-box;
                    z-index: 2;
                }

                .bottom {
                    position: absolute;
                    width: 60%;
                    height: 80%;
                    bottom: 0;
                    background-color: saddlebrown;
                    left: 20%;
                    z-index: 1;
                    border-radius: 0 0 25% 25%;
                }
            }
        }
    }
</style>