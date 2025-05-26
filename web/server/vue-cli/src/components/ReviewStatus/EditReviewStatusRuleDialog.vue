<template>
  <confirm-dialog
    v-model="dialog"
    content-class="edit-review-status-rule-dialog"
    scrollable
    @confirm="saveReviewStatusRule"
  >
    <template #title>
      <span v-if="rule">
        Edit review status rule
      </span>
      <span v-else>
        New review status rule
      </span>
    </template>

    <template #content>
      <v-form ref="form">
        <v-text-field
          v-model="form.reportHash"
          class="report-hash mb-2"
          label="Report hash*"
          autofocus
          variant="outlined"
          required
          :rules="rules.reportHash"
        />

        <select-review-status
          v-model="form.status"
          class="mb-2"
          label="Select review status*"
          :clearable="false"
          :rules="rules.selectReviewStatus"
        />

        <v-textarea
          v-model="form.message"
          class="message pa-0"
          variant="outlined"
          name="reviewStatusMessage"
          label="(Optionally) Explain the status change..."
        />
      </v-form>
    </template>
  </confirm-dialog>
</template>

<script>
import { ref, computed, defineComponent, reactive, watch } from 'vue';
import { ccService, handleThriftError } from "@cc-api";
import { ConfirmDialog } from "@/components";
import SelectReviewStatus from "./SelectReviewStatus";

export default defineComponent({
  name: "EditReviewStatusRuleDialog",
  components: { ConfirmDialog, SelectReviewStatus },
  props: {
    modelValue: { type: Boolean, default: false },
    rule: { type: Object, default: () => null },
  },
  emits: ['update:model-value', 'on:confirm'],
  setup(props, { emit }) {
    const form = ref(null);
    const formData = reactive({
      reportHash: null,
      status: null,
      message: null
    });

    const rules = {
      reportHash: [ v => !!v || "Report hash is required" ],
      selectReviewStatus: [ v => !!v || "Review status is required" ],
    };

    const dialog = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:model-value', val)
    });

    watch(() => props.rule, (newRule) => {
      formData.reportHash = newRule?.reportHash;
      formData.status = newRule?.status;
      formData.message = newRule?.message;
    });

    watch(dialog, (val) => {
      if (val) {
        form.value?.resetValidation();
      }
    });

    const saveReviewStatusRule = async () => {
      if (!form.value?.validate()) return;

      ccService.getClient().addReviewStatusRule(
        formData.reportHash,
        formData.status,
        formData.message,
        handleThriftError(async () => {
          emit('on:confirm');
          dialog.value = false;
        })
      );
    };

    return {
      form,
      formData,
      dialog,
      rules,
      saveReviewStatusRule
    };
  }
});
</script>