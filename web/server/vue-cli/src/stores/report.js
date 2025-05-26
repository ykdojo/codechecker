import { ReportFilter } from "@cc/report-server-types";
import { useBaseFilterStore } from './base-filter';

// Create report store by extending the base filter store
export const useReportStore = useBaseFilterStore('report');

// Initialize state with ReportFilter
const store = useReportStore();
store.$state.reportFilter = new ReportFilter();