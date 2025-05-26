<template>
  <v-select
    v-model="reviewStatus"
    :items="items"
    :hide-details="true"
    :menu-props="{ contentClass: 'select-review-status-menu' }"
    :label="label"
    :clearable="clearable"
    :rules="rules"
    item-title="label"
    item-value="id"
    class="select-review-status small"
    height="0"
    flat
    density="compact"
    variant="outlined"
    @update:model-value="onChange"
  >
    <template #selection="{ item }">
      <select-review-status-item :item="item.raw" />
    </template>

    <template #item="{ item }">
      <select-review-status-item :item="item.raw" />
    </template>
  </v-select>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { ReviewStatus } from "@cc/report-server-types";
import { useReviewStatus } from "@/composables/review-status";
import { SelectReviewStatusItem } from "@/components/Report";

export default defineComponent({
  name: "SelectReviewStatus",
  components: { SelectReviewStatusItem },
  props: {
    modelValue: { type: Number, default: null },
    label: { type: String, default: "Select review status" },
    clearable: { type: Boolean, default: true },
    rules: { type: Array, default: () => [] }
  },
  emits: ['update:model-value', 'change'],
  setup(props, { emit }) {
    const { reviewStatusFromCodeToString } = useReviewStatus();

    const items = ref(Object.values(ReviewStatus).map(id => ({
      id: id,
      label: reviewStatusFromCodeToString(parseInt(id))
    })));

    const reviewStatus = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:model-value', val)
    });

    const onChange = () => {
      emit('change', props.modelValue);
    };

    return {
      items,
      reviewStatus,
      onChange
    };
  }
});
</script>