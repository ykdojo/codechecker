import { computed } from 'vue';

export function useSeverity() {
  const severityToClass = {
    CRITICAL: "critical",
    HIGH: "high",
    MEDIUM: "medium",
    LOW: "low",
    STYLE: "style",
    UNSPECIFIED: "unspecified"
  };

  const severityFromCodeToString = computed(() => (severityLevel) => {
    switch (severityLevel) {
      case 'CRITICAL': return 'Critical';
      case 'HIGH': return 'High';
      case 'MEDIUM': return 'Medium';
      case 'LOW': return 'Low';
      case 'STYLE': return 'Style';
      case 'UNSPECIFIED': return 'Unspecified';
      default: return 'Unknown';
    }
  });

  const severityFromStringToInt = computed(() => (severityLevel) => {
    switch (severityLevel.toLowerCase()) {
      case 'critical': return 5;
      case 'high': return 4;
      case 'medium': return 3;
      case 'low': return 2;
      case 'style': return 1;
      case 'unspecified': return 0;
      default: return -1;
    }
  });

  return {
    severityToClass,
    severityFromCodeToString,
    severityFromStringToInt
  };
}