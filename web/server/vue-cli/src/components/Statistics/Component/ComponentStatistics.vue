<script setup>
import { ref, defineEmits } from 'vue';
import {
  CompareData,
  DiffType,
  ReportFilter,
  ReviewStatus
} from "@cc/report-server-types";
import { useToCSV } from "@/mixins";
import {
  BaseStatistics,
  UniqueStatWarning,
  getComponents,
  initDiffField
} from "@/components/Statistics";
import {
  getComponentStatistics
} from "@/components/Statistics/StatisticsHelper";
import ComponentStatisticsTable from "./ComponentStatisticsTable";

const props = defineProps({
  bus: { type: Object, required: true },
  namespace: { type: String, required: true }
});

const emit = defineEmits(['update:modelValue']);
const { toCSV } = useToCSV();
const loading = ref(false);
const statistics = ref([]);
const components = ref([]);
const statisticsFilters = ref({});

const fieldsToUpdate = [
  "reports", "unreviewed", "confirmed",
  "falsePositive", "intentional"
];

const downloadCSV = () => {
  const data = [
    [
      "Component", "Unreviewed", "Confirmed bug",
      "Outstanding reports (Unreviewed + Confirmed)", "False positive",
      "Intentional", "Suppressed reports (False positive + Intentional)",
      "All reports"
    ],
    ...statistics.value.map(stat => {
      return [
        stat.component, stat.unreviewed.count, stat.confirmed.count,
        stat.outstanding.count, stat.falsePositive.count,
        stat.intentional.count, stat.suppressed.count, stat.reports.count
      ];
    })
  ];

  toCSV(data, "codechecker_component_statistics.csv");
};

const initStatistics = (componentList) => {
  statistics.value = componentList.map(component => ({
    component: component.name,
    value: component.value || component.description,
    reports: initDiffField(undefined),
    unreviewed: initDiffField(undefined),
    confirmed: initDiffField(undefined),
    outstanding: initDiffField(undefined),
    falsePositive: initDiffField(undefined),
    intentional: initDiffField(undefined),
    suppressed: initDiffField(undefined)
  }));
};

const getStatisticsForComponent = async (component, runIds, reportFilter, cmpData) => {
  const res = await getComponentStatistics(component, runIds, reportFilter,
    cmpData);

  return {
    component: component.name,
    value: component.value || component.description,
    reports: initDiffField(res.reports),
    unreviewed: initDiffField(res.unreviewed),
    confirmed: initDiffField(res.confirmed),
    outstanding: initDiffField(res.outstanding),
    falsePositive: initDiffField(res.falsePositive),
    intentional: initDiffField(res.intentional),
    suppressed: initDiffField(res.suppressed)
  };
};

const getNewReports = async (component) => {
  const { runIds, reportFilter, cmpData: baseCmpData } = BaseStatistics.methods.getStatisticsFilters();

  const modifiedReportFilter = new ReportFilter(reportFilter);
  modifiedReportFilter["componentNames"] = [component.name];

  const modifiedCmpData = new CompareData(baseCmpData);
  modifiedCmpData.diffType = DiffType.NEW;

  return getStatisticsForComponent(component, runIds, modifiedReportFilter, modifiedCmpData);
};

const getResolvedReports = async (component) => {
  const { runIds, reportFilter, cmpData: baseCmpData } = BaseStatistics.methods.getStatisticsFilters();

  const modifiedReportFilter = new ReportFilter(reportFilter);
  modifiedReportFilter["componentNames"] = [component.name];

  const modifiedCmpData = new CompareData(baseCmpData);
  modifiedCmpData.diffType = DiffType.RESOLVED;

  return getStatisticsForComponent(component, runIds, modifiedReportFilter, modifiedCmpData);
};

const fetchDifference = async () => {
  const cmpData = BaseStatistics.computed.cmpData.value;
  if (!cmpData) return;

  return Promise.all(components.value.map(component => {
    const q1 = getNewReports(component).then(newReports => {
      const row = statistics.value.find(s =>
        s.component === component.name);

      if (row) {
        fieldsToUpdate.forEach(f => row[f].new = newReports[f].count);
        BaseStatistics.methods.updateCalculatedFields(row, newReports, "new");
      }
    });

    const q2 = getResolvedReports(component).then(resolvedReports => {
      const row = statistics.value.find(s =>
        s.component === component.name);

      if (row) {
        fieldsToUpdate.forEach(f =>
          row[f].resolved = resolvedReports[f].count);
        BaseStatistics.methods.updateCalculatedFields(row, resolvedReports, "resolved");
      }
    });

    return Promise.all([q1, q2]);
  }));
};

const fetchStatistics = async () => {
  loading.value = true;
  statistics.value = [];

  components.value = await getComponents();
  initStatistics(components.value);

  statisticsFilters.value = BaseStatistics.methods.getStatisticsFilters();
  const { runIds, reportFilter, cmpData } = statisticsFilters.value;

  const queries = components.value.map(async component => {
    const res = await getStatisticsForComponent(component, runIds, reportFilter,
      cmpData);

    const idx = statistics.value.findIndex(s =>
      s.component === component.name);

    statistics.value[idx] = {
      ...res,
      loading: false,
      checkerStatistics: null
    };

    statistics.value = [...statistics.value];

    return statistics.value[idx];
  });

  await Promise.all(queries).then(stats =>
    statistics.value = stats);

  await fetchDifference();

  loading.value = false;
};
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h3 class="title text-primary mb-2">
          <v-btn
            color="primary"
            variant="outlined"
            @click="downloadCSV"
          >
            Export CSV
          </v-btn>

          <v-btn
            icon
            title="Reload statistics"
            color="primary"
            @click="fetchStatistics"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </h3>

        <component-statistics-table
          :items="statistics"
          :loading="loading"
          :filters="statisticsFilters"
        />

        <unique-stat-warning v-if="reportFilter.isUnique" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
:deep(.v-data-table__expanded__content .v-card) {
  padding: 10px;
}
</style>