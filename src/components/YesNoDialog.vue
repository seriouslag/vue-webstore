<template>
    <v-dialog
            v-model="dialog"
            max-width="290"
    >
        <v-card>
            <v-card-title
                    v-if="title"
                    class="headline"
            >
                {{title}}
            </v-card-title>
            <v-card-text>
                {{text}}
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="dialogResponse(true)"
                >
                    {{continueButton}}
                </v-btn>

                <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="dialogResponse(false)"
                >
                    {{cancelButton}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';

  @Component
  export default class YesNoDialog extends Vue {
    @Prop({
      type: Boolean,
      required: true,
    })
    dialog!: boolean;

    @Prop({
      type: String,
      required: false,
    })
    title!: string;

    @Prop({
      type: String,
      required: true,
      default: 'Are you sure you want to do this?'
    })
    text!: string;

    @Prop({
      type: String,
      required: false,
      default: 'Yes',
    })
    continueButton!: string;

    @Prop({
      type: String,
      required: false,
      default: 'Cancel',
    })
    cancelButton!: string;

    @Emit('dialogResponse')
    private dialogResponse(response: boolean) {
      return response;
    }

    @Watch('dialog')
    private dialogWatcher(dialog: boolean) {
      if (!dialog) {
        this.dialogResponse(false);
      }
    }
  }
</script>