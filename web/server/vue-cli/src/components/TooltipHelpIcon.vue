<template>
  <v-tooltip
    max-width="300"
    color="black"
    location="right"
  >
    <template v-slot:activator="{ props }">
      <slot :props="props" name="activator">
        <v-icon
          :color="color"
          class="ml-1"
          :size="size"
          v-bind="props"
        >
          mdi-help-circle
        </v-icon>
      </slot>
    </template>
    <slot />
  </v-tooltip>
</template>

<script setup>
defineProps({
  color: { type: String, default: "accent" },
  size: { type: String, default: "small" }
});
</script>