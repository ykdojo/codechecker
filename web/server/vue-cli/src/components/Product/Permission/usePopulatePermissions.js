import { ref } from 'vue';
import { ccService } from '@/services';

export function usePopulatePermissions() {
  const permissions = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fetchPermissions = async (productId) => {
    loading.value = true;
    error.value = null;
    
    try {
      const perms = await ccService.getProductPermissions(productId);
      permissions.value = perms;
      return perms;
    } catch (err) {
      error.value = err;
      console.error('Failed to fetch permissions:', err);
    } finally {
      loading.value = false;
    }
  };

  const updatePermission = async (productId, permission) => {
    try {
      await ccService.updateProductPermission(productId, permission);
      await fetchPermissions(productId);
    } catch (err) {
      error.value = err;
      console.error('Failed to update permission:', err);
    }
  };

  return {
    permissions,
    loading,
    error,
    fetchPermissions,
    updatePermission
  };
}