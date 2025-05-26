<template>
  <v-container>
    <v-tabs v-model="tabValue">
      <v-tab
        v-for="item in ['Open', 'Closed']"
        :key="item"
        class="font-weight-bold subtitle-2 text-capitalize"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tabValue">
      <v-tab-item>
        <slot name="open" />
      </v-tab-item>

      <v-tab-item>
        <slot name="closed" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  value: { type: Number, default: null }
});

const emit = defineEmits(['input']);

const tabValue = computed({
  get: () => props.value,
  set: (val) => emit('input', val)
});
</script>