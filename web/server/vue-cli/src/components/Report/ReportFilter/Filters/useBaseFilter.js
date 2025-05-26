import { ref, computed } from 'vue';

export function useBaseFilter() {
  const value = ref(null);
  const selectedItems = ref([]);
  const defaultValue = ref(null);

  const hasValue = computed(() => {
    return value.value !== null && value.value !== undefined;
  });

  const reset = () => {
    value.value = defaultValue.value;
    selectedItems.value = [];
  };

  const updateValue = (newValue) => {
    value.value = newValue;
  };

  return {
    value,
    selectedItems,
    defaultValue,
    hasValue,
    reset,
    updateValue
  };
}