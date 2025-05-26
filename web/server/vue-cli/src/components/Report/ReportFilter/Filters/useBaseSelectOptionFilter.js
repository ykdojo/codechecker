import { ref, computed } from 'vue';
import { useBaseFilter } from './useBaseFilter';

export function useBaseSelectOptionFilter(options = [], multiple = false) {
  const baseFilter = useBaseFilter();
  const selected = ref([]);
  const searchQuery = ref('');

  const filteredOptions = computed(() => {
    if (!searchQuery.value) return options;
    
    return options.filter(option => 
      option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  const handleSelect = (option) => {
    if (multiple) {
      const index = selected.value.findIndex(item => item.value === option.value);
      if (index === -1) {
        selected.value.push(option);
      } else {
        selected.value.splice(index, 1);
      }
    } else {
      selected.value = [option];
    }
    
    baseFilter.updateValue(
      multiple 
        ? selected.value.map(item => item.value)
        : selected.value[0]?.value
    );
  };

  const reset = () => {
    baseFilter.reset();
    selected.value = [];
    searchQuery.value = '';
  };

  return {
    ...baseFilter,
    selected,
    searchQuery,
    filteredOptions,
    handleSelect,
    reset
  };
}