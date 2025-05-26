<script setup>
import { ref, computed } from 'vue';
import {
  CheckerInfoAvailability,
  setCheckerStatusUnavailableDueToVersion
} from "@/mixins/api/analysis-info-handling.mixin";

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  checkerName: { type: String, default: null },
  type: { type: String, required: true },
  runData: { type: Array, default: () => [] }
});

const emit = defineEmits(['update:modelValue']);

const runsWithAnalysisInfo = ref([]);

const dialog = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const title = computed(() => {
  let title = `${props.type.charAt(0).toUpperCase() 
    + props.type.slice(1)} run list`;
  if (props.checkerName) {
    title += ` for the "${props.checkerName}" checker`;
  }
  return title;
});

const runs = computed(() => {
  if (props.runData.length && props.runData[0].analysisInfo !== undefined) {
    const alertTypes = {
      [CheckerInfoAvailability.RunHistoryStoredWithOldVersionPre_v6_24]: {
        runNames: [],
        message: "analysed by an older version of CodeChecker. \
        The list of statistics are only available from CodeChecker 6.24:"
      },
      [CheckerInfoAvailability.UnknownReason]: {
        runNames: [],
        message: "likely stored from a report directory \
        which was not created natively by CodeChecker analyze:"
      }
    };
    
    props.runData.map(run => {
      setCheckerStatusUnavailableDueToVersion(
        run.analysisInfo, run.codeCheckerVersion);
      
      alertTypes[run.analysisInfo.checkerInfoAvailability].runNames.push(
        run.runName);
    });

    return Object.values(alertTypes);
  }
  else {
    return [{ 
      runNames: props.runData.map(run => run.runName),
      message: null 
    }];
  }
});
</script>

<template>
  <v-dialog
    v-model="dialog"
    class="documentation-dialog"
    max-width="70%"
    scrollable
  >
    <v-card>
      <v-card-title
        class="headline primary white--text"
        primary-title
      >
        {{ title }}

        <v-spacer />

        <v-btn class="close-btn" icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <div 
          v-for="run in runs"
          :key="run.message"
        >
          <div class="font-alert-message">
            <span 
              v-if="run.message && run.runNames.length"
            >
              {{ run.runNames.length > 1 ? "These runs are": "This run is" }}
              {{ run.message }}
            </span>
          </div>
          <v-container class="checker-rows-in-columns">
            <v-row
              v-for="runName in run.runNames"
              :key="runName"
              no-gutters
              align="center"
            >
              <v-col cols="auto" align-self="center">
                <v-icon 
                  v-if="type == 'enabled'"
                  class="mr-1"
                  color="success"
                >
                  mdi-check 
                </v-icon>
                <v-icon 
                  v-else
                  class="mr-1"
                  color="error"
                >
                  mdi-close
                </v-icon>
              </v-col>
              <v-col
                cols="auto"
                align-self="center" 
                class="text-larger"
              >
                {{ runName }}
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.checker-rows-in-columns {
  columns: 32em auto;
}
.font-alert-message {
  margin-top: 10px;
  font-size: 125%;
  font-weight: bold;
}
.text-larger {
  font-size: larger;
}
</style>