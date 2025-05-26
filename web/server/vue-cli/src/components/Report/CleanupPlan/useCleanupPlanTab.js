import { ref, computed } from 'vue';
import { ccService } from '@/services';

export function useCleanupPlanTab() {
  const cleanupPlan = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const isLoaded = computed(() => cleanupPlan.value !== null);

  const loadCleanupPlan = async (planId) => {
    loading.value = true;
    error.value = null;
    
    try {
      const plan = await ccService.getCleanupPlan(planId);
      cleanupPlan.value = plan;
      return plan;
    } catch (err) {
      error.value = err;
      console.error('Failed to load cleanup plan:', err);
    } finally {
      loading.value = false;
    }
  };

  const updatePlan = async (planId, updates) => {
    try {
      const updated = await ccService.updateCleanupPlan(planId, updates);
      cleanupPlan.value = updated;
      return updated;
    } catch (err) {
      error.value = err;
      console.error('Failed to update cleanup plan:', err);
    }
  };

  return {
    cleanupPlan,
    loading,
    error,
    isLoaded,
    loadCleanupPlan,
    updatePlan
  };
}