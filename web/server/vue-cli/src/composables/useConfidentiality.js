import { computed } from 'vue';

export function useConfidentiality() {
  const confidentialityToClass = {
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low",
    UNKNOWN: "unknown"
  };

  const confidentialityFromCodeToString = computed(() => (level) => {
    switch (level) {
      case 'HIGH': return 'High';
      case 'MEDIUM': return 'Medium';
      case 'LOW': return 'Low';
      case 'UNKNOWN': return 'Unknown';
      default: return 'Unknown';
    }
  });

  return {
    confidentialityToClass,
    confidentialityFromCodeToString
  };
}