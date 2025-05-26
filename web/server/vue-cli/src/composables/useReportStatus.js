import { computed } from 'vue';

export function useReportStatus() {
  const reportStatusToClass = {
    RESOLVED: 'resolved',
    UNRESOLVED: 'unresolved',
    FALSE_POSITIVE: 'false-positive',
    CONFIRMED: 'confirmed',
    REOPENED: 'reopened'
  };

  const reportStatusFromCodeToString = computed(() => (status) => {
    switch (status) {
      case 'RESOLVED': return 'Resolved';
      case 'UNRESOLVED': return 'Unresolved';
      case 'FALSE_POSITIVE': return 'False Positive';
      case 'CONFIRMED': return 'Confirmed';
      case 'REOPENED': return 'Reopened';
      default: return 'Unknown';
    }
  });

  return {
    reportStatusToClass,
    reportStatusFromCodeToString
  };
}