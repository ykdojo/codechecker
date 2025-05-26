import { ref } from 'vue';

export function useBaseFilter() {
  const panel = ref(false);

  async function updateReportFilter() {
    // This should be implemented by the component using this composable
    throw new Error('updateReportFilter must be implemented');
  }

  return {
    panel,
    updateReportFilter
  };
}