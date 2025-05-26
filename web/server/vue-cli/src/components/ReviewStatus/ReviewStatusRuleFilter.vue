<template>
  <v-container fluid>
    <v-row align="center">
      <v-col class="py-0">
        <v-text-field
          v-model="reportHash"
          class="report-hash"
          prepend-icon="mdi-magnify"
          label="Search by report hash..."
          variant="outlined"
          density="compact"
          hide-details
          clearable
          @update:model-value="onTextFilterChanged"
        />
      </v-col>
      <v-col class="py-0">
        <select-review-status
          v-model="reviewStatus"
          label="Search by review status"
          @change="onFilterChanged"
        />
      </v-col>
      <v-col class="py-0">
        <v-text-field
          v-model="author"
          class="author"
          prepend-icon="mdi-magnify"
          label="Search by author..."
          variant="outlined"
          density="compact"
          hide-details
          clearable
          @update:model-value="onTextFilterChanged"
        />
      </v-col>
      <v-col class="py-0">
        <v-checkbox
          v-model="noAssociatedReports"
          class="no-associated-reports ma-0 py-0"
          hide-details
          @update:model-value="onFilterChanged"
        >
          <template #label>
            No associated reports
            <tooltip-help-icon>
              Show only review status rules which have no associated reports
              and can be safely removed from the database without changing the
              statistics.
            </tooltip-help-icon>
          </template>
        </v-checkbox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, computed, defineComponent, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { debounce } from 'lodash';
import { ReviewStatusRuleFilter } from "@cc/report-server-types";
import { useReviewStatus } from "@/composables/review-status";
import TooltipHelpIcon from "@/components/TooltipHelpIcon";
import SelectReviewStatus from "./SelectReviewStatus";

export default defineComponent({
  name: "ReviewStatusRuleFilter",
  components: { SelectReviewStatus, TooltipHelpIcon },
  props: {
    bus: { type: Object, required: true }
  },
  emits: ['on:filter'],
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const { reviewStatusFromStringToCode, reviewStatusFromCodeToString } = useReviewStatus();

    const queries = route.query;
    const reportHash = ref(queries['report-hash'] || null);
    const noAssociatedReports = ref(queries['no-associated-reports'] === 'on');
    const reviewStatus = ref(queries['review-status'] 
      ? reviewStatusFromStringToCode(queries['review-status']) 
      : null);
    const author = ref(queries['author'] || null);

    const status = computed(() => {
      if (reviewStatus.value !== null) {
        return reviewStatusFromCodeToString(reviewStatus.value);
      }
      return null;
    });

    const filter = computed(() => {
      if (!reportHash.value && 
          !noAssociatedReports.value && 
          !reviewStatus.value && 
          !author.value) return;

      const filter = new ReviewStatusRuleFilter();
      filter.reportHashes = reportHash.value ? [`${reportHash.value}*`] : null;
      filter.authors = author.value ? [`${author.value}*`] : null;
      filter.reviewStatuses = 
        reviewStatus.value !== null ? [reviewStatus.value] : null;
      filter.noAssociatedReports = noAssociatedReports.value;

      return filter;
    });

    const updateUrl = (params) => {
      router.replace({
        query: {
          ...route.query,
          ...params
        }
      }).catch(() => {});
    };

    const onFilterChanged = () => {
      emit('on:filter', filter.value);
      updateUrl({
        'report-hash': reportHash.value || undefined,
        'author': author.value || undefined,
        'no-associated-reports': noAssociatedReports.value ? 'on' : undefined,
        'review-status': status.value !== null ? status.value : undefined
      });
    };

    const onTextFilterChanged = debounce(onFilterChanged, 400);

    onMounted(() => {
      onFilterChanged();

      props.bus.$on('clear', () => {
        reportHash.value = null;
        author.value = null;
        reviewStatus.value = null;
        noAssociatedReports.value = null;

        onFilterChanged();
      });
    });

    return {
      reportHash,
      author,
      reviewStatus,
      noAssociatedReports,
      status,
      onTextFilterChanged,
      onFilterChanged,
      updateUrl
    };
  }
});
</script>