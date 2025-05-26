<![CDATA[<template>
  <new-feature-item :color="color" :flat="false">
    <template #title>
      <slot name="title" />
    </template>

    <template #default>
      <slot />
    </template>
  </new-feature-item>
</template>

<script setup>
import NewFeatureItem from "./NewFeatureItem";

defineProps({
  color: { type: String, default: "primary" }
});
</script>]]>