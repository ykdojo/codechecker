import { computed } from 'vue';

export function useDate() {
  const formatDate = computed(() => (date) => {
    if (!date) return '';
    return new Date(date).toLocaleString();
  });

  const formatDateDiff = computed(() => (date1, date2) => {
    if (!date1 || !date2) return '';
    const diff = Math.abs(new Date(date1) - new Date(date2));
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  });

  return {
    formatDate,
    formatDateDiff
  };
}