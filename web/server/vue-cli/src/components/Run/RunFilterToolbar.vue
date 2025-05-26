<template>
  <v-toolbar flat class="run-filter-toolbar mb-4">
    <v-row>
      <v-col align-self="center">
        <v-text-field
          v-model="localRunName"
          class="run-name"
          prepend-inner-icon="mdi-magnify"
          label="Search for runs..."
          single-line
          hide-details
          outlined
          solo
          flat
          dense
          @update:model-value="setRunName"
        />
      </v-col>

      <v-col align-self="center">
        <v-text-field
          v-model="localRunTag"
          class="run-tag"
          prepend-inner-icon="mdi-tag"
          label="Filter events by tag name..."
          clearable
          single-line
          hide-details
          outlined
          solo
          flat
          dense
          @update:model-value="setRunTag"
        >
          <template #append>
            <tooltip-help-icon>
              Filter run history events by the given tag name.<br>
              <i>Note</i>: this will filter only the history events.
            </tooltip-help-icon>
          </template>
        </v-text-field>
      </v-col>

      <v-col align-self="center" width="50px">
        <date-time-picker
          v-model="localStoredAfter"
          input-class="stored-after"
          dialog-class="stored-after"
          label="History stored after..."
          prepend-inner-icon="mdi-calendar-arrow-right"
          outlined
          dense
          @update:model-value="setStoredAfter"
        >
          <template #append>
            <tooltip-help-icon>
              Filter run history events that were stored after the given
              date.<br>
              <i>Note</i>: this will filter only the history events.
            </tooltip-help-icon>
          </template>
        </date-time-picker>
      </v-col>

      <v-col align-self="center" cols="2">
        <date-time-picker
          v-model="localStoredBefore"
          input-class="stored-before"
          dialog-class="stored-before"
          label="History stored before..."
          prepend-inner-icon="mdi-calendar-arrow-left"
          outlined
          dense
          @update:model-value="setStoredBefore"
        >
          <template #append>
            <tooltip-help-icon>
              Filter run history events that were stored before the given
              date.<br>
              <i>Note</i>: this will filter only the history events.
            </tooltip-help-icon>
          </template>
        </date-time-picker>
      </v-col>

      <v-spacer />

      <v-col align="right">
        <delete-run-btn
          :selected="selected"
          @on-confirm="update"
        />

        <v-btn
          outlined
          color="primary"
          class="diff-runs-btn mr-2"
          :to="diffTargetRoute"
          :disabled="isDiffBtnDisabled"
        >
          <v-icon left>
            mdi-select-compare
          </v-icon>
          Diff
          <tooltip-help-icon>
            Compare the set of <i>outstanding reports</i> in two run (or tag)
            sets.<br>
            A report is outstanding if <b> all of the following is true</b>:
            <ul>
              <li>
                its detection status is <i>new</i>, <i>reopened</i>, or
                <i>unresolved</i>,
              </li>
              <li>
                its review status is <i>unreviewed</i> or <i>confirmed</i>.
              </li>
            </ul>
          </tooltip-help-icon>
        </v-btn>

        <v-btn
          icon
          class="reload-runs-btn"
          title="Reload runs"
          color="primary"
          @click="update"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script>
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import _ from "lodash";
import {
  SET_RUN_HISTORY_RUN_TAG,
  SET_RUN_HISTORY_STORED_AFTER,
  SET_RUN_HISTORY_STORED_BEFORE,
  SET_RUN_NAME
} from "@/store/mutations.type";

import { DateMixin } from "@/mixins";
import DateTimePicker from "@/components/DateTimePicker";
import TooltipHelpIcon from "@/components/TooltipHelpIcon";
import { DeleteRunBtn } from "@/components/Run";

