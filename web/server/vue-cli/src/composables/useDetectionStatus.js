import { DetectionStatus } from "@cc/report-server-types";

export function useDetectionStatus() {
  const detectionStatusFromCodeToString = (status) => {
    return DetectionStatus[status];
  };

  return {
    detectionStatusFromCodeToString
  };
}