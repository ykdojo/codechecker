import { DetectionStatus } from "@cc/report-server-types";
import { useDetectionStatus } from "@/composables/useDetectionStatus";

const { detectionStatusFromCodeToString } = useDetectionStatus();

const defaultStatisticsFilterValues = {
  "is-unique": "on",
  "detection-status": [
    detectionStatusFromCodeToString(DetectionStatus.NEW),
    detectionStatusFromCodeToString(DetectionStatus.REOPENED),
    detectionStatusFromCodeToString(DetectionStatus.UNRESOLVED)
  ]
};

export default defaultStatisticsFilterValues;