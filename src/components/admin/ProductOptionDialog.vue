<template>
    <v-dialog
            v-model="editDialog"
            lazy
            persistent
            scrollable
    >
        <v-btn
                icon
                color="success"
                slot="activator"
        >
            <v-icon>add</v-icon>
        </v-btn>
        <v-card>

            <v-card-title
                    class="headline grey lighten-2"
                    primary-title
            >
                Add product option
            </v-card-title>

            <v-card-text>
                <v-stepper v-model="editDialogStepper" alt-labels>
                    <v-stepper-header>
                        <v-stepper-step :complete="editDialogStepper > 1" step="1">Option Info</v-stepper-step>
                        <v-divider />
                        <v-stepper-step :complete="editDialogStepper > 2" step="2">Add Option Images</v-stepper-step>
                        <v-divider />
                        <v-stepper-step step="3">Add Suboptions</v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-subheader primary-title>Option info</v-subheader>
                            <v-text-field
                                    label="Type"
                                    clearable
                                    v-model="type"
                            />
                            <v-text-field
                                    prefix="$"
                                    label="Price"
                                    clearable
                                    v-model="price"
                            />
                            <v-text-field
                                    type="number"
                                    label="Quantity"
                                    clearable
                                    v-model="quantity"
                            />

                            <v-btn
                                    color="primary"
                                    @click="nextStep"
                            >
                                Continue
                            </v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="2">
                            <v-layout column>
                                <v-list two-line>
                                    <draggable v-model="localImages2">
                                        <v-list-tile v-for="(image, index) in localImages2">
                                            <span class="pr-2">{{ `${index + 1}. ` }}</span>
                                            <v-list-tile-avatar>
                                                <DynamicImageAvatar :src="image.src" />
                                            </v-list-tile-avatar>
                                            <v-list-tile-title>
                                                {{image.file.name}}
                                            </v-list-tile-title>
                                            <v-list-tile-action>
                                                <v-btn
                                                        icon
                                                        color="error"
                                                        v-on:click="removeImage(index)"
                                                >
                                                    <v-icon>delete</v-icon>
                                                </v-btn>
                                            </v-list-tile-action>
                                        </v-list-tile>
                                    </draggable>
                                </v-list>
                                <v-btn
                                        icon
                                        color="success"
                                        slot="activator"
                                        v-on:click="imageUploadClick()"
                                >
                                    <v-icon>add</v-icon>
                                </v-btn>
                                <div>
                                    <input
                                            type="file"
                                            ref="imageUpload"
                                            name="image"
                                            multiple
                                            :accept="acceptedImageExt"
                                            @change="onFilePicked"
                                    >
                                </div>
                            </v-layout>
                            <v-btn
                                    color="primary"
                                    @click="nextStep"
                            >
                                Continue
                            </v-btn>

                            <v-btn
                                    flat
                                    @click="previousStep"
                            >
                                Back
                            </v-btn>
                        </v-stepper-content>
                        <v-stepper-content step="3">
                            <v-layout>
                                <v-list two-line>
                                    <v-list-tile v-for="images in localImages2">

                                    </v-list-tile>
                                </v-list>
                                <v-btn
                                        icon
                                        color="success"
                                        slot="activator"
                                >
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </v-layout>

                            <v-btn
                                    color="primary"
                                    @click=""
                            >
                                Save
                            </v-btn>

                            <v-btn
                                    flat
                                    @click="previousStep"
                            >
                                Back
                            </v-btn>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-card-text>

            <v-divider />

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="primary"
                        flat
                        @click="editDialog = false"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import ProductOptionImage from '@/models/ProductOptionImage';
  import ProductSuboption from '@/models/ProductSuboption';
  import DynamicImageAvatar from './DynamicImageAvatar.vue';
  import draggable from 'vuedraggable';

  interface ImageWrapper  {
    file: File;
    src: string | null;
  }

  @Component({
    components: {
      DynamicImageAvatar,
      draggable
    }
  })
  export default class ProductOptionDialog extends Vue {
    $refs!: {
      imageUpload: HTMLInputElement,
    };
    private editDialog: boolean = false;
    private editDialogStepper: number = 0;

    private type = '';
    private price = '';
    private quantity = '';
    private uploadedImages: ProductOptionImage[] = [];
    // private localImages: File[] = [];
    // private localImageSrc: string[] = [];

    private localImages2: ImageWrapper[] = [];
    private suboptions: ProductSuboption[] = [];

    private isMounted = false;

    private acceptedImageExt = 'image/png, image/jpeg, image/jpg';

    private imageUploadClick(): void {
      this.$refs.imageUpload.click();
    }

    private nextStep() {
      // Some reason a number plus another number was resulting in concatenation
      // of the numbers and not addition
      this.editDialogStepper = parseInt(String(this.editDialogStepper), 10) + 1;
    }

    private previousStep() {
      this.editDialogStepper =  parseInt(String(this.editDialogStepper), 10) - 1;
    }

    private removeImage(index: number): void {
      if (index > -1 && this.localImages2.length > index) {
        this.localImages2.splice(index, 1);
      }
      // if (index > -1 && this.localImageSrc.length > index) {
      //   this.localImageSrc.splice(index, 1);
      // }
    }

    private onFilePicked(event: EventTarget): void {
      const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
      const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
      const files: FileList | null = target.files;

      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i = parseInt(String(i), 10) + 1) {
          const filename = files[i].name;
          if (filename && filename.lastIndexOf('.') <= 0) {
            continue;
          }
          const fileReader = new FileReader();
          let index = 0;

          fileReader.addEventListener('load', (a: any) => {
            const orientation = this.getOrientation(fileReader.result as ArrayBuffer);
            const base64String = this.arrayBufferToBase64(fileReader.result as ArrayBuffer);
            this.resetOrientation(base64String, orientation, index, this.setLocalImageSrc);

            console.log(this.localImages2);
          });
          this.localImages2.push({file: files[i], src: null});
          index = this.localImages2.length - 1;
          fileReader.readAsArrayBuffer(files[i]);
        }

      }
      // Clear images from image upload
      // This is so if a user deletes an image
      // they may re-upload it
      this.$refs.imageUpload.files = null;
      this.$refs.imageUpload.value = '';
    }

    private arrayBufferToBase64(buffer: ArrayBuffer) {
      let binary: string = '';
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i = parseInt(String(i), 10) + 1) {
        binary += String.fromCharCode(bytes[i]);
      }
      /*
       TODO change image data type to one of the uploaded image
       */
      return `data:image/png;base64, ${window.btoa(binary)}`;
    }

    private setLocalImageSrc(dataUrl: string, index: number) {
      console.log(dataUrl, index, this.localImages2);
      this.localImages2[index].src = dataUrl;
    }

    private resetOrientation(srcBase64: string, orientation: number,
                             index: number, callback: Function): void {
      const img = new Image();
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        const canvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;

        // set proper canvas dimensions before transform & export
        if (4 < orientation && orientation < 9) {
          // noinspection JSSuspiciousNameCombination
          canvas.width = height;
          // noinspection JSSuspiciousNameCombination
          canvas.height = width;
        } else {
          canvas.width = width;
          canvas.height = height;
        }

        // transform context before drawing image
        switch (orientation) {
          case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
          case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
          case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
          case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
          case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
          case 7: ctx.transform(0, -1, -1, 0, height, width); break;
          case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
          default: break;
        }

        // draw image
        ctx.drawImage(img, 0, 0);

        // export base64
        callback(canvas.toDataURL(), index);
      };

      img.src = srcBase64;
    }

    private getOrientation(arrayBuffer: ArrayBuffer): number {
      const view = new DataView(arrayBuffer);

      if (view.getUint16(0, false) !== 0xFFD8) {
        return -2;
      }

      const length = view.byteLength;
      let offset = 2;

      while (offset < length) {
        const marker = view.getUint16(offset, false);
        offset += 2;

        if (marker === 0xFFE1) {
          if (view.getUint32(offset += 2, false) !== 0x45786966) {
            return -1;
          }
          const little = view.getUint16(offset += 6, false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          const tags = view.getUint16(offset, little);
          offset += 2;

          for (let i = 0; i < tags; i = parseInt(String(i), 10) + 1) {
            if (view.getUint16(offset + (i * 12), little) === 0x0112) {
              return view.getUint16(offset + (i * 12) + 8, little);
            }
          }
        } else if ((marker & 0xFF00) !== 0xFF00) {
          break;
        } else {
          offset += view.getUint16(offset, false);
        }
      }
      return -1;
    }
  }
</script>