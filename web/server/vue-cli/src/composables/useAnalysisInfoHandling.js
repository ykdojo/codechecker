import { ref, computed } from 'vue';
import { ccService } from '@/services';

export function useAnalysisInfoHandling() {
  const analysisInfo = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const isAnalysisRunning = computed(() => {
    return analysisInfo.value?.status === 'running';
  });

  const getAnalysisInfo = async (runId) => {
    loading.value = true;
    error.value = null;
    
    try {
      const info = await ccService.getAnalysisInfo(runId);
      analysisInfo.value = info;
      return info;
    } catch (err) {
      error.value = err;
      console.error('Failed to fetch analysis info:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    analysisInfo,
    loading,
    error,
    isAnalysisRunning,
    getAnalysisInfo
  };
}