<template>
  <div>
    <v-avatar
      :size="16"
      class="mr-2"
    >
      <review-status-icon
        :status="modelValue"
        :size="16"
      />
    </v-avatar>

    <slot name="label">
      {{ label }}
    </slot>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { ReviewStatusIcon } from "@/components/Icons";
import { useReviewStatus } from "@/composables/review-status";

export default defineComponent({
  name: "ReviewStatusLabel",
  components: {
    ReviewStatusIcon
  },
  props: {
    modelValue: { type: Number, required: true }
  },
  setup(props) {
    const { reviewStatusFromCodeToString } = useReviewStatus();

    const label = computed(() => 
      reviewStatusFromCodeToString(props.modelValue)
    );

    return { label };
  }
});
</script>