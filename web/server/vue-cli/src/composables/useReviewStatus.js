import { computed } from 'vue';

export function useReviewStatus() {
  const reviewStatusToClass = {
    UNREVIEWED: 'unreviewed',
    CONFIRMED: 'confirmed',
    FALSE_POSITIVE: 'false-positive',
    INTENTIONAL: 'intentional'
  };

  const reviewStatusFromCodeToString = computed(() => (status) => {
    switch (status) {
      case 'UNREVIEWED': return 'Unreviewed';
      case 'CONFIRMED': return 'Confirmed';
      case 'FALSE_POSITIVE': return 'False Positive';
      case 'INTENTIONAL': return 'Intentional';
      default: return 'Unknown';
    }
  });

  return {
    reviewStatusToClass,
    reviewStatusFromCodeToString
  };
}