import { ref } from 'vue';
import { ccService } from '@/services';

export function useVersion() {
  const version = ref(null);

  const getVersion = async () => {
    try {
      const versionInfo = await ccService.getVersion();
      version.value = versionInfo;
      return versionInfo;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    version,
    getVersion
  };
}