<template>
  <confirm-dialog
    v-model="dialog"
    content-class="remove-filtered-rules-dialog"
    confirm-btn-label="Remove"
    @confirm="removeReviewStatusRule"
  >
    <template #title>
      Remove filtered review status rules
    </template>

    <template #content>
      <v-container>
        <v-alert
          class="mt-2"
          color="error"
          border-color="error"
          variant="tonal"
          :icon="false"
          location="start"
        >
          <template #prepend>
            <v-icon icon="mdi-alert-outline" />
          </template>

          Are you sure that you would like to remove all the filtered review
          status rules (<b>{{ total }}</b>) from the database?
          <br><br>
          <b>IMPORTANT**</b>: be careful when you delete rules because this
          operation can not be undone.
        </v-alert>
      </v-container>
    </template>
  </confirm-dialog>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { ccService, handleThriftError } from "@cc-api";
import { ConfirmDialog } from "@/components";

export default defineComponent({
  name: "RemoveFilteredRulesDialog",
  components: { ConfirmDialog },
  props: {
    modelValue: { type: Boolean, default: false },
    filter: { type: Object, default: null },
    total: { type: Number, default: null },
  },
  emits: ['update:model-value', 'on:confirm'],
  setup(props, { emit }) {
    const dialog = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:model-value', val)
    });

    const removeReviewStatusRule = () => {
      ccService.getClient().removeReviewStatusRules(props.filter,
        handleThriftError(success => {
          if (success) {
            emit('on:confirm');
            dialog.value = false;
          }
        }));
    };

    return {
      dialog,
      removeReviewStatusRule
    };
  }
});
</script>