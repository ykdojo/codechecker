<script setup>
import { ref } from 'vue';
import { BaseStatisticsTable } from "@/components/Statistics";

const props = defineProps({
  items: { type: Array, required: true },
  loading: { type: Boolean, default: false }
});

const headers = ref([
  {
    title: "Severity",
    key: "severity",
    align: "center"
  },
  {
    title: "Unreviewed",
    key: "unreviewed.count",
    align: "center"
  },
  {
    title: "Confirmed bug",
    key: "confirmed.count",
    align: "center"
  },
  {
    title: "Outstanding reports",
    key: "outstanding.count",
    align: "center"
  },
  {
    title: "False positive",
    key: "falsePositive.count",
    align: "center"
  },
  {
    title: "Intentional",
    key: "intentional.count",
    align: "center"
  },
  {
    title: "Suppressed reports",
    key: "suppressed.count",
    align: "center"
  },
  {
    title: "All reports",
    key: "reports.count",
    align: "center"
  }
]);
</script>

<template>
  <base-statistics-table
    class="severity-statistics"
    :headers="headers"
    :items="items"
    :loading="loading"
    :mobile-breakpoint="1000"
    :colspan="1"
    loading-text="Loading severity statistics..."
    item-key="severity"
    :default-sort="[{ key: 'severity', order: 'desc' }]"
    :necessary-total="true"
  />
</template>

<style lang="scss" scoped>
$class-name: ".severity-statistics > :deep(.v-data-table__wrapper)";
$unreviewed_col: 2;
$colspan: 0;

@import "@/components/Statistics/style.scss";
</style>