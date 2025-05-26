import { defineStore } from 'pinia';
import {
  DateInterval,
  RunFilter,
  RunHistoryFilter
} from "@cc/report-server-types";
import { DateMixin } from "@/mixins";

const getUnixTime = DateMixin.methods.getUnixTime;

export const useRunStore = defineStore('run', {
  state: () => ({
    runName: null,
    runTag: null,
    storedAfter: null,
    storedBefore: null
  }),

  getters: {
    runFilter: (state) => {
      if (!state.runName && !state.storedAfter && !state.storedBefore)
        return null;

      let names = null;
      if (state.runName)
        names = [ `*${state.runName}*` ];
      let after = null;
      if (state.storedAfter)
        after = getUnixTime(state.storedAfter);
      let before = null;
      if (state.storedBefore)
        before = getUnixTime(state.storedBefore);

      return new RunFilter({
        names: names,
        afterTime: after,
        beforeTime: before
      });
    },
    runHistoryFilter: (state) => {
      if (!state.runTag && !state.storedAfter && !state.storedBefore)
        return null;

      let storedAt = null;
      if (state.storedAfter || state.storedBefore) {
        storedAt = new DateInterval({
          before: state.storedBefore ? getUnixTime(state.storedBefore) : null,
          after: state.storedAfter ? getUnixTime(state.storedAfter) : null
        });
      }

      return new RunHistoryFilter({
        tagNames: state.runTag ? [ `*${state.runTag}*` ] : null,
        stored: storedAt
      });
    }
  },

  actions: {
    setRunName(runName) {
      this.runName = runName;
    },
    setRunHistoryRunTag(runTag) {
      this.runTag = runTag;
    },
    setRunHistoryStoredAfter(storedAfter) {
      this.storedAfter = storedAfter;
    },
    setRunHistoryStoredBefore(storedBefore) {
      this.storedBefore = storedBefore;
    }
  }
});