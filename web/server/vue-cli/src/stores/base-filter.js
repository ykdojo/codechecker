import { defineStore } from 'pinia';
import { CompareData, DiffType } from "@cc/report-server-types";

// Create a composable for base filter functionality
export const useBaseFilterStore = (storeName) => {
  return defineStore(storeName, {
    state: () => ({
      runIds: [],
      reportFilter: {},
      cmpData: null
    }),

    getters: {
      getCmpData: (state) => {
        // If only the diff type is set we will return with null to identify that
        // no compare data is set.
        if (state.cmpData && !state.cmpData.runIds && !state.cmpData.runTag &&
            !state.cmpData.openReportsDate
        ) {
          return null;
        }

        return state.cmpData;
      }
    },

    actions: {
      setRunIds(runIds) {
        this.runIds = runIds;
      },
      setReportFilter(params) {
        Object.assign(this.reportFilter, params);
      },
      setCmpData(params) {
        if (!params) {
          this.cmpData = null;
        } else if (!this.cmpData) {
          this.cmpData = new CompareData({
            diffType: DiffType.NEW,
            ...params
          });
        } else {
          Object.assign(this.cmpData, params);
        }
      }
    }
  });
};