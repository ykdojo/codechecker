<template>
  <v-dialog
    v-model="dialog"
    :content-class="dialogClass"
    width="400"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        :label="label"
        :model-value="formattedDatetime"
        :class="[ inputClass, 'pa-0', 'ma-0' ]"
        :prepend-inner-icon="prependInnerIcon"
        :variant="outlined ? 'outlined' : undefined"
        :density="dense ? 'compact' : undefined"
        hide-details
        readonly
        v-bind="props"
      >
        <template #append>
          <slot name="append" />
        </template>
      </v-text-field>
    </template>

    <v-card>
      <v-card-text class="pa-0">
        <v-tabs v-model="activeTab">
          <v-tab value="0">
            <v-icon>mdi-calendar</v-icon>
          </v-tab>

          <v-tab
            value="1"
            :disabled="!date"
          >
            <v-icon>mdi-clock-outline</v-icon>
          </v-tab>

          <v-window v-model="activeTab">
            <v-window-item value="0">
              <v-date-picker
                v-model="date"
                width="100%"
                @update:model-value="activeTab = '1'"
              />
            </v-window-item>

            <v-window-item value="1">
              <v-time-picker
                v-model="time"
                width="100%"
                :show-seconds="true"
              />
            </v-window-item>
          </v-window>
        </v-tabs>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="grey-lighten-1"
          class="clear-btn"
          variant="text"
          @click="clear"
        >
          Clear
        </v-btn>

        <v-btn
          class="ok-btn"
          color="green-darken-1"
          variant="text"
          @click="ok"
        >
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { format, parse } from "date-fns";

const props = defineProps({
  modelValue: { type: [ Date, String ], default: null },
  label: { type: String, default: "" },
  dateFormat: { type: String, default: "yyyy-MM-dd" },
  timeFormat: { type: String, default: "HH:mm:ss" },
  defaultTime: { type: String, default: "00:00:00" },
  inputClass: { type: String, default: null },
  dialogClass: { type: String, default: null },
  outlined: { type: Boolean, default: false },
  dense: { type: Boolean, default: false },
  prependInnerIcon: { type: String, default: null },
});

const emit = defineEmits(['update:modelValue']);

const dialog = ref(false);
const activeTab = ref('0');
const date = ref(null);
const time = ref(props.defaultTime);

const dateTimeFormat = computed(() => {
  return `${props.dateFormat} ${props.timeFormat}`;
});

const dateTime = computed(() => {
  if (date.value && time.value) {
    const dt = date.value + " " + time.value;
    return parse(dt, dateTimeFormat.value, new Date());
  }
  return null;
});

const formattedDatetime = computed(() => {
  return dateTime.value ? format(dateTime.value, dateTimeFormat.value) : null;
});

const init = () => {
  if (!props.modelValue) {
    resetDateTimes();
    return;
  }

  let initValue = null;
  if (props.modelValue instanceof Date) {
    initValue = props.modelValue;
  } else if (typeof props.modelValue === "string" ||
             props.modelValue instanceof String
  ) {
    initValue = parse(props.modelValue, dateTimeFormat.value, new Date());
  }

  date.value = format(initValue, props.dateFormat);
  time.value = format(initValue, props.timeFormat);
};

const clear = () => {
  reset();
  resetDateTimes();
  emit('update:modelValue', null);
};

const ok = () => {
  reset();
  emit('update:modelValue', dateTime.value);
};

const reset = () => {
  dialog.value = false;
  activeTab.value = '0';
};

const resetDateTimes = () => {
  date.value = null;
  time.value = props.defaultTime;
};

watch(() => props.modelValue, () => {
  init();
});

onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
:deep(.v-picker.v-card) {
  box-shadow: none;

  & > .v-picker__title {
    border-radius: 0;
  }
}
</style>