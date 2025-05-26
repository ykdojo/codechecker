import { computed } from 'vue';

export function useBugPathLengthColor() {
  const getBugPathLengthClass = computed(() => (length) => {
    if (length <= 5) return 'length-ok';
    if (length <= 10) return 'length-warning';
    return 'length-danger';
  });

  return {
    getBugPathLengthClass
  };
}