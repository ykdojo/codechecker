<script setup>
import { ref, computed, onMounted, onActivated, onDeactivated } from 'vue';
import { useStore } from 'vuex';
import { CompareData, DiffType, ReportFilter } from "@cc/report-server-types";

const props = defineProps({
  bus: { type: Object, required: true },
  namespace: { type: String, required: true }
});

const store = useStore();
const statistics = ref([]);

const runIds = computed(() => 
  store.getters[`${props.namespace}/getRunIds`]
);

const reportFilter = computed(() => 
  store.getters[`${props.namespace}/getReportFilter`]
);

const cmpData = computed(() => 
  store.getters[`${props.namespace}/getCmpData`]
);

const updateCalculatedFields = (oldValues, newValues, type) => {
  if (oldValues["outstanding"] !== undefined) {
    oldValues["outstanding"][type] =
      newValues["unreviewed"].count + newValues["confirmed"].count;
  }

  if (oldValues["suppressed"] !== undefined) {
    oldValues["suppressed"][type] =
      newValues["falsePositive"].count + newValues["intentional"].count;
  }
};

const updateStatistics = (reports, name, type) => {
  const fieldToUpdate = ["reports", "unreviewed", "confirmed",
    "falsePositive", "intentional"];

  statistics.value.forEach(s => {
    const row = reports.find(n => n[name] === s[name]);
    if (row) {
      fieldToUpdate.forEach(f => s[f][type] = row[f].count);
      updateCalculatedFields(s, row, type);
    }
  });
};

const getStatistics = async (/* runIds, reportFilter, cmpData */) => {
  // Implementation to be provided by child components
};

const getNewReports = () => {
  const currentRunIds = runIds.value;
  const currentReportFilter = reportFilter.value;
  const currentCmpData = new CompareData(cmpData.value);
  currentCmpData.diffType = DiffType.NEW;

  return getStatistics(currentRunIds, currentReportFilter, currentCmpData);
};

const getResolvedReports = () => {
  const currentRunIds = runIds.value;
  const currentReportFilter = reportFilter.value;
  const currentCmpData = new CompareData(cmpData.value);
  currentCmpData.diffType = DiffType.RESOLVED;

  return getStatistics(currentRunIds, currentReportFilter, currentCmpData);
};

const fetchDifference = async (name) => {
  if (!cmpData.value) return;

  const q1 = getNewReports().then(newReports => {
    updateStatistics(newReports, name, "new");
  });

  const q2 = getResolvedReports().then(resolvedReports => {
    updateStatistics(resolvedReports, name, "resolved");
  });

  return Promise.all([q1, q2]);
};

const getStatisticsFilters = () => {
  let currentRunIds = runIds.value;
  let currentReportFilter = reportFilter.value;
  const currentCmpData = null;

  // If compare data is set, get statistics for the compared to data.
  if (cmpData.value) {
    currentRunIds = cmpData.value.runIds;
    currentReportFilter = new ReportFilter(reportFilter.value);
    currentReportFilter.runTag = cmpData.value.runTag;
  }

  return {
    runIds: currentRunIds,
    reportFilter: currentReportFilter,
    cmpData: currentCmpData
  };
};

const fetchStatistics = () => {
  // Implementation to be provided by child components
};

onMounted(() => {
  // Handle HMR data persistence
  if (process.env.NODE_ENV !== "production") {
    if (import.meta.hot) {
      if (import.meta.hot.data) {
        statistics.value = import.meta.hot.data.statistics;
      }

      import.meta.hot.dispose(data => {
        data.statistics = statistics.value;
      });
    }
  }
});

onActivated(() => {
  props.bus.$on("refresh", fetchStatistics);
});

onDeactivated(() => {
  props.bus.$off("refresh", fetchStatistics);
});

// Expose methods and data for child components
defineExpose({
  statistics,
  fetchStatistics,
  updateCalculatedFields,
  updateStatistics,
  fetchDifference,
  getStatistics,
  getNewReports,
  getResolvedReports,
  getStatisticsFilters
});
</script>