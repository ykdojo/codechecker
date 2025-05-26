<template>
  <v-dialog
    v-model="modelValue"
    persistent
    :content-class="contentClass"
    :max-width="maxWidth"
    :scrollable="scrollable"
  >
    <template v-slot:activator="{ props }">
      <slot name="activator" :props="props" />
    </template>

    <v-card
      v-if="loading"
      color="primary"
      theme="dark"
    >
      <v-card-text>
        Loading...
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        />
      </v-card-text>
    </v-card>

    <v-card v-else>
      <v-card-title
        class="pt-3 pb-2 title primary text-white"
        primary-title
      >
        <slot name="title" />

        <v-spacer />

        <v-btn class="close-btn" icon variant="text" @click="updateDialog(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-progress-linear v-if="confirmInProgress" indeterminate />

      <v-card-text class="pa-0">
        <v-container fluid>
          <slot name="content" />
        </v-container>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />

        <v-btn
          variant="text"
          class="cancel-btn"
          :color="cancelBtnColor"
          @click="updateDialog(false)"
        >
          {{ cancelBtnLabel }}
        </v-btn>

        <v-btn
          variant="text"
          class="confirm-btn"
          :color="confirmBtnColor"
          @click="$emit('confirm')"
        >
          {{ confirmBtnLabel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  cancelBtnLabel: { type: String, default: "Cancel" },
  cancelBtnColor: { type: String, default: "error" },
  confirmBtnLabel: { type: String, default: "Save" },
  confirmBtnColor: { type: String, default: "primary" },
  confirmInProgress: { type: Boolean, default: false },
  maxWidth: { type: String, default: "600px" },
  scrollable: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
  contentClass: { type: String, default: null }
});

const emit = defineEmits(['update:modelValue', 'confirm']);

const updateDialog = (value) => {
  emit('update:modelValue', value);
};
</script>