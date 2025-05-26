<template>
  <filter-toolbar
    :title="title"
    :panel="panel"
    @clear="clear"
  >
    <template #append-toolbar-title>
      <slot name="append-toolbar-title">
        <selected-toolbar-title-items
          v-if="selectedItems"
          :value="selectedItems"
        />
      </slot>
    </template>

    <template #prepend-toolbar-title>
      <slot name="prepend-toolbar-title" />
    </template>

    <template #prepend-toolbar-items>
      <slot name="prepend-toolbar-items" />
    </template>

    <template #append-toolbar-items>
      <v-menu
        v-model="menu"
        location="end"
        :close-on-content-click="false"
        :max-width="600"
        :width="300"
        offset
      >
        <v-progress-linear
          v-if="loading"
          indeterminate
          :height="4"
        />

        <template #activator="{ props }">
          <v-btn
            icon="mdi-cog"
            size="small"
            class="settings-btn"
            v-bind="props"
          />
        </template>

        <slot
          name="menu-content"
          :items="items"
          :prev-selected-items="prevSelectedItems"
          :apply="applyFilters"
          :on-apply-finished="onApplyFinished"
          :cancel="cancel"
          :select="select"
        >
          <items
            :items.sync="items"
            :selected-items="prevSelectedItems"
            :search="search"
            :multiple="multiple"
            :limit="limit"
            @apply="applyFilters"
            @apply:finished="onApplyFinished"
            @cancel="cancel"
            @select="select"
          >
            <template #append-toolbar>
              <slot name="append-toolbar" />
            </template>
            <template #icon="{ item }">
              <slot name="icon" :item="item" />
            </template>
            <template #no-items>
              <slot name="no-items" />
            </template>
            <template #title="{ item }">
              <slot name="title" :item="item" />
            </template>
          </items>
        </slot>
      </v-menu>
    </template>

    <slot :update-selected-items="updateSelectedItems">
      <items-selected
        :selected-items="selectedItems"
        :multiple="multiple"
        @update:select="updateSelectedItems"
      >
        <template #icon="{ item }">
          <slot name="icon" :item="item" />
        </template>

        <template #title="{ item }">
          <slot name="title" :item="item" />
        </template>
      </items-selected>
    </slot>
  </filter-toolbar>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import FilterToolbar from "../Layout/FilterToolbar";
import {
  Items,
  ItemsSelected,
  SelectedToolbarTitleItems,
  filterIsChanged,
} from ".";

const props = defineProps({
  title: { type: String, required: true },
  bus: { type: Object, required: true },
  fetchItems: { type: Function, required: true },
  selectedItems: { type: Array, default: () => [] },
  multiple: { type: Boolean, default: true },
  search: { type: Object, default: null },
  loading: { type: Boolean, default: false },
  panel: { type: Boolean, default: false },
  limit: { type: Number, default: null },
  apply: {
    type: Function,
    default: function (selectedItems) {
      if (!filterIsChanged(props.selectedItems, selectedItems))
        return;

      updateSelectedItems(selectedItems);
    }
  }
});

const emit = defineEmits(['input', 'clear', 'select', 'on-menu-show', 'cancel']);

const items = ref([]);
const reloadItems = ref(true);
const menu = ref(false);
const prevSelectedItems = ref([]);
const preventApply = ref(false);

const applyFilters = computed(() => props.apply.bind(null));

watch(menu, async (show) => {
  if (show) {
    emit('on-menu-show');

    preventApply.value = false;

    if (reloadItems.value) {
      items.value = await props.fetchItems();
      reloadItems.value = false;
    }

    select(JSON.parse(JSON.stringify(props.selectedItems)));
  } else if (!preventApply.value) {
    applyFilters.value(prevSelectedItems.value);
  }
});

onMounted(() => {
  props.bus.$on("update", () => reloadItems.value = true);

  props.bus.$on("select", predicate => {
    const item = items.value.find(predicate);
    if (item &&
        prevSelectedItems.value.findIndex(i => i.id === item.id) === -1
    ) {
      // The item is not selected yet.
      prevSelectedItems.value.push(item);
    }
  });
});

function onApplyFinished() {
  preventApply.value = true;
  menu.value = false;
}

function filterIsChanged() {
  if (props.selectedItems.length !== prevSelectedItems.value.length) {
    return true;
  }

  const curr = props.selectedItems.map(item => item.title).sort();
  const prev = prevSelectedItems.value.map(item => item.title).sort();

  for (let i = 0; i < curr.length; ++i) {
    if (curr[i] !== prev[i]) return true;
  }

  return false;
}

function cancel() {
  preventApply.value = true;
  menu.value = false;
  emit('cancel');
}

function select(selectedItems) {
  prevSelectedItems.value = selectedItems;
  emit('select', prevSelectedItems.value);
}

function updateSelectedItems(selectedItems) {
  emit('input', selectedItems);
}

function clear() {
  emit('clear');
}
</script>