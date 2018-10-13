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
                        <v-stepper-step
                                :complete="editDialogStepper > 1"
                                step="1"
                        >
                            Option Info
                        </v-stepper-step>
                        <v-divider />
                        <v-stepper-step
                                :complete="editDialogStepper > 2"
                                step="2"
                        >
                            Add Option Images
                        </v-stepper-step>
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
                                    <draggable v-model="localImages">
                                        <ProductOptionImageListItem
                                                v-for="(image, index) in localImages"
                                                :image="image"
                                                :index="index"
                                                @imageRemoved="removeImage"
                                        />
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
                                    <SubOptionListItem
                                            v-for="(suboption, index) in suboptions"
                                            :suboption="suboption"
                                            :index="index"
                                            @suboptionRemoved="removeSuboption"
                                    />
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
  import LoadingImageWrapper from '@/models/LoadingImageWrapper';
  import DynamicImageAvatar from './DynamicImageAvatar.vue';
  import draggable from 'vuedraggable';
  import ProductOptionImageListItem from './ProductOptionImageListItem.vue';
  import SubOptionListItem from './SubOptionListItem.vue';

  @Component({
    components: {
      SubOptionListItem,
      ProductOptionImageListItem,
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

    private localImages: LoadingImageWrapper[] = [];
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
      if (index > -1 && this.localImages.length > index) {
        this.localImages.splice(index, 1);
      }
    }

    private removeSuboption(index: number): void {
      if (index > -1 && this.suboptions.length > index) {
        this.suboptions.splice(index, 1);
      }
    }

    private onFilePicked(event: EventTarget): void {
      const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
      const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
      const files: FileList | null = target.files;

      if (files && files.length > 0) {
        for (let i = 0; i < files.length; i = parseInt(String(i), 10) + 1) {
          const name = files[i].name;
          const ext = files[i].type;
          if (name && name.lastIndexOf('.') <= 0) {
            continue;
          }
          const fileReader = new FileReader();
          let index = 0;

          fileReader.addEventListener('load', async (e: Event) => {
            const orientation =
              await this.getOrientation(fileReader.result as ArrayBuffer);
            const base64String =
              await this.arrayBufferToBase64(fileReader.result as ArrayBuffer, ext);
            this.resetOrientation(base64String, orientation, index, this.setLocalImageSrc);
          });

          this.localImages.push({file: files[i], src: null, value: 0});
          fileReader.addEventListener('progress', (e: ProgressEvent) => {

            if (e.lengthComputable) {
              this.localImages[i].value = Math.floor(e.loaded / e.total * 100) * .85;
            }
          });
          index = this.localImages.length - 1;
          fileReader.readAsArrayBuffer(files[i]);
        }
      }

      // Clear images from image upload
      // This is so if a user deletes an image
      // they may re-upload it
      this.$refs.imageUpload.files = null;
      this.$refs.imageUpload.value = '';
    }

    private arrayBufferToBase64(buffer: ArrayBuffer, ext: string): Promise<string> {
      return new Promise((resolve) => {
        let binary: string = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i = parseInt(String(i), 10) + 1) {
          binary += String.fromCharCode(bytes[i]);
        }

        resolve(`data:image/${ext};base64, ${window.btoa(binary)}`);
      });
    }

    private setLocalImageSrc(dataUrl: string, index: number) {
      this.localImages[index].src = dataUrl;
    }

    private resetOrientation(
      srcBase64: string,
      orientation: number,
      index: number,
      callback: Function): void {

      const img = new Image();
      img.addEventListener('load', async (e: Event) =>
        this.handleImageLoad(e, img, orientation, index, callback));

      img.src = srcBase64;
    }

    private handleImageLoad(
      e: Event,
      img: HTMLImageElement,
      orientation: number,
      index: number,
      callback: Function
    ): Promise<void> {

      return new Promise((resolve) => {
        // Defines canvases max height/width
        // Should match the display size
        const maxSize = 40;
        // uploaded image width/height
        let width = img.width;
        let height = img.height;
        // default ratio
        let ratio = 1;
        // default image offset placement location
        let oXcenter = 0;
        let oYcenter = 0;
        const canvas: HTMLCanvasElement = document.createElement('canvas') as HTMLCanvasElement;
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
        // set proper canvas dimensions before transform & export
        if (width > height) {
          ratio = height / width;
          if (width > maxSize) {
            height = maxSize * ratio;
            width = maxSize;
            oYcenter = Math.floor(((maxSize - height) / 2) * 10) / 10 ;
          }
        } else {
          ratio = width / height;
          if (height > maxSize) {
            width = maxSize * ratio;
            height = maxSize;
            oXcenter = Math.floor(((maxSize - width) / 2) * 10) / 10;
          }
        }

        // transform context before drawing image
        this.rotateCavasCtx(ctx, orientation, maxSize, maxSize);

        // draw raw image
        ctx.drawImage(img, oXcenter, oYcenter, width, height);

        // export base64
        callback(canvas.toDataURL(), index);
        resolve();
      });
    }

    private rotateCavasCtx(
      ctx: CanvasRenderingContext2D,
      orientation: number,
      width: number,
      height: number) {

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
    }

    private getOrientation(arrayBuffer: ArrayBuffer): Promise<number> {
      return new Promise((resolve) => {
        const view = new DataView(arrayBuffer);

        if (view.getUint16(0, false) !== 0xFFD8) {
          resolve(-2);
        }

        const length = view.byteLength;
        let offset = 2;

        while (offset < length) {
          const marker = view.getUint16(offset, false);
          offset += 2;

          if (marker === 0xFFE1) {
            if (view.getUint32(offset += 2, false) !== 0x45786966) {
              resolve(-1);
            }
            const little = view.getUint16(offset += 6, false) === 0x4949;
            offset += view.getUint32(offset + 4, little);
            const tags = view.getUint16(offset, little);
            offset += 2;

            for (let i = 0; i < tags; i = parseInt(String(i), 10) + 1) {
              if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                resolve(view.getUint16(offset + (i * 12) + 8, little));
              }
            }
          } else if ((marker & 0xFF00) !== 0xFF00) {
            break;
          } else {
            offset += view.getUint16(offset, false);
          }
        }
        resolve(-1);
      });
    }
  }
</script>