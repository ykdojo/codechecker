<template>
  <select-option
    :id="id"
    title="Latest Review Status"
    :bus="bus"
    :fetch-items="fetchItems"
    :loading="loading"
    :selected-items="selectedItems"
    :panel="panel"
    @clear="clear(true)"
    @input="setSelectedItems"
  >
    <template #icon="{ item }">
      <review-status-icon :status="item.id" />
    </template>

    <template #append-toolbar-title>
      <tooltip-help-icon>
        Filter reports by the <b>latest</b> review status.<br><br>

        Reports can be assigned a review status of the following values:
        <ul>
          <li>
            <b>Unreviewed</b>: Nobody has seen this report.
          </li>
          <li>
            <b>Confirmed:</b> This is really a bug.
          </li>
          <li>
            <b>False positive:</b> This is not a bug.
          </li>
          <li>
            <b>Intentional:</b> This report is a bug but we don't want to fix
            it.
          </li>
        </ul>
      </tooltip-help-icon>

      <selected-toolbar-title-items
        v-if="selectedItems"
        :value="selectedItems"
      />
    </template>
  </select-option>
</template>

<script setup>
import { ref } from 'vue';
import { ccService, handleThriftError } from "@cc-api";
import { ReportFilter, ReviewStatus } from "@cc/report-server-types";
import TooltipHelpIcon from "@/components/TooltipHelpIcon";
import { ReviewStatusIcon } from "@/components/Icons";
import { useReviewStatus } from "@/composables";
import { SelectOption, SelectedToolbarTitleItems } from "./SelectOption";
import { useBaseSelectOptionFilter } from "./composables/useBaseSelectOptionFilter";

const id = ref("review-status");
const { reviewStatusFromCodeToString, reviewStatusFromStringToCode } = useReviewStatus();
const { selectedItems, bus, loading, panel, setSelectedItems, clear } = useBaseSelectOptionFilter(id.value);

function encodeValue(reviewStatusId) {
  return reviewStatusFromCodeToString(reviewStatusId);
}

function decodeValue(reviewStatusName) {
  return reviewStatusFromStringToCode(reviewStatusName);
}

function updateReportFilter() {
  setReportFilter({
    reviewStatus: selectedItems.value.map(item => item.id)
  });
}

function onReportFilterChange(key) {
  if (key === "reviewStatus") return;
  update();
}

function fetchItems() {
  loading.value = true;

  const reportFilter = new ReportFilter(reportFilter);
  reportFilter.reviewStatus = null;

  return new Promise(resolve => {
    ccService.getClient().getReviewStatusCounts(runIds, reportFilter,
      cmpData, handleThriftError(res => {
        resolve(Object.keys(ReviewStatus).map(status => {
          const id = ReviewStatus[status];
          return {
            id: id,
            title: encodeValue(id),
            count: res[id] !== undefined ? res[id].toNumber() : 0
          };
        }));
        loading.value = false;
      }));
  });
}
</script>