export default defineComponent({
  name: "RunFilter",
  components: {
    DateTimePicker,
    DeleteRunBtn,
    TooltipHelpIcon
  },
  mixins: [ DateMixin ],
  props: {
    selected: { type: Array, required: true },
    selectedBaselineRuns: { type: Array, required: true },
    selectedBaselineTags: { type: Array, required: true },
    selectedComparedToRuns: { type: Array, required: true },
    selectedComparedToTags: { type: Array, required: true }
  },

  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const localRunName = ref(store.getters['run/runName']);
    const localRunTag = ref(store.getters['run/runTag']);
    const localStoredBefore = ref(store.getters['run/storedBefore']);
    const localStoredAfter = ref(store.getters['run/storedAfter']);

    const isDiffBtnDisabled = computed(() => {
      return (!props.selectedBaselineRuns.length &&
              !props.selectedBaselineTags.length) ||
             (!props.selectedComparedToRuns.length &&
              !props.selectedComparedToTags.length);
    });

    const diffTargetRoute = computed(() => {
      return {
        name: "reports",
        query: {
          ...route.query,
          "run": props.selectedBaselineRuns.length
            ? props.selectedBaselineRuns : undefined,
          "run-tag": props.selectedBaselineTags.length
            ? props.selectedBaselineTags : undefined,
          "newcheck": props.selectedComparedToRuns.length
            ? props.selectedComparedToRuns : undefined,
          "run-tag-newcheck": props.selectedComparedToTags.length
            ? props.selectedComparedToTags : undefined,
        }
      };
    });

    const initByUrl = () => {
      const runName = route.query["run"];
      if (runName) {
        store.commit(`run/${SET_RUN_NAME}`, runName);
        localRunName.value = runName;
      }

      const runTag = route.query["run-tag"];
      if (runTag) {
        store.commit(`run/${SET_RUN_HISTORY_RUN_TAG}`, runTag);
        localRunTag.value = runTag;
      }

      const storedAfter = route.query["stored-after"];
      if (storedAfter) {
        const date = new Date(storedAfter);
        store.commit(`run/${SET_RUN_HISTORY_STORED_AFTER}`, date);
        localStoredAfter.value = date;
      }

      const storedBefore = route.query["stored-before"];
      if (storedBefore) {
        const date = new Date(storedBefore);
        store.commit(`run/${SET_RUN_HISTORY_STORED_BEFORE}`, date);
        localStoredBefore.value = date;
      }
    };

    const updateUrl = (params) => {
      router.replace({
        query: {
          ...route.query,
          ...params
        }
      }).catch(() => {});
    };

    const update = () => {
      emit("update");
    };

    // Initialize from URL
    initByUrl();

    // Watch for changes with debounce
    watch(localRunName, _.debounce((newVal) => {
      const runName = newVal || undefined;
      updateUrl({ "run": runName });
      store.commit(`run/${SET_RUN_NAME}`, runName);
      emit("on-run-filter-changed");
    }, 500));

    watch(localRunTag, _.debounce((newVal) => {
      const runTag = newVal || undefined;
      updateUrl({ "run-tag": runTag });
      store.commit(`run/${SET_RUN_HISTORY_RUN_TAG}`, runTag);
      emit("on-run-history-filter-changed");
    }, 500));

    watch(localStoredAfter, _.debounce((newVal) => {
      const date = newVal ? DateMixin.methods.dateTimeToStr(newVal) : undefined;
      updateUrl({ "stored-after": date });
      store.commit(`run/${SET_RUN_HISTORY_STORED_AFTER}`, newVal);
      emit("on-run-filter-changed");
      emit("on-run-history-filter-changed");
    }, 500));

    watch(localStoredBefore, _.debounce((newVal) => {
      const date = newVal ? DateMixin.methods.dateTimeToStr(newVal) : undefined;
      updateUrl({ "stored-before": date });
      store.commit(`run/${SET_RUN_HISTORY_STORED_BEFORE}`, newVal);
      emit("on-run-filter-changed");
      emit("on-run-history-filter-changed");
    }, 500));

    return {
      localRunName,
      localRunTag,
      localStoredBefore,
      localStoredAfter,
      isDiffBtnDisabled,
      diffTargetRoute,
      update
    };
  }
});
</script>