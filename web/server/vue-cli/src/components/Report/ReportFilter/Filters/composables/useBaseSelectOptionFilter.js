import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import eventBus from "@/eventBus";
import { useBaseFilter } from './useBaseFilter';

export function useBaseSelectOptionFilter(id, defaultValues = null) {
  const route = useRoute();
  const { updateReportFilter, panel } = useBaseFilter();

  const selectedItems = ref([]);
  const bus = ref(eventBus);
  const loading = ref(false);

  async function setSelectedItems(items, updateUrl = true) {
    selectedItems.value = items;
    await updateReportFilter();

    if (updateUrl) {
      emit('update:url');
    }
  }

  function encodeValue(value) {
    return value;
  }

  function decodeValue(value) {
    return value;
  }

  function titleFormatter(id) {
    return encodeValue(id);
  }

  const urlState = computed(() => {
    const state = selectedItems.value.map(item => encodeValue(item.id));
    return { [id]: state.length ? state : undefined };
  });

  function getIconClass() {}

  async function initCheckOptionsByUrl() {
    let state = [].concat(route.query[id] || []);
    if (!state.length && defaultValues) {
      state = defaultValues;
    }

    if (!state.length) return;

    const items = state.map(s => {
      const itemId = decodeValue(s);
      return {
        id: itemId,
        title: titleFormatter(itemId),
        count: "N/A",
        icon: getIconClass(itemId)
      };
    });

    await setSelectedItems(items, false);
  }

  function initByUrl() {
    return initCheckOptionsByUrl();
  }

  async function afterInit() {
    registerWatchers();
    update();
    initPanel();
  }

  function initPanel() {
    panel.value = selectedItems.value.length > 0;
  }

  async function update() {
    bus.value.emit("update");

    if (!selectedItems.value.length) return;

    const items = await fetchItems({
      limit: selectedItems.value.length,
      query: selectedItems.value.map(item => item.id)
    });

    selectedItems.value.forEach(selectedItem => {
      const item = items.find(i => i.id === selectedItem.id);
      selectedItem.count = item ? item.count : null;
      selectedItem.value = item ? item.value : null;
    });
  }

  function filterItems(value) {
    return fetchItems({ query: value ? [`${value}*`] : null });
  }

  function clear(updateUrl) {
    setSelectedItems([], updateUrl);
  }

  async function onRunIdsChange() {
    update();
  }

  async function onReportFilterChange() {
    update();
  }

  return {
    selectedItems,
    bus,
    loading,
    panel,
    setSelectedItems,
    encodeValue,
    decodeValue,
    titleFormatter,
    urlState,
    getIconClass,
    initByUrl,
    afterInit,
    initPanel,
    update,
    filterItems,
    clear,
    onRunIdsChange,
    onReportFilterChange
  };
}