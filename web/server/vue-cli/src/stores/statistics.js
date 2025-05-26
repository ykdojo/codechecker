import { ReportFilter } from "@cc/report-server-types";
import { useBaseFilterStore } from './base-filter';

// Create statistics store by extending the base filter store
export const useStatisticsStore = useBaseFilterStore('statistics');

// Initialize state with ReportFilter
const store = useStatisticsStore();
store.$state.reportFilter = new ReportFilter();