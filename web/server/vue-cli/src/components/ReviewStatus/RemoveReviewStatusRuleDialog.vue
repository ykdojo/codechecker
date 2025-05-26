<template>
  <confirm-dialog
    v-model="dialog"
    content-class="remove-review-status-rule-dialog"
    confirm-btn-label="Remove"
    @confirm="removeReviewStatusRule"
  >
    <template #title>
      Remove review status rule
    </template>

    <template #content>
      <v-container v-if="rule">
        Are you sure that you would like to remove review status rule for
        report hash <b>{{ rule.reportHash }}</b>?

        <v-alert
          v-if="rule.associatedReportCount"
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
          
          There
          {{ rule.associatedReportCount === 1 ? 'is' : 'are' }}
          <b>{{ rule.associatedReportCount }}</b> matching
          {{ rule.associatedReportCount === 1 ? 'report' : 'reports' }}
          associated with this rule. Removing a review status rule
          will change the review statuses of these reports back to
          <i>Unreviewed</i>, so they become outstanding at the current date.
          This may affect statistics as well. The operation can't be undone.
        </v-alert>
      </v-container>
    </template>
  </confirm-dialog>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { ccService, handleThriftError } from "@cc-api";
import { ReviewStatusRuleFilter } from "@cc/report-server-types";
import { ConfirmDialog } from "@/components";

export default defineComponent({
  name: "RemoveReviewStatusRuleDialog",
  components: { ConfirmDialog },
  props: {
    modelValue: { type: Boolean, default: false },
    rule: { type: Object, default: () => null },
  },
  emits: ['update:model-value', 'on:confirm'],
  setup(props, { emit }) {
    const dialog = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:model-value', val)
    });

    const removeReviewStatusRule = () => {
      const filter = new ReviewStatusRuleFilter();
      filter.reportHashes = [props.rule.reportHash];

      ccService.getClient().removeReviewStatusRules(filter,
        handleThriftError(success => {
          if (success) {
            emit('on:confirm', props.rule);
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