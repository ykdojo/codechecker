<script setup>
import { ref, computed, onMounted, onActivated, watch } from 'vue';
import _ from "lodash";
import {
  endOfMonth, endOfToday, endOfWeek, endOfYear, format, subDays, subMonths,
  subWeeks, subYears
} from "date-fns";
import { Line } from 'vue-chartjs';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import { ccService, handleThriftError } from "@cc-api";
import { ReportFilter, Severity } from "@cc/report-server-types";
import { useDateMixin, useSeverityMixin } from "@/mixins";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const props = defineProps({
  bus: { type: Object, required: true },
  getStatisticsFilters: { type: Function, required: true },
  interval: { type: String, required: true },
  resolution: { type: String, required: true },
});

const dates = ref([]);
const { getUnixTime } = useDateMixin();
const { severityFromCodeToColor, severityFromCodeToString } = useSeverityMixin();

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      mode: "index",
      callbacks: {
        footer: function (tooltipItems) {
          const total = tooltipItems.reduce((acc, curr) => {
            return acc + curr.dataset.data[curr.dataIndex];
          }, 0);
          return `Total: ${total}`;
        },
      },
      intersect: false
    },
  },
  interaction: {
    mode: "nearest",
    intersect: true
  },
  scales: {
    x: {
      ticks: {
        padding: 10
      }
    }
  }
};

const chartData = ref({
  labels: [],
  datasets: Object.keys(Severity).reverse().map(s => {
    const severityId = Severity[s];
    const color = severityFromCodeToColor(severityId);

    return {
      type: "line",
      label: severityFromCodeToString(severityId),
      backgroundColor: color,
      borderColor: color,
      borderWidth: 3,
      fill: false,
      pointRadius: 5,
      pointHoverRadius: 10,
      datalabels: {
        backgroundColor: color,
        color: "white",
        borderRadius: 4,
        font: {
          weight: "bold"
        },
      },
      data: []
    };
  })
});

const setChartData = () => {
  const intervalNum = parseInt(props.interval);
  if (isNaN(intervalNum) || intervalNum <= 0)
    return;

  let dateFormat = "yyyy. MMM. dd";

  if (props.resolution === "days") {
    const today = endOfToday();
    dates.value = [...new Array(intervalNum).keys()].map(i =>
      subDays(today, i));
  }
  else if (props.resolution === "weeks") {
    const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 1 });
    dates.value = [...new Array(intervalNum).keys()].map(i =>
      subWeeks(endOfCurrentWeek, i));
  }
  else if (props.resolution === "months") {
    const endOfCurrentMonth = endOfMonth(new Date());
    dates.value = [...new Array(intervalNum).keys()].map(i =>
      subMonths(endOfCurrentMonth, i));
    dateFormat = "yyyy. MMM";
  }
  else if (props.resolution === "years") {
    const endOfCurrentYear = endOfYear(new Date());
    dates.value = [...new Array(intervalNum).keys()].map(i =>
      subYears(endOfCurrentYear, i));
    dateFormat = "yyyy";
  }

  chartData.value.labels = [...dates.value].reverse().map((d, idx) => {
    const date = format(d, dateFormat);
    if (idx === dates.value.length - 1)
      return `${date} (Current)`;
    return date;
  });

  chartData.value.datasets.forEach(d => {
    if (dates.value.length > d.data.length) {
      d.data = [
        ...new Array(dates.value.length - d.data.length).fill(null),
        ...d.data
      ];
    } else {
      d.data = d.data.slice(d.data.length - dates.value.length,
        d.data.length);
    }
  });

  chartData.value = { ...chartData.value };
};

const fetchOutstandingReports = async (date) => {
  const { runIds, reportFilter } = props.getStatisticsFilters();

  const rFilter = new ReportFilter(reportFilter);
  rFilter.openReportsDate = getUnixTime(date);
  rFilter.detectionStatus = null;

  const cmpData = null;

  return new Promise(resolve => {
    ccService.getClient().getSeverityCounts(runIds, rFilter, cmpData,
      handleThriftError(res => resolve(res)));
  });
};

const fetchData = async (datesToUpdate) => {
  dates.value.forEach(async (d, idx) => {
    if (!datesToUpdate.includes(d)) return;

    const reportCount = await fetchOutstandingReports(d);
    const datasets = chartData.value.datasets;

    Object.keys(Severity).reverse().forEach((s, i) => {
      const severityId = Severity[s];
      const numOfReports = reportCount[severityId]?.toNumber() || 0;

      const data = datasets[i].data;
      data[data.length - 1 - idx] = numOfReports;
    });

    chartData.value = { ...chartData.value };
  });
};

watch(() => props.interval, 
  _.debounce(() => {
    const oldSize = dates.value.length;
    const newSize = parseInt(props.interval);

    setChartData();

    if (newSize > oldSize) {
      const newDates = dates.value.slice(oldSize);
      fetchData(newDates);
    }
  }, 500)
);

watch(() => props.resolution, () => {
  setChartData();
  fetchData(dates.value);
});

onMounted(() => {
  setChartData();
});

onActivated(() => {
  props.bus.$on("refresh", () => fetchData(dates.value));
});
</script>

<template>
  <Line :data="chartData" :options="options" />
</template>