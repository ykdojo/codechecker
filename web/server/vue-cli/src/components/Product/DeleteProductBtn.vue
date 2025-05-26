<template>
  <confirm-dialog
    v-model="dialog"
    max-width="600px"
    :cancel-btn-props="{ color: 'primary' }"
    :confirm-btn-props="{ label: 'Remove', color: 'error' }"
    @confirm="confirmDelete"
  >
    <template #activator="{ props }">
      <v-btn
        class="remove-btn"
        icon
        color="error"
        v-bind="props"
      >
        <v-icon>mdi-trash-can-outline</v-icon>
      </v-btn>
    </template>

    <template #title>
      Confirm deletion of product
    </template>

    <template #content>
      <p>
        You have selected to delete <b>{{ product.endpoint }}</b>
        product!
      </p>
      <p>
        Deleting a product <b>will</b> remove product-specific
        configuration, such as access control and authorisation settings,
        and <b>will</b> disconnect the database from the server.
      </p>
      <p>
        Analysis results stored in the database <b>will NOT</b> be lost!
      </p>
    </template>
  </confirm-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import { handleThriftError, prodService } from "@cc-api";
import ConfirmDialog from "@/components/ConfirmDialog";

export default defineComponent({
  name: "DeleteProductBtn",
  components: {
    ConfirmDialog
  },
  props: {
    product: { type: Object, required: true }
  },
  emits: ['on-complete'],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    confirmDelete() {
      prodService.getClient().removeProduct(this.product.id,
        handleThriftError(success => {
          if (success) {
            this.$emit("on-complete", this.product);
          }
        }));
    }
  }
});
</script>