<template>
  <confirm-dialog
    v-model="dialog"
    max-width="50%"
    @confirm="save"
  >
    <template #activator="{ props }">
      <v-btn
        id="new-product-btn"
        color="primary"
        v-bind="props"
      >
        <v-icon start>
          mdi-plus
        </v-icon>
        New product
      </v-btn>
    </template>

    <template #title>
      New product
    </template>

    <template #content>
      <product-config-form
        ref="form"
        v-model:is-valid="isValid"
        :is-super-user="isSuperUser"
        :product-config="productConfig"
      />
    </template>
  </confirm-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { handleThriftError, prodService } from "@cc-api";
import {
  DatabaseConnection,
  ProductConfiguration
} from "@cc/prod-types";

import ConfirmDialog from "@/components/ConfirmDialog";
import ProductConfigForm from "./ProductConfigForm";

export default defineComponent({
  name: "NewProductBtn",
  components: {
    ConfirmDialog,
    ProductConfigForm
  },
  props: {
    isSuperUser: { type: Boolean, default: false }
  },
  emits: ['on-complete'],
  setup(props, { emit }) {
    const dialog = ref(false);
    const form = ref(null);
    const isValid = ref(false);
    const productConfig = ref(new ProductConfiguration({
      connection: new DatabaseConnection()
    }));

    const save = () => {
      if (!form.value.validate()) return;

      prodService.getClient().addProduct(productConfig.value,
        handleThriftError(() => {
          emit("on-complete",
            new ProductConfiguration(productConfig.value));

          dialog.value = false;
          productConfig.value = new ProductConfiguration({
            connection: new DatabaseConnection()
          });
        }));
    };

    return {
      dialog,
      form,
      isValid,
      productConfig,
      save
    };
  }
});
</script>