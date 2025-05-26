<template>
  <span class="count-chips">
    <component
      :is="tag"
      class="text-no-wrap"
    >
      <v-chip
        v-if="showingGood"
        color="success"
        :title="goodText"
        variant="outlined"
        theme="dark"
        size="small"
        @click="$emit('showing-good-click')"
      >
        <template v-slot:prepend>
          <v-icon class="mr-1">
            mdi-check
          </v-icon>
        </template>
        {{ numGood }}
      </v-chip>

      <v-divider
        v-if="showDividers &&
          ((showingGood && showingBad) || (showingGood && showingTotal))"
        class="mx-2 d-inline"
        inset
        vertical
      />

      <v-chip
        v-if="showingBad"
        color="error"
        :title="badText"
        variant="outlined"
        theme="dark"
        size="small"
        @click="$emit('showing-bad-click')"
      >
        <template v-slot:prepend>
          <v-icon class="mr-1">
            mdi-close
          </v-icon>
        </template>
        {{ numBad }}
      </v-chip>

      <v-divider
        v-if="showDividers && showingBad && showingTotal"
        class="mx-2 d-inline"
        inset
        vertical
      />

      <v-chip
        v-if="showingTotal"
        color="grey-lighten-1"
        :title="totalText"
        variant="elevated"
        size="small"
      >
        <template v-slot:prepend>
          <v-icon class="mr-1">
            mdi-sigma
          </v-icon>
        </template>
        {{ numTotal }}
      </v-chip>
    </component>
  </span>
</template>

<script setup>
import { computed } from 'vue';
import { AnalyzerStatisticsIcon } from "@/components/Icons";

const props = defineProps({
  tag: { type: String, default: "span" },
  numGood: { type: Number, default: 0 },
  numBad: { type: Number, default: 0 },
  numTotal: { type: Number, default: 0 },
  goodText: { type: String, default: "" },
  badText: { type: String, default: "" },
  totalText: { type: String, default: "" },
  showDividers: { type: Boolean, default: true },
  showZeroChips: { type: Boolean, default: false },
  showTotal: { type: Boolean, default: false },
  simplifyShowingIfAll: { type: Boolean, default: true }
});

defineEmits(['showing-good-click', 'showing-bad-click']);

const total = computed(() => {
  return props.numTotal > 0
    ? props.numTotal
    : (props.numGood + props.numBad);
});

const canSimplify = computed(() => {
  return props.simplifyShowingIfAll &&
    (total.value === props.numGood || total.value === props.numBad);
});

const needToShowBothGoodAndBad = computed(() => {
  return !canSimplify.value &&
    (props.showZeroChips || (props.numGood > 0 && props.numBad > 0));
});

const showingGood = computed(() => {
  return needToShowBothGoodAndBad.value || props.numGood > 0 ||
    (canSimplify.value && total.value === props.numGood);
});

const showingBad = computed(() => {
  return needToShowBothGoodAndBad.value || props.numBad > 0 ||
    (props.simplifyShowingIfAll && total.value === props.numBad);
});

const showingTotal = computed(() => {
  return props.showTotal && !canSimplify.value &&
    (total.value > 0 || (total.value === 0 && props.showZeroChips));
});
</script